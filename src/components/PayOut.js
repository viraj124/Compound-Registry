import React, {Component} from 'react';

import './Style.css';
import Web3 from 'web3';
import Registry from '../abis/registry.json'
import CEther from '../abis/ctoken.json'
import Token from '../abis/erc20.json'
import config from '../config/config.js'


class PayOut extends Component {


    async loadBlockchainData() {

        const accounts = await this.state.web3.eth.getAccounts()
        this.setState({account: accounts[0]})

        // Setting up all contract Instances & getting balances
        // NOTE -> config.registryProxy is the registry contract deployed it acts as a proxy implementation & has 1:1 mapping with user
        // Check contract for more details
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

    // Repay & Redeem your compound assets in 1 click
    payOut = async (repayAmount, redeemAmt) => {
        try {
            const result = await this.state.registry.methods.payOutAndWithdraw(repayAmount, config.cdai, redeemAmt, config.cdai, config.compoundDAI).send({from: this.state.account})
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
                                let repayAmount = this.repayAmount.value
                                let redeemAmt = this.redeemAmt.value

                                repayAmount = this.state.web3.utils.toWei(repayAmount.toString(), 'ether')
                                redeemAmt = this.state.web3.utils.toWei(redeemAmt.toString(), 'ether')
                                this.payOut(repayAmount, redeemAmt)
                            }
                    }>
                        <div>

                            <div className="container-fluid mt-5">
                                <div className="row">
                                    <main role="main" className="col-lg-12 d-flex text-center">
                                        <div className="content mr-auto ml-auto">
                                            <div id="container3">
                                                <div className="title">Pay Out and Withdraw</div>


                                                <div className="input-box">
                                                    <div className="eth">Enter DAI Payback Amount</div>
                                                    <div className="amount">
                                                        <input type="number"
                                                            onChange={
                                                                (event) => {
                                                                    const value = this.repayAmount.value
                                                                }
                                                            }
                                                            ref={
                                                                (repayAmount) => {
                                                                    this.repayAmount = repayAmount
                                                                }
                                                            }
                                                            className="form-control form-control-lg"
                                                            placeholder="Repay Amount"
                                                            step=".0000000001"
                                                            required/>
                                                    </div>

                                            <div className="input-box">
                                                <div className="eth">Enter Ether Redeem Amount</div>
                                                <div className="amount">
                                                    <input type="number"
                                                        onChange={
                                                            (event) => {
                                                                const value = this.redeemAmt.value.toString()
                                                            }
                                                        }
                                                        ref={
                                                            (redeemAmt) => {
                                                                this.redeemAmt = redeemAmt
                                                            }
                                                        }
                                                        className="form-control form-control-lg"
                                                        placeholder="Redeem Amount"
                                                        step=".0000000001"
                                                        required/>
                                                </div>
                                    </div>
                                    <div className="zap">

                                        <button type="submit" className="button1">Pay Out</button>
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
                    </main>
                </div>
            </div>
        </div>
    </form>


</div></div>
        );
    };
}

export default PayOut;

