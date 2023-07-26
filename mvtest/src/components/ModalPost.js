import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { API } from "../config/API/api";
import Swal from "sweetalert2";
import {useMutation} from "react-query"
import { useNavigate } from "react-router-dom";

export default function ModalPost({ show, handleClose }) {

  let navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const [form, setForm] =  useState({
    caption: '',
    tags: '',
    image: '',
  });

  // const handleChange = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleChange = (e) => {
    const { name, type } = e.target;
    const value = type === "file" ? e.target.files[0] : e.target.value;
  
    setForm({
      ...form,
      [name]: value,
    });
  
    if (type === "file") {
      const url = URL.createObjectURL(value);
      setPreview(url);
    }
  
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("caption", form.caption);
      formData.set("tags", form.tags);
      formData.append("picture", form.picture)
      const response = await API.post("/post", formData);
      console.log("post success :", response)

      Swal.fire(
        '',
        'Post Success!',
        'success'
        )
        navigate("/");
    } catch (error) {
      console.log("post failed : ", error); 
    }
  })


  return (
    <>
      <Modal show={show} onHide={handleClose} className="text-center">
        <Modal.Footer>
          <div className="w-100"></div>
          <div className="d-flex justify-content-center w-100">
            <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
              <h3 className="py-4" style={{ color: "blueviolet" }}>
                Create Post
              </h3>

              <Form.Group
                controlId="formFile"
                className="mb-4 form-post border border-dark rounded"
              >
                <Form.Control
                  type="file"
                  size="sm"
                  className="shadow"
                  name="picture"
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="preview-post-img mb-4">
                {preview && (
                  <img src={preview} alt="Preview" className="img-preview" />
                )}
              </div>

              <Form.Group className="mb-4 form-post border border-dark rounded">
                <Form.Control
                  name="caption"
                  type="text"
                  placeholder="caption"
                  size="sm"
                  className="shadow"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4 form-post border border-dark rounded">
                <Form.Control
                  name="tags"
                  type="text"
                  placeholder="#tags"
                  size="sm"
                  onChange={handleChange}
                  className="shadow"
                />
              </Form.Group>
              <Button variant="primary" onClick={handleClose} className="m-4">
                Close
              </Button>
              <Button variant="primary" onClick={handleClose} className="m-4" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
