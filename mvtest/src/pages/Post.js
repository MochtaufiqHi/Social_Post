import React, { useState } from 'react'
import Sidebar from '../components/Sidebar';
import PostItemUser from '../components/PostItemUser';
import "./index.css"
import FloatingButton from '../components/FloatingButton';
import ModalPost from '../components/ModalPost';

function Post() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className='p-relative'>
      <Sidebar />
      <PostItemUser />
      <FloatingButton 
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      <ModalPost 
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />

    </div>
  )
}

export default Post;