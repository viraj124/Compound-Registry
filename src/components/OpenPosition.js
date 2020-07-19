import React, {Component} from 'react';

import './Style.css';
import Web3 from 'web3';
import Registry from '../abis/registry.json'
import CEther from '../abis/ctoken.json'
import Token from '../abis/erc20.json'

import config from '../config/config.js'


class OpenPosition extends Component {


    async loadBlockchainData() {

        const accounts = await this.state.web3.eth.getAccounts()
        this.setState({account: accounts[0]})
        console.log(this.state.account);

        const registry = new this.state.web3.eth.Contract(Registry, config.registryProxy)
        const cether = new this.state.web3.eth.Contract(CEther, config.ceth)
        const daiInstance =  new this.state.web3.eth.Contract(Token, config.compoundDAI)
        let ctokenbalance = await cether.methods.balanceOf(config.registryProxy).call()
        let daibalance = await daiInstance.methods.balanceOf(config.registryProxy).call()
        daibalance = this.state.web3.utils.fromWei(daibalance, 'ether')
        ctokenbalance = this.state.web3.utils.fromWei(ctokenbalance, 'ether')
        this.setState({registry, ctokenbalance, daibalance})
    }

    async loadWeb3() {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
            this.setState({web3})
        } else if (window.web3) {
            const web3 = new Web3(window.web3.currentProvider)
            this.setState({web3})
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    // Opens Up a safe compound position with ETH-DAI Pair for more details refer the contract
    openPosition = async (depositAmount, borrowAmount) => {
        try {
            const result = await this.state.registry.methods.openSafeBorrowPosition(config.ceth, config.cdai, [config.cdai, config.ceth], borrowAmount).send({from: this.state.account, value: depositAmount})
        } catch (err) {
            console.log(err)
        }
    }


    async showShortner() {
        let address = this.state.account.toString()
        address = address.substring(0, 6) + '......' + address.substring(address.length - 7, address.length - 1)
        this.setState({shortnerAddress: address})
    }


    click = async () => {
        try {
            await this.loadWeb3()
            await this.loadBlockchainData()
            await this.showShortner()
            this.setState({color: '#0ff279'});
            this.setState({buttonText: this.state.shortnerAddress});
        } catch (err) {
            this.setState({color: '#85f7ff'});
            this.setState({buttonText: "Tryagain"});
        }

    }

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            color: '#85f7ff',
            buttonText: "Connect"
        }
    }

    render() {


        return (
            <div>
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <button onClick={
                            this.click
                        }
                        style={
                            {
                                backgroundColor: this.state.color,
                                borderRadius: "7px",
                                border: "None"
                            }
                    }>
                        {
                        this.state.buttonText
                    }</button>
                </nav>
                <div className="items">

                    <form className="mb-3"
                        onSubmit={
                            (event) => {
                                event.preventDefault()
                                let daiAmount = this.daiValue.value
                                let ethAmount = this.ethValue.value

                                daiAmount = this.state.web3.utils.toWei(daiAmount.toString(), 'ether')
                                ethAmount = this.state.web3.utils.toWei(ethAmount.toString(), 'ether')
                                this.openPosition(ethAmount, daiAmount)
                            }
                    }>
                        <div>

                            <div className="container-fluid mt-5">
                                <div className="row">
                                    <main role="main" className="col-lg-12 d-flex text-center">
                                        <div className="content mr-auto ml-auto">
                                            <div id="container3">
                                                <div className="title">Open Safe Borrow Position</div>


                                                <div className="input-box">
                                                    <div className="eth">Enter ETH value you want to supply</div>
                                                    <div className="amount">
                                                        <input type="number"
                                                            onChange={
                                                                (event) => {
                                                                    const value = this.ethValue.value.toString()
                                                                }
                                                            }
                                                            ref={
                                                                (ethValue) => {
                                                                    this.ethValue = ethValue
                                                                }
                                                            }
                                                            className="form-control form-control-lg"
                                                            placeholder="ETH Value"
                                                            step=".0000000001"
                                                            required/>
                                                    </div>
                                                
                                                 <div className="input-box">
                                                    <div className="eth">Enter DAI value you wish to borrow</div>
                                                    <div className="amount">
                                                        <input type="number"
                                                            onChange={
                                                                (event) => {
                                                                    const value = this.daiValue.value.toString()
                                                                }
                                                            }
                                                            ref={
                                                                (daiValue) => {
                                                                    this.daiValue = daiValue
                                                                }
                                                            }
                                                            className="form-control form-control-lg"
                                                            placeholder="DAI Value"
                                                            step=".0000000001"
                                                            required/>
                                                    </div>
                                            <div className="zap">

                                                <button type="submit" className="button1">Open Position</button>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="health-factor">Your CETHER Balance : {
                                        this.state.ctokenbalance
                                    }</div>
                                     <div className="health-factor">Your DAI Balance : {
                                        this.state.daibalance
                                    }</div>
                                </div>
                                 </div>
                            </main>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
        );
    };
}

export default OpenPosition;

