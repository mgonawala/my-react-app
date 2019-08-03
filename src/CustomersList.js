import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AccountsDataService from './AccountsDataService';
import FormModal from "./FormModal";
import AddTransactionForm from "./AddTransactionForm";
import Modal from "react-bootstrap/Modal";
import AddCustomerForm from "./AddCustomerForm";
import ResponseModal from "./ReponseModal";

class CustomersList extends Component{

  constructor(props){
    super(props);
    this.refreshCustomers = this.refreshCustomers.bind(this);
    this.customerLinkClicked = this.customerLinkClicked.bind(this);
    this.openModalHandler = this.openModalHandler.bind(this);
    this.closeModalHandler = this.closeModalHandler.bind(this);
    this.closeResponseModalHandler =  this.closeResponseModalHandler.bind(this);
    this.customerEditLinkClicked = this.customerEditLinkClicked.bind(this);
    this.openEditModalHandler = this.openEditModalHandler.bind(this);
    this.closeEditModalHandler = this.closeEditModalHandler.bind(this);
    this.goToAccounts = this.goToAccounts.bind(this);

    this.state = {
      customers : [],
      message : '',
      show : false,
      isResponseShowing:false,
      editShow : false,
      formData:''
    }
  }

  componentDidMount(){
    this.refreshCustomers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.path != this.props.match.path) {

      this.refreshCustomers();
    }
  }

  refreshCustomers(){
    const customerId = this.props.match.params.id;
      AccountsDataService.fetchCustomerDetails(customerId)
          .then(response => {
            console.log(response);
            if(response.data.length != undefined){
              this.setState({
                customers: response.data
              })
            }
            else{
              this.setState({
                customers : [...this.state.customers, response.data]
              })
            }

          })
    .catch(error => {
      console.log("Something is been wrong while fetching customers.");
      console.log(error.response);
    })
  }
  customerLinkClicked(fields){
    console.log("clicked on edit link");
      AccountsDataService.createNewCustomer(fields)
            .then(response =>{
              this.setState({
                message: 'Customer added successfully.',
                customers: [...this.state.customers,response.data],
                show: false,
                isResponseShowing: true
              });
            this.props.history.push('/customers');
            })
    .catch(error => {
        this.setState({
          message: error.response.data.errors,
          show:false,
          isResponseShowing: true
        })
    });
  }


  customerEditLinkClicked(fields){
    AccountsDataService.updateCustomer(fields)
        .then(response => {
          console.log(response);
          this.state.customers.filter( c => c.id == fields.id)
            .map( customer => {
              customer.firstName = response.data.firstName;
              customer.lastName = response.data.lastName;
              customer.email = response.data.email;
              customer.phoneNumber = response.data.phoneNumber
            });
            console.log('value updated');
          this.setState({
            message: 'Customer Updated Successfully.',
            isResponseShowing: true,
            editShow : false
          })
          console.log('statue changed');
        })
    .catch( error => {
      this.setState({
        message: error.response.data.errors,
        show:false
      })
    })

  }

  openModalHandler(){
    this.setState({
      show: true
    })
  }

  openEditModalHandler(customer){
    this.setState({
      editShow : true,
      formData: {
        firstName : customer.firstName,
        lastName : customer.lastName,
        email : customer.email,
        phoneNumber : customer.phoneNumber,
        id : customer.id

      }
    })
  }

  closeModalHandler(e){
    this.setState({
      show: false
    })
  }

  closeResponseModalHandler(e){
      this.setState({
        isResponseShowing: false
      })
  }

  closeEditModalHandler(e){
    this.setState({
      editShow: false
    })
  }

  goToAccounts(id){
    console.log("customer id:"+id);
    this.props.history.push(`/customers/${id}/accounts`);
  }
  render() {
    return(
    <div className="container">

      <div className="row">
        <div className="col-lg-9">
          <h3> Customers </h3>
        </div>
        <div className="col-ld-2 vertical-center">
          <button  className="btn btn-outline-primary float-right" onClick={ e => this.openModalHandler()}>Add New Customer</button>
        </div>
      </div>







      <table className="table">
        <caption>List of Customers</caption>
        <thead>
        <tr>
          <th >Customer Number</th>
          <th >First Name</th>
          <th >Last Name</th>
          <th >Phone Number</th>
          <th >Email</th>
          <th >Account creation date</th>
          <th >Actions</th>
        </tr>
        </thead>
        <tbody>
        {
          this.state.customers.map(customer =>
              <tr key={customer.id}>
                <td >{customer.id}</td>
                <td >{customer.firstName}</td>
                <td >{customer.lastName}</td>
                <td >{customer.phoneNumber}</td>
                <td >{customer.email}</td>
                <td >{customer.createdDate}</td>
                <td className="text-nowrap">
                  <div className="float-right">
                    <button className="btn btn-outline-primary col-sm-6"  onClick={ e => this.openEditModalHandler(customer)}>Edit</button>
                    <button className="btn btn-outline-primary col-sm-7 offset-md-1"
                    onClick={() => this.goToAccounts(customer.id)}>Accounts</button>
                  </div>
                </td>
              </tr>
          )
        }
        </tbody>
      </table>
      <FormModal show={this.state.show} close={this.closeModalHandler}
                 header="Add a new Customer !!"
                 submitClicked={this.customerLinkClicked}>
        <AddCustomerForm bindSubmitForm={null}/>
      </FormModal>

      <FormModal show={this.state.editShow} close={this.closeEditModalHandler}
                 header="Edit Details !!"
                 submitClicked={this.customerEditLinkClicked}>
        <AddCustomerForm bindSubmitForm={null} formData={this.state.formData} />
      </FormModal>

      {this.state.message && <ResponseModal show={this.state.isResponseShowing}
                                            close={this.closeResponseModalHandler}>{
        this.state.message}
      </ResponseModal>}
    </div>

    );
  }
}

export default CustomersList;