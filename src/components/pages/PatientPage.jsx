import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'
import { allowedNetworkIds } from '~/web3/allowedNetworkIds'
import { FooterContainer } from '~/components/layout/Footer'
import { ErrorMessage } from '~/components/ErrorMessage'
import { web3Queries } from '~/queries/web3Queries'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import QRCode from 'react-qr-code'
import QrReader from 'react-qr-reader'
import {ethers} from 'ethers'
import {abiMapping} from '~/apollo/abiMapping'
import Web3 from 'web3'

export const PatientPage = graphql(web3Queries.networkAccountQuery)(class _PatientPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = async (e) => {
    e.preventDefault();

    await window.ethereum.enable();

    const web3 = new Web3(window.ethereum)
    const networkId = this.props.data.networkId;
    const contractAddress = abiMapping.getAddress("Seuss", networkId);

    const seuss = new web3.eth.Contract(abiMapping.getAbi("Seuss"), contractAddress);
    //
    // const add_pharmacy_transaction = await seuss.methods.addPharmacy("0xD2cE00836F3f3017B356a72344DBC1254bcC1844").send({ from: this.props.data.account });

    const transaction = await seuss.methods.purchase(
      this.state.prescription, "0xD2cE00836F3f3017B356a72344DBC1254bcC1844"
    ).send({
      from: this.props.data.account,
      value: web3.utils.toWei('10', 'ether')
    });
    console.log("transaction", transaction);
  }

  handleScan = data => {
    if (data) {
      data = data.replace("ethereum:", "");
      this.setState({
        prescription: data,
      })
    }
  }
  handleError = err => {
    console.error(err)
  }

  render () {
    const { data } = this.props

    return (
      <div className='is-positioned-absolutely'>
        <section className='section section--main-content'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12'>
                {!this.state.bundle && <form onSubmit={this.submit}>
                  <input type="text" id="address" value={this.state.prescription} onChange={(e) => {
                      const value = e.target.value;
                      this.setState({
                        prescription: value,
                      });
                    }}></input><br/>

                  <QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: 400 }}
                  />
                <p>{this.state.prescription}</p>

              <button type="submit">Submit</button>
              </form>}
              </div>
            </div>
          </div>
        </section>

        <FooterContainer />
      </div>
    )
  }
})
