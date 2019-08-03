import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AccountsDataService from './AccountsDataService';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FormModal from "./FormModal";
import AddCustomerForm from "./AddCustomerForm";
import AddAccountForm from "./AddAccountForm";
import ResponseModal from "./ReponseModal";

export default class AccountsList extends Component {

  constructor(props){
    super(props);
    this.refreshAccounts = this.refreshAccounts.bind(this);
    this.transactionClicked = this.transactionClicked.bind(this);
    this.openModalHandler = this.openModalHandler.bind(this);
    this.closeModalHandler = this.closeModalHandler.bind(this);
    this.addNewAccount = this.addNewAccount.bind(this);
    this.closeResponseModalHandler = this.closeResponseModalHandler.bind(this);
    this.getCustomerDetails = this.getCustomerDetails.bind(this);
    this.state =
        {
          accounts: [],
          message: null,
          show: false,
          isResponseShowing : false
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

  openModalHandler(){
    this.setState({
      show: true
    })
  }

  closeModalHandler(e){
    this.setState({
      show: false
    })
  }

  closeResponseModalHandler(){
    this.setState({
      isResponseShowing: false
    })
  }

  addNewAccount(fields){
    console.log("add new account");
    AccountsDataService.addNewAccount(fields)
        .then(response =>  {
          this.setState({
            accounts : [...this.state.accounts, response.data],
            show : false,
            message : 'Account added successfully.',
            isResponseShowing: true
          })
        })
    .catch(error => {
      this.setState({
        message: error.response.data.errors,
        show: false,
        isResponseShowing: true
      })
    });
  }
  getCustomerDetails(id){
    this.props.history.push(`/customers/${id}`);
  }

  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
            <h3> Accounts </h3>
            </div>
            <div className="col-ld-2 vertical-center">
              <button  className="btn btn-outline-primary float-right" onClick={ e => this.openModalHandler()}>Add New Account</button>
            </div>
          </div>



            <table className="table">
              <caption>List of Accounts</caption>
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
                     <td><button className="btn btn-outline-primary" onClick={() => this.getCustomerDetails(account.customerId)}> {account.customerId}</button></td>
                     <td><button  className="btn btn-outline-primary" onClick={()=> this.transactionClicked(account.id)}>Transactions</button></td>
                   </tr>
                )
              }
              </tbody>
            </table>
          <FormModal show={this.state.show} close={this.closeModalHandler}
                     header="Add a new Account !!"
                     submitClicked={this.addNewAccount}>
            <AddAccountForm bindSubmitForm={null}/>
          </FormModal>

          {this.state.message && <ResponseModal show={this.state.isResponseShowing}
                                                close={this.closeResponseModalHandler}>{
            this.state.message}
          </ResponseModal>}
        </div>
    )
  }
}
