import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
 

export default function Modals(props) {
  return (
    <Modal isOpen={props.isOpen}>
      <ModalHeader toggle={props.toggleModal}>Add Video</ModalHeader>
      <ModalBody>
        <div>
          <form className="form-group">
            <label htmlFor="title">Title</label>
            <input className="form-control" type="text" name="title" id="" />
            <label htmlFor="name">Name</label>
            <input className="form-control mb-3" type="text" name="name" id="" />
            <label htmlFor="pic">Choose video</label>
            <input type="file" name="video" id="" />
            <label htmlFor="genre">Genre</label>
            <select name="genre" id="genre" className="form-control">
              <option value="hip-hop">Hip hop</option>
              <option value="gqom">Gqom</option>
              <option value="african-trap">African Trap</option>
              <option value="house">House</option>
              <option value="electronic">Electronic/Dance</option>
              <option value="other">Dope</option>
            </select>
          </form>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-sm btn-primary">Upload</button>
        <button className="btn btn-sm btn-danger" onClick={props.toggleModal}>Dismiss</button>
      </ModalFooter>
    </Modal>
  )
}
