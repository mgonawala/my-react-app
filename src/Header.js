import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import CustomersList from './CustomersList'
import AccountsList from './AccountsList'
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import TransactionComponent from "./TransactionComponent";

class Header extends Component{

  render() {
    return(
       <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">Blue Harvest</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/accounts" className="navbar-brand">Accounts</Link>
              </li>
              <li className="nav-item active">
                <Link to="/customers" className="navbar-brand">Customers</Link>
              </li>

            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>


           <>
             <Switch>
               <Route path="/" exact component={AccountsList} />
               <Route path="/accounts" exact component={AccountsList} />
               <Route path="/accounts/:id" component={TransactionComponent} />
               <Route path="/customers" exact component={CustomersList}/>
               <Route path="/customers/:id/accounts" component={AccountsList}/>
             </Switch>
           </>

       </Router>
        )
  }
}

export default Header;