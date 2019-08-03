import React, { Component }  from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery';
import Modal from 'react-bootstrap/Modal';
import AddTransactionForm from './AddTransactionForm';

class FormModal extends Component{

  submitMyForm = null;

  children = null;

  handleSubmitForm = (e) => {
    if(this.submitMyForm){
      this.submitMyForm(e);
    }
  }

  bindSubmitForm = (submitForm) => {
    this.submitMyForm = submitForm;
  };
  render() {
          const  child =
            React.cloneElement(this.props.children,{bindSubmitForm : this.bindSubmitForm,
              ...this.props});

           if(!this.props.show){
            return null;
          }

          return(
              <div>
                <Modal show={this.props.show} onHide={this.props.close}
                aria-labelledby="contained-modal-title-vcenter" centered size="md"
                >

                  <Modal.Header>
                    <Modal.Title id='contained-modal-title-vcenter'>
                      <h2>{this.props.header}</h2>
                    </Modal.Title>
                  </Modal.Header>

                  <Modal.Body>

                    {child}
                    {/*<AddTransactionForm bindSubmitFrom={this.bindSubmitForm} accountId={this.props.accountId}
                                        submitClicked={this.props.submitClicked}/>*/}
                  </Modal.Body>

                  <Modal.Footer>
                    <button type="submit" className="btn btn-secondary" onClick={this.handleSubmitForm}>Save </button>
                    <button type="button" className="btn btn-danger" onClick={this.props.close} >Close </button>
                  </Modal.Footer>
                </Modal>

              </div>
          );
  }
}

export default FormModal;