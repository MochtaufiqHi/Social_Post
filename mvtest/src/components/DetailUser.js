import React, { useContext, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { API } from "../config/API/api";

function DetailUser() {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
      setShow(false)
  }

  const [confirmedUpdate, setConfirmedUpdate] = useState(false);

  const [state] = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const [preview, setPreview] = useState(null);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  //console.log(state);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        const response = await API.put(
          `/user/${state?.user?.id}`,
          formData
        );
        console.log("User updated:", response.data);
        setShowModal(false);
        setEdit(false);
        setShow(true);

      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  return (
    <div className="detail-user">
      <div className="text-center">
        <h3>Detail User</h3>
        <div>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-2 form-user">
              <Form.Control
                type="text"
                placeholder={state?.user?.name}
                size="sm"
                className="shadow"
                onChange={handleChange}
                name="name"
                disabled={!edit}
              />
            </Form.Group>

            <Form.Group className="mb-2 form-user">
              <Form.Control
                type="text"
                placeholder={state?.user?.username}
                size="sm"
                className="shadow"
                onChange={handleChange}
                disabled={!edit}
                name="username"
              />
            </Form.Group>

            <Form.Group className="mb-2 form-user">
              <Form.Control
                type="email"
                placeholder={state?.user?.email}
                size="sm"
                className="shadow"
                onChange={handleChange}
                disabled={!edit}
                name="email"
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-4 form-user">
              <Form.Control type="file" size="sm" className="shadow" />
            </Form.Group>

            <div className="preview-img-user">
              {preview && (
                <img src={preview} alt="Preview" className="img-preview" />
              )}
            </div>
            <div
              className="d-flex justify-content-evenly gap-5 w-50"
              style={{ margin: "2px auto" }}
            >
              <Button
                variant="primary"
                type="button"
                className="my-5"
                style={{ width: "100px", backgroundColor: "blue" }}
                onClick={toggleEdit}
              >
                {edit ? "Cancel" : "Edit"}
              </Button>
              {!edit && (
                <Button
                  variant="primary"
                  type="submit"
                  className="my-5"
                  style={{ width: "100px", backgroundColor: "blue" }}
                  disabled="true"
                >
                  Submit
                </Button>
              )}

              {edit && (
                <Button
                  variant="primary"
                  type="submit"
                  className="my-5"
                  style={{ width: "100px", backgroundColor: "blue" }}
                >
                  Submit
                </Button>
              )}
            </div>
          </Form>
          <Modal
            show={show}
            onHide={() => handleCloseModal(false)} 
            className="text-center"
            style={{ marginTop: "200px" }}
          >
            <Modal.Footer>
              <div className="w-100">
                <p>Are you sure want to update this data?</p>
              </div>
              <div className="d-flex justify-content-center w-100">
                <Button
                  variant="primary"
                  onClick={() => handleCloseModal(false)} 
                  className="mx-3"
                >
                  No
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleCloseModal(true)} 
                  className="mx-3"
                >
                  Yes
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default DetailUser;
