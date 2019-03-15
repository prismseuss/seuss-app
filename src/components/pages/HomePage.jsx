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

let prescriptionId = 1001004

export const HomePage = graphql(web3Queries.networkAccountQuery)(class _HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = (e) => {
    e.preventDefault();
    // (uint256 prescriptionId, address patientAddress, uint256 gcn, address doctorAddress)

    const coder = ethers.utils.defaultAbiCoder;
    const docAddress = this.props.data.account;
    const bundle = coder.encode(["uint256", "address", "uint256", "address"], [++prescriptionId, this.state.patientAddress, this.state.gcn, docAddress]);
    this.setState({
       bundle,
    });
  }

  handleScan = data => {
    if (data) {
      data = data.replace("ethereum:", "");
      this.setState({
        patientAddress: data,
      })
    }
  }
  handleError = err => {
    console.error(err)
  }

  render () {
    const { data } = this.props
    console.log(data);

    return (
      <div className='is-positioned-absolutely'>
        <section className='section section--main-content'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12'>
                {!this.state.bundle && <form onSubmit={this.submit}>
                  <input type="text" id="address" value={this.state.patientAddress} onChange={(e) => {
                      const value = e.target.value;
                      this.setState({
                        patientAddress: value,
                      });
                    }}></input><br/>
                  <select id="gcn" selected={this.state.gcn} onChange={(e) => {
                      const value = e.target.value;
                      this.setState({
                        gcn: value,
                      });
                    }}>
                    <option value="0">Tylenol</option>
                    <option value="1">Advil</option>
                    <option value="2">Prednisone</option>
                  </select><br/>

                <br/>

                  <QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: 400 }}
                  />
                <p>{this.state.patientAddress}</p>

              <button type="submit">Submit</button>
              </form>}

              {this.state.bundle && <QRCode value={this.state.bundle} />}
              Bundle: {this.state.bundle}
              </div>
            </div>
          </div>
        </section>

        <FooterContainer />
      </div>
    )
  }
})
