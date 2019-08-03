import React, { Component }  from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery';
import Modal from 'react-bootstrap/Modal';
import AddTransactionForm from './AddTransactionForm';

class ResponseModal extends Component{

  render(){
    if(!this.props.show){
      return null;
    }
    return (
        <div>

          <Modal show={this.props.show} onHide={this.props.close}
                 aria-labelledby="contained-modal-title-vcenter" centered size="md">
            <Modal.Header>
              <Modal.Title id='contained-modal-title-vcenter'>
                <h2>{this.props.header}</h2>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {this.props.children}
            </Modal.Body>

            <Modal.Footer>
              <button type="button" className="btn btn-danger" onClick={this.props.close} >Ok </button>
            </Modal.Footer>
          </Modal>
        </div>
    );
  }
}

export default ResponseModal;