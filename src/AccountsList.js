import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AccountsDataService from './AccountsDataService';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class AccountsList extends Component {

  constructor(props){
    super(props);
    this.refreshAccounts = this.refreshAccounts.bind(this);
    this.transactionClicked = this.transactionClicked.bind(this);
    this.state =
        {
          accounts: [],
          message: null
        }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.path != this.props.match.path) {

      this.refreshAccounts();
    }
  }
  componentDidMount() {
    this.refreshAccounts();
  }

  refreshAccounts() {
    const customerId = this.props.match.params.id;
    console.log("Refresh called.");
    AccountsDataService.retrieveAllAccounts(customerId)
    .then(response =>
        this.setState({accounts: response.data})
    )
  }

  transactionClicked(account_id){
    console.log("delete called.");
    this.props.history.push(`/accounts/${account_id}`);
  }

  render() {
    return (
        <div className="container">
          <h3> All Accounts </h3>
          {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
            <table className="table">
                <thead>
                    <tr>
                      <th>Account Number</th>
                      <th>Account Type</th>
                      <th>Account Balance</th>
                      <th>Account Creation Date</th>
                      <th>Customer Id</th>
                      <th>Account Transactions</th>
                    </tr>
                </thead>
              <tbody>
              {
                this.state.accounts.map(account =>
                   <tr key={account.id}>
                      <td>{account.id}</td>
                     <td>{account.type}</td>
                     <td>{account.balance}</td>
                     <td>{account.createdDate}</td>
                     <td>{account.customerId}</td>
                     <td><button className="btn btn-warning" onClick={()=> this.transactionClicked(account.id)}>Transactions</button></td>
                   </tr>
                )
              }
              </tbody>
            </table>
        </div>
    )
  }
}
