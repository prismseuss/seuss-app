import React, { Component } from 'react'
import AntdIcon from '@ant-design/icons-react'
import { PlusCircleFill } from '@ant-design/icons'
import { graphql } from 'react-apollo'
import { allTransactionsQuery } from 'apollo-link-ethereum-mutations-ethersjs'
import { DepositMutationForm } from '~/components/DepositMutationForm'
import { findLast } from 'lodash'

export const DepositButton = graphql(allTransactionsQuery)(
  class _DepositButton extends Component {
    state = {
      isDepositing: false
    }

    render () {
      const depositTx = findLast(this.props.data.transactions, tx => {
        return (
          tx.contractName === 'Depositing' &&
          tx.method === 'deposit'
        )
      })

      const approveTx = findLast(this.props.data.transactions, tx => {
        return (
          tx.contractName === 'ZepToken' &&
          tx.method === 'approve'
        )
      })

      // This sets the proper state when the depositer navigates away
      // then comes back
      const showDepositMutationForm = (
        this.state.isDepositing ||
        (depositTx || approveTx)
      )

      console.log(this.props.systemInfo)

      return (
        showDepositMutationForm ? (
          <DepositMutationForm
            depositTx={depositTx}
            approveTx={approveTx}
            systemInfo={this.props.systemInfo}
          />
        ) : (
          <button
            className='button is-info'
            onClick={(e) => { this.setState({ isDepositing: true }) }}
          >
            <AntdIcon
              type={PlusCircleFill}
            /> Make Deposit
          </button>
        )
      )
    }
  }
)
