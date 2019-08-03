import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
import AccountsList from './AccountsList';
import TransactionComponent from "./TransactionComponent";
import Header from "./Header";

class AccountApp extends Component{

  render() {
    return (
        <>
        <Header />

          </>
    );
  }
}

export default AccountApp