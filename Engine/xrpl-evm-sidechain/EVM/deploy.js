require('dotenv').config();
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));
const privateKey = process.env.PRIVATE_KEY;

const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

const contractPath = path.resolve(__dirname, 'contracts', 'EthLockXrpAmm.sol');
const source = fs.readFileSync(contractPath, 'utf8');
const compiled = web3.eth.compile.solidity(source);

const contract = new web3.eth.Contract(compiled.EthLocker.info.abiDefinition);

const deploy = async () => {
    const result = await contract.deploy({
        data: compiled.EthLocker.code,
    })
    .send({
        from: web3.eth.defaultAccount,
        gas: 1500000,
        gasPrice: '30000000000'
    });
    console.log('Contract deployed to', result.options.address);
};

deploy().catch(console.error);