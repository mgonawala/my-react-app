import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './table.css';
import AccountsDataService from "./AccountsDataService";
import FormModal from "./FormModal";
import ResponseModal from './ReponseModal';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Modal from "react-bootstrap/Modal";
import AddTransactionForm from "./AddTransactionForm";

class TransactionComponent extends Component{


  constructor(props){
      super(props);
      this.openModalHandler = this.openModalHandler.bind(this);
      this.closeModalHandler = this.closeModalHandler.bind(this);
      this.addTransactionClicked = this.addTransactionClicked.bind(this);
      this.revertTransaction = this.revertTransaction.bind(this);
      this.closeResponseModalHandler = this.closeResponseModalHandler.bind(this);
      this.state = {
        id : this.props.match.params.id,
        message : '',
        transactionList : [],
        isShowing : false,
        isResponseShowing : false
      }
  }

  componentDidMount() {
    console.log(this.state.id);
    if(this.state.id == -1){
      return
    }

    AccountsDataService.findTransactionsOfAccount( this.state.id)
    .then( response => this.setState({
      transactionList: response.data
    }));
  }

  addTransactionClicked(values){
    console.log("Adding new Transaction.");
    console.log(values.accountId);
    this.closeModalHandler();
    AccountsDataService.addNewTransaction(values)
      .then( response => {
          this.setState({
            transactionList : [...this.state.transactionList, response.data],
            message: 'Transaction added successfully.',
            isResponseShowing: true
          })

      }).catch(error => {
        this.setState({
          message: error.response.data.errors,
          isResponseShowing: true
        })
    });
  }

  revertTransaction(transaction_id){
      AccountsDataService.revertTransaction(this.state.id, transaction_id)
          .then(response => {
            this.state.transactionList.filter(t => t.id == transaction_id)
            .map(transaction => {
              transaction.status = response.data.status;
            })

            this.setState({
              message: 'Transaction revert was successful.',
              isResponseShowing: true
            });


          })
    .catch(error =>{
      this.setState({
        message: error.response.data.errors,
        isResponseShowing: true
      })
    })
  }
  openModalHandler(){
    console.log("open madal.");
    this.setState({
      isShowing: true
    })
  }

  closeModalHandler(e){
    this.setState({
      isShowing: false
    })
  }

  closeResponseModalHandler(e){
    this.setState({
      isResponseShowing: false
    })
  }

  render() {
    const theadStyle={
      'overflow-y' : 'scroll',
      'height': '500px'
    };
    return(
        <div className="container">
        <h1> Transaction Details </h1>
          {this.state.message && <ResponseModal show={this.state.isResponseShowing}
                                                close={this.closeResponseModalHandler}>{this.state.message}</ResponseModal>}
          <button type="button" className="btn btn-success float-right"
                  onClick={ e => this.openModalHandler()}>Add New Transaction</button>
    <table className="table" >
      <caption>List of Transactions</caption>
      <thead className="thead-light">
      <tr>
        <th >Transaction Number</th>
        <th >Transaction Type</th>
        <th >Transaction Amount</th>
        <th >Transaction  Date</th>
        <th >Transaction Status</th>
        <th >Actions</th>
      </tr>
      </thead>
      <tbody >
      {

        this.state.transactionList.map(transaction =>
            <tr key={transaction.id}>
              <td >{transaction.id}</td>
              <td >{transaction.type}</td>
              <td >{transaction.amount}</td>
              <td >{transaction.transactionDate}</td>
              <td >{transaction.status}</td>
              <td ><button className="btn btn-danger"
                           onClick={()=> this.revertTransaction(transaction.id)}>
                Revert
              </button></td>
            </tr>
        )
      }
      </tbody>
    </table>
          <FormModal show={this.state.isShowing} close={this.closeModalHandler}
                     header="Add a new Transaction !!"
                     accountId={this.props.match.params.id}
                     submitClicked={this.addTransactionClicked}>
            <AddTransactionForm bindSubmitForm={null} accountId={this.props.id}
                                submitClicked={this.addTransactionClicked}/>
          </FormModal>
        </div>
    );
  }
}
export default TransactionComponent;