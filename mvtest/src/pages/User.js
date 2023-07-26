import React from "react";
import Sidebar from "../components/Sidebar";
import DetailUser from "../components/DetailUser";
import { useState } from "react";
import ModalUpdateUser from "../components/ModalUpdateUser";

function User() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Sidebar />
      <DetailUser 
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
      />
      <ModalUpdateUser 
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
      />
    </>
  );
}

export default User;
