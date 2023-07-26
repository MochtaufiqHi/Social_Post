import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ModalUpdateUser({
  handleClose,
  handleConfirmed,
  show,
}) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className="text-center"
        style={{ marginTop: "200px" }}
      >
        <Modal.Footer>
          <div className="w-100">
            <p>Are you sure want to update this data ?</p>
          </div>
          <div className="d-flex justify-content-center w-100">
            <Button variant="primary" onClick={handleClose} className="mx-3">
              No
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleConfirmed();
                handleClose();
              }}
              className="mx-3"
            >
              Yes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
