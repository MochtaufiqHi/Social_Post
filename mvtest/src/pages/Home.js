import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'
import PostItem from '../components/PostItem';

function Home() {
  return (
    <>
      <Sidebar />
      <PostItem />
    </>
  )
};

export default Home;