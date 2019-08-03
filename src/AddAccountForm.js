import React, { Component }  from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery';
import {ErrorMessage, Field, Form, Formik} from "formik";

class AddAccountForm extends Component{
  render() {
    const {bindSubmitForm} = this.props;
    const {formData} = this.props;
    var disabled = formData == undefined ? false : true;
    var customerIdField = formData == undefined ? '' : <div className="formName">
      <label htmlFor="id">Customer Id</label>
      <Field name="id" type="text" className='form-control' disabled/>
    </div>
    return(
        <Formik
            initialValues={{
              'customerId':formData == undefined? '' : formData.customerId,
              'type':formData == undefined? '' : formData.type,
              'balance':formData == undefined? '' : formData.balance

            }}
            onSubmit={fields => {
              console.log("submit form.");
              console.log(this.props.submitClicked)
              this.props.submitClicked(fields);
            }}
        >

          {(formikProps) => {
            const { values, handleChange, handleBlur, handleSubmit } = formikProps;

            // bind the submission handler remotely
            bindSubmitForm(formikProps.submitForm);

            return (
                <Form>
                  {customerIdField}
                  <div className="form-group">
                    <label htmlFor="customerId">Customer ID</label>
                    <Field name="customerId" type="text" className='form-control form-control' />
                    <ErrorMessage name="customerId" component="div" className="invalid" />
                  </div>


                  <div className="form-group">
                    <label htmlFor="type">Account Type</label>
                    <Field name="type" component="select" placeholder="Transaction Type"
                           className='form-control form-control'>
                      <option value="">Select a value</option>
                      <option value="CURRENT">CURRENT</option>
                      <option value="SAVINGS">SAVINGS</option>
                    </Field>
                    <ErrorMessage name="type" component="div" className="invalid" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="balance">Account Balance</label>
                    <Field name="balance" type="text" className='form-control form-control'  />
                    <ErrorMessage name="balance" component="div" className="invalid" />
                  </div>

                </Form>
            )
          }}
        </Formik>
    );
  }

}

export default AddAccountForm;