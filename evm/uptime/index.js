import { check } from 'k6';
import http from 'k6/http';
import { Trend, Gauge } from 'k6/metrics';

const url = "${URL}"

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

const blockHeight = new Gauge('block_height');
const lastBlockAge = new Trend('last_block_age');

export const options = {
    iterations: 1,
};

export default function () {
    const block = http.post(url, JSON.stringify({
        "jsonrpc":"2.0",
        "method":"eth_getBlockByNumber",
        "params":["latest", false],
        "id":1
    }), {headers}).json()

    blockHeight.add(parseInt(block.result.number, 16))
    lastBlockAge.add(Date.now() / 1000 - parseInt(block.result.timestamp, 16))
}
