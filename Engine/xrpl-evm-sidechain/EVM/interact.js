require('dotenv').config();
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));
const contractAddress = 'deployed_contract_address_here';
const contractABI = JSON.parse(fs.readFileSync('path_to_ABI.json', 'utf-8'));

const contract = new web3.eth.Contract(contractABI, contractAddress);

const lockEther = async (amount) => {
    const transaction = contract.methods.lockEther();
    const options = {
        to: transaction._parent._address,
        data: transaction.encodeABI(),
        gas: '1000000',
        value: web3.utils.toWei(amount, 'ether'),
    };

    const signed = await web3.eth.accounts.signTransaction(options, process.env.PRIVATE_KEY);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    console.log('Transaction receipt:', receipt);
};

lockEther('0.1').catch(console.error);