import React, { Component }  from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery';
import {ErrorMessage, Field, Form, Formik} from "formik";

class AddTransactionForm extends Component{
  render() {
    const {bindSubmitForm} = this.props;
    return(
        <Formik
            initialValues={{
              accountId: this.props.accountId,
              transactionType: '',
              transactionAmount: ''
            }}
            onSubmit={fields => {
              this.props.submitClicked(fields);
            }}
          >

          {(formikProps) => {
            const { values, handleChange, handleBlur, handleSubmit } = formikProps;

            // bind the submission handler remotely
            bindSubmitForm(formikProps.submitForm);
              console.log(bindSubmitForm);
            return (
                <Form>
                  <div className="form-group">
                  <label htmlFor="accountId">Account ID</label>
                  <Field name="accountId" type="text" className='form-control form-control' disabled />
                  <ErrorMessage name="accountId" component="div" className="invalid" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="transactionType">Transaction Type</label>
                    <Field name="transactionType" component="select" placeholder="Transaction Type"
                           className='form-control form-control'>
                      <option value="">Select a value</option>
                      <option value="CREDIT">CREDIT</option>
                      <option value="DEBIT">DEBIT</option>
                    </Field>
                    <ErrorMessage name="transactionType" component="div" className="invalid" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="transactionAmount">Transaction Amount</label>
                    <Field name="transactionAmount" type="text" className='form-control form-control'  />
                    <ErrorMessage name="transactionAmount" component="div" className="invalid" />
                  </div>


                </Form>
            )
          }}
        </Formik>
    );
  }

}

export default AddTransactionForm;