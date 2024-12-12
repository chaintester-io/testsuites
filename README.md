# Chaintester.io Test Suites

## Our Mission

Lost in the jungle of blockchain RPC provider offers?
Search no more.

Our mission is to help you discover the best RPC providers on the market and keep you ahead of the game. Compare uptime, speed, functionality, and security of blockchain endpoints across top providers.
Whether you're building cutting-edge apps or managing critical blockchain projects, ChainTester ensures you find reliable solutions for seamless operations.

Maximize your app's efficiency by identifying the best, most reliable blockchain infrastructure tailored to your needs.
Leave the testing to us and focus on what matters most—your core business.
Explore ChainTester.io today and elevate your project's performance to new heights.

## Methodology

At ChainTester.io, we conduct comprehensive evaluations of blockchain node providers to assist developers in selecting the most suitable services for their applications. Our methodology encompasses a series of standardized tests across various blockchain networks, with specific adjustments for networks like Arbitrum that have unique functionalities. Below is an overview of our testing methodology.

## Our commitment

We are committed to transparency and collaboration in our development processes. To this end, all our methods are available in a public repository, accessible to everyone at [github.com](https://github.com/chaintester-io/testsuites/).

Sharing our code publicly fosters open collaboration, allowing developers worldwide to contribute, review, and enhance our work. This openness not only improves code quality but also accelerates innovation through diverse input. Moreover, public repositories serve as valuable learning resources, enabling others to understand and build upon our methodologies.

By maintaining a public repository, we uphold our commitment to openness and invite the community to join us in advancing our projects.

## Standard Test Suite

For each blockchain network, we execute a consistent set of JSON-RPC method tests to assess the functionality and performance of node providers.

### Basics

The Ethereum JSON-RPC API provides a standardized set of methods for interacting with selected blockchains. These methods are categorized into three main groups: Basics, Others, and History. Below is a detailed overview of each method within these groups:

#### eth_ methods

These methods facilitate fundamental interactions with the blockchain, such as retrieving block and transaction data, querying account balances, and executing calls.

- **eth_blockNumber**: Returns the number of the most recent block.

- **eth_getBlockByNumber**: Retrieves information about a block by its number. Accepts a block number and a boolean indicating whether to return full transaction objects or just their hashes.

- **eth_feeHistory**: Provides historical gas fee data. Useful for estimating gas prices for transactions.

- **eth_getBalance**: Fetches the balance of an account at a specified block. Requires the account address and an optional block parameter.

- **eth_getProof**: Returns the Merkle proof for storage positions of an account. Useful for verifying the state of an account's storage.

- **eth_getStorageAt**: Retrieves the value stored at a specific storage position of an account. Requires the account address and the storage position's index.

- **eth_getTransactionCount**: Returns the number of transactions sent from an address. Also known as the nonce.

- **eth_getBlockTransactionCountByHash**: Provides the number of transactions in a block identified by its hash.

- **eth_getBlockTransactionCountByNumber**: Returns the number of transactions in a block identified by its number.

- **eth_getUncleCountByBlockHash**: Retrieves the number of uncle blocks for a block specified by its hash.

- **eth_getUncleCountByBlockNumber**: Fetches the number of uncle blocks for a block specified by its number.

- **eth_getCode**: Returns the smart contract code at a given address. If no code is present, returns '0x'.

- **eth_sign**: Signs data with a given account. Note: This method is deprecated in favor of personal_sign.

- **eth_call**: Executes a new message call immediately without creating a transaction on the blockchain. Used for reading data from smart contracts.

- **eth_estimateGas**: Estimates the gas necessary to execute a transaction. Helps in setting appropriate gas limits.

- **eth_getBlockByHash**: Retrieves information about a block by its hash. Accepts the block hash and a boolean indicating whether to return full transaction objects or just their hashes.

- **eth_getTransactionByHash**: Returns the details of a transaction by its hash.

- **eth_getTransactionByBlockHashAndIndex**: Fetches a transaction by block hash and transaction index position.

- **eth_getTransactionByBlockNumberAndIndex**: Retrieves a transaction by block number and transaction index position. 

- **eth_getTransactionReceipt**: Provides the receipt of a transaction by its hash, including details like status, gas used, and logs generated.

- **eth_getLogs**: Returns an array of logs matching a given filter object. Useful for event filtering.

- **eth_getBlockReceipts**: Retrieves all transaction receipts for a given block. 

- **eth_maxPriorityFeePerGas**: Suggests a maximum priority fee per gas to be used in transactions. Assists in setting competitive gas fees.

- **eth_chainId**: Returns the chain ID of the current network. Helps in identifying the blockchain network.

- **eth_gasPrice**: Provides the current price per gas in wei. Assists in setting appropriate gas prices for transactions.

#### Debug_ and Trace_ methods

These methods offer advanced debugging and tracing capabilities, allowing developers to inspect the state and execution of transactions and blocks.

-debug_storageRangeAt: Retrieves a range of storage entries for a specified account at a particular block.

-debug_traceBlockByNumber: Traces the execution of all transactions in a block identified by its number.

-trace_rawTransaction: Executes a raw transaction and returns a full trace of its execution without broadcasting it to the network.

- **trace_block**: Provides a trace of all transactions in a given block.

- **trace_call**: Executes a call and returns a full trace of its execution.

- **trace_callMany**: Allows for multiple calls to be executed and traced in a single request.

- **trace_replayBlockTransactions**: Replays all transactions in a block and returns their traces.

- **trace_replayTransaction**: Replays a transaction and returns its trace.

- **trace_transaction**: Returns the trace of a specific transaction by its hash.

- **debug_traceBlockByHash**: Traces the execution of all transactions in a block identified by its hash.

- **debug_traceTransaction**: Provides a full trace of a transaction's execution by its hash.

- **debug_getBadBlocks**: Retrieves a list of blocks that the client considers invalid or 'bad'.

- **debug_traceBlock**: Traces the execution of all transactions in a specified block.

- **debug_traceCall**: Executes a call and returns a full trace of its execution for debugging purposes.

### Others

This group includes miscellaneous methods that provide client-specific information and transaction pool details.

- **web3_clientVersion**: Retrieves the current client version as a string. This is useful for identifying the specific Ethereum client and its version that you're interacting with. 

- **net_listening**: Checks if the client is actively listening for network connections. It returns true if the client is listening, and false otherwise. This helps determine the client's connectivity status.

- **txpool_content**: Provides detailed information about the transactions currently pending and queued in the transaction pool. It returns a nested dictionary of transactions categorized by their status (pending or queued) and sender address. This method is essential for monitoring the state of transactions before they're included in a block. 

- **txpool_status**: Returns the number of transactions in the pending and queued states within the transaction pool. This gives insight into the current load and backlog of transactions awaiting processing.

- **txpool_inspect**: Offers a human-readable overview of the transaction pool, showing a summary of pending and queued transactions organized by sender address. This is useful for a quick assessment of the transaction pool's state.

- **batch test**: Covers multiple RPC calls in a single batch request, which allows for the execution of multiple methods in one HTTP request, improving efficiency.

### History

This group involves retrieving information about specific blocks using the **eth_getBlockByNumber** and **debug_traceBlockByNumber** methods for various block numbers:

By utilizing these methods, developers and analysts can access detailed historical data and debug information for specific blocks on the Ethereum blockchain, aiding in comprehensive analysis and troubleshooting.

- **eth_getBlockByNumber**: Fetches information about a block by its number. The method can return either the full transaction objects or just their hashes, depending on the parameters provided. 

- **debug_traceBlockByNumber**: Executes all transactions in a specified block and returns the tracing results. This is particularly useful for debugging and understanding the internal operations that occurred during the block's processing.

#### Arbitrum-Specific Tests

To facilitate historical data retrieval for Arbitrum Classic (covering blocks up to 22,207,818) we've used specialized methods. These **arbtrace_** methods enable detailed tracing and analysis of transactions and blocks within this range. Below is an overview of each method:

- **arbtrace_call**: Executes a new message call immediately without creating a transaction on the blockchain, returning detailed trace information about the execution. This is useful for debugging smart contract function calls and analyzing specific transactions for internal operations. 

- **arbtrace_callMany**:
Performs multiple call traces on top of the same block, allowing for the tracing of dependent transactions. Each transaction is executed sequentially, with each one applied on top of the pending block state modified by its predecessors. 
QUICKNODE

- **arbtrace_filter**: Retrieves traces that match specific filter criteria, such as particular contract addresses or topics. This method is essential for analyzing events and transactions that meet certain conditions within the blockchain.

- **arbtrace_replayBlockTransactions**: Replays all transactions within a specified block and returns the corresponding traces. This is particularly useful for gaining insights into the behavior of smart contracts within a block and analyzing gas usage. 

- **arbtrace_replayTransaction**: Replays a specific transaction, providing detailed trace information about its execution. This method aids in debugging transaction execution details and investigating internal contract calls. 

- **arbtrace_transaction**: Retrieves the trace of a specific transaction by its hash, offering insights into the internal operations and state changes that occurred during its execution.

- **arbtrace_block**: Returns traces created at a specific block, detailing all actions performed within that block. This method is instrumental in understanding the sequence of operations and interactions that took place in a given block. 
