import { check, sleep } from 'k6';
import http from 'k6/http';

const url = "${URL}"

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

export const options = {
    // iterations: 10,
};

const runCheck = (payload, checks, debug = false) => {
    const res = http.post(url, JSON.stringify(payload), {headers})
    debug && console.log(res.json())
    check(res, checks);
    return res
}

export default function () {
    // Basic
    runCheck({
        "jsonrpc":"2.0",
        "method":"eth_getBlockByNumber",
        "params":["latest", false],
        "id":1
    }, {
        'basicRequest 200 Ok': (r) => r.status === 200,
        'basicRequest no error': (r) => r.json().error === undefined,
        'basicRequest result is object': (r) => !! r.json().result,
    })

    // batch
    runCheck([
        {
            "jsonrpc": "2.0",
            "method": "eth_getBlockByNumber",
            "params": ["latest", false],
            "id": 1
        },
        {
            "jsonrpc": "2.0",
            "method": "eth_getBlockByNumber",
            "params": ["finalized", false],
            "id": 2
        }
    ], {
        'batch 200 Ok': (r) => r.status === 200,
        'batch no error': (r) => r.json().error === undefined,
        'batch result array with length 2': (r) => Array.isArray(r.json()) && r.json().length === 2,
    })

    // getBlockReceipt
    runCheck({
        "jsonrpc":"2.0",
        "method":"eth_getBlockReceipts",
        "params":["latest"],
        "id":1
    }, {
        'blockReceipts 200 Ok': (r) => r.status === 200,
        'blockReceipts no error': (r) => r.json().error === undefined,
        'blockReceipts more than one result': (r) => r.json().result.length > 0,
    })

    sleep(1);

    // Archival
    const debugCall = runCheck({
        "jsonrpc": "2.0",
        "method": "debug_traceBlockByNumber",
        "params": [
            "latest",
            {
                "tracer": "callTracer"
            }
        ],
        "id": 1
    }, {})
    const traceCall = runCheck({
        "jsonrpc":"2.0",
        "method":"trace_block",
        "params":["latest"],
        "id":67
    }, {})

    check({debugCall, traceCall}, {
        'archive call 200 Ok': (r) => {
            return r.debugCall.status === 200 || r.traceCall.status === 200
        },
        'archive call no error': (r) => {
            return r.debugCall.json().error === undefined
                || r.traceCall.json().error === undefined
        },
        'archive call result is object': (r) => {
            return (!! r.debugCall.json().result) || (!! r.traceCall.json().result)
        },
    })
}
