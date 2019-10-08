import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function Modals(props) {
  return (
    <Modal isOpen={props.modalIsOpen} className='text-primary'>
      <ModalHeader toggle={props.toggleModal} className='text-primary'>
        <p className='text-primary'>Add Video</p>
      </ModalHeader>
      <ModalBody>
        <div>
          <form className='form-group'>
            <label htmlFor='title' className='text-primary'>
              Original Song Title
            </label>
            <input
              className='form-control'
              type='text'
              name='title'
              id=''
              onChange={props.onDetailsChanger}
              required
            />
            <label htmlFor='name' className='text-primary'>
              Original Artist
            </label>
            <input
              className='form-control mb-3'
              type='text'
              name='artist'
              id=''
              onChange={props.onDetailsChanger}
              required
            />
            <div className='my-2'>
              <label htmlFor='file' className='mx-2 text-primary'>
                Video
              </label>
              <input
                className='mb-2 text-primary'
                type='file'
                name='file'
                id=''
                onChange={e => props.fileOnChange(e)}
              />
            </div>
            <div className='my-2'>
              <label htmlFor='thumb' className='mx-2 text-primary'>
                Thumbnail
              </label>
              <input
                type='file'
                name='thumb'
                id=''
                className='text-primary'
                onChange={e => props.fileOnChange(e)}
              />
            </div>
          </form>
          <p className='text-center text-danger'>
            {props.uploadError ? 'Please fill in all the details' : null}
            {props.uploadSizeErr
              ? 'The video size should be less than 20MB'
              : null}
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className='btn btn-sm text-white' onClick={props.uploadVid}>
          Upload
        </button>
        <button className='btn btn-sm text-white' onClick={props.toggleModal}>
          Dismiss
        </button>
      </ModalFooter>
    </Modal>
  );
}
