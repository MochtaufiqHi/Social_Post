import React, { useContext, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "./index.css";
import { API } from "../config/API/api";
import { useQuery } from "react-query";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";

function ChangePassword() {
  const [state] = useContext(UserContext);
  const [show, setShow] = useState(false);

  const handleCloseModal = () => {
    setShow(false);
  };

  const handleShowModal = () => {
    if (newPassword !== confirmNewPassword) {
      Swal.fire({
        icon: "error",
        text: "New password and confirm password must match!",
      });
      return;
    }
    setShow(true);
  };

  let { data: user } = useQuery("userCache", async () => {
    const response = await API.get(`/user/${state?.user?.id}`);
    return response.data.data;
  });

  console.log(user);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      Swal.fire({
        icon: "error",
        text: "New password and confirm password must match!",
      });
      return;
    }

    try {
      const response = await API.put(
        `/user/change-password/${state?.user?.id}`,
        {
          oldPassword,
          newPassword,
          confirmNewPassword,
        }
      );
      console.log(response.data);
      Swal.fire("Good job!", "Successfully Change Password", "success");
    } catch (error) {
      console.error(
        "Error changing password:",
        error.response?.data?.message || "Internal server error"
      );
      if (error.response?.data?.message === "Old password is incorrect") {
        Swal.fire({
          icon: "error",
          text: "Old password is incorrect. Please try again.",
        });
      } else {
      }
    }
  };

  return (
    <div className="change-pass">
      <div>
        <h3>Change password</h3>
        <div className="d-flex mt-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Control
                type="password"
                placeholder="old password"
                className="shadow text-center"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="password"
                placeholder="new password"
                className="shadow text-center"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="password"
                placeholder="confirm new password"
                className="shadow text-center"
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="my-5"
              style={{ width: "100px", backgroundColor: "blue" }}
            >
              Update
            </Button>
          </Form>
          <Modal
            show={show}
            onHide={() => setShow(false)} 
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
                  onClick={() => setShow(false)} 
                  className="mx-3"
                >
                  No
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSubmit} 
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

export default ChangePassword;
