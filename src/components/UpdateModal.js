import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export class UpdateModal extends Component {
  render() {
    return (
      <div>
        <Modal
          show={this.props.showModal}
          onHide={() => this.props.handelDisUpModal(this.props.updateFav)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={this.props.updateHandel}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue={this.props.updateFav.name}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  defaultValue={this.props.updateFav.price}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>image</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  defaultValue={this.props.updateFav.image}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default UpdateModal;
