import axios from 'axios';

const BANK_API_URL = 'https://blue-harvest-mohini.herokuapp.com'
const ACCOUNT_API_URL = `${BANK_API_URL}/api/v1/accounts`;
const CUSTOMER_API_URL = `${BANK_API_URL}/api/v1/customers`;

class AccountsDataService{

  retrieveAllAccounts(id){
    if(id == undefined)
    return axios.get(`${ACCOUNT_API_URL}`);
    else
      return axios.get(`${CUSTOMER_API_URL}/${id}/accounts`);
  }

  deleteAccount(id){
    return axios.delete(`${ACCOUNT_API_URL}/${id}`);
  }

  findTransactionsOfAccount(id){
    return axios.get(`${ACCOUNT_API_URL}/${id}/transactions`);
  }

  addNewTransaction(values){
    const data = {
      amount : values.transactionAmount,
      type : values.transactionType
    }
    const id = values.accountId;
    return axios.post(`${ACCOUNT_API_URL}/${id}/transactions`,JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  revertTransaction(account_id, transaction_id){

    return axios.put(`${ACCOUNT_API_URL}/${account_id}/transactions/${transaction_id}`);
  }

  fetchCustomerDetails(id){
    if( id == undefined)
      return axios.get(`${CUSTOMER_API_URL}`);
    else
    {
      return axios.get(`${CUSTOMER_API_URL}/${id}`);
    }
  }

  createNewCustomer(values){
    const data = {
      firstName : values.firstName,
      lastName : values.lastName,
      email : values.email,
      phoneNumber : values.phoneNumber
    }

    return axios.post(`${CUSTOMER_API_URL}`, JSON.stringify(data),{
      headers : {
        'Content-Type':'application/json'
      }
    });

                  ;
  }

  updateCustomer(values){
    const data = {
      firstName : values.firstName,
      lastName : values.lastName,
      email : values.email,
      phoneNumber : values.phoneNumber
    }
    const id = values.id;
    return axios.put(`${CUSTOMER_API_URL}/${id}`, JSON.stringify(data),{
      headers : {
        'Content-Type':'application/json'
      }
    });
  }

  addNewAccount(values){
    const data = {
      type : values.type,
      balance : values.balance,
    }

    const customerId = values.customerId;

    return axios.post(`${CUSTOMER_API_URL}/${customerId}/accounts`,
        JSON.stringify(data),{
      headers : {
        'Content-Type':'application/json'
      }
        });
  }

  getCustomerDetails(id){
    return axios.get(`${CUSTOMER_API_URL}/${id}`);
  }
}

export default new AccountsDataService();