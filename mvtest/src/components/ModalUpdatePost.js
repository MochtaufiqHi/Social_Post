import React, { useState } from 'react'
import {Button, Modal, Form} from 'react-bootstrap'

export default function ModalUpdatePost({handleClose, handleShow, show}) {
  const [preview, setPreview] = useState(null);
  
  return (
    <>
      <Modal show={show} onHide={handleClose} className='text-center' >
        <Modal.Footer >
          <div className='w-100'>

          </div>
          <div className='d-flex justify-content-center w-100'>
          <Form >
            <h3 className="py-4" style={{ color: "blueviolet" }}>
              Create Post
            </h3>

            <Form.Group controlId="formFile" className="mb-4 form-post border border-dark rounded">
              <Form.Control
                type="file"
                size="sm"
                className="shadow"
                name="picture"
              />
            </Form.Group>

              <div className="preview-post-img mb-4">
                {preview && (
                  <img src={preview} alt="Preview" className="img-preview" />
                )}
              </div>

            <Form.Group className="mb-4 form-post border border-dark rounded">
              <Form.Control
                // onChange={handleChange}
                name="caption"
                type="text"
                placeholder="caption"
                size="sm"
                className="shadow"
              />
            </Form.Group>

            <Form.Group className="mb-4 form-post border border-dark rounded">
              <Form.Control
                name="tags"
                type="text"
                placeholder="#tags"
                size="sm"
                className="shadow"
              />
            </Form.Group>
          <Button variant="primary" onClick={handleClose} className='m-4'>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose} className='m-4'>
            Submit
          </Button>
          </Form>
          </div>
        </Modal.Footer>
      </Modal>
      </>
  )
}
