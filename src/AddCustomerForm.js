import React, { Component }  from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery';
import {ErrorMessage, Field, Form, Formik} from "formik";

class AddCustomerForm extends Component{
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
              'firstName':formData == undefined? '' : formData.firstName,
              'lastName':formData == undefined? '' : formData.lastName,
              'email':formData == undefined? '' : formData.email,
              'phoneNumber':formData == undefined? '' : formData.phoneNumber,
              'id':formData == undefined ? '' : formData.id
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
                    <label htmlFor="firstName">First Name</label>
                    <Field name="firstName" type="text" className='form-control form-control' />
                    <ErrorMessage name="firstName" component="div" className="invalid" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <Field name="lastName" type="text" className='form-control form-control'  />
                    <ErrorMessage name="lastName" component="div" className="invalid" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="text" className='form-control form-control'  disabled={disabled}/>
                    <ErrorMessage name="email" component="div" className="invalid" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <Field name="phoneNumber" type="text" className='form-control form-control'  />
                    <ErrorMessage name="phoneNumber" component="div" className="invalid" />
                  </div>

                </Form>
            )
          }}
        </Formik>
    );
  }

}

export default AddCustomerForm;