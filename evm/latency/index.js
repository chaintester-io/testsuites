import { check } from 'k6';
import http from 'k6/http';

const url = "${URL}"

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

export const options = {
    iterations: 10,
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
}
