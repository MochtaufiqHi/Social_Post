import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import "./index.css";
import { useMutation } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import {API, setAuthToken} from '../config/API/api';
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";
function Login() {
  let navigate = useNavigate();
  const [_, dispatch] = useContext(UserContext);

  const [form, setForm] =  useState({
    username: '',
    password: '',
  });


  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const response = await API.post("/auth/login", form);
      console.log("login success :", response)

      if (response.status === 200 ) {
        const userData = response.data.data ;
        
        dispatch({
          type: "LOGIN_SUCCESS",
          role: response.data.data.role,
          payload: userData,
        });
      }

      setAuthToken(localStorage.token);

      navigate("/");
      Swal.fire(
        '',
        'Loggin Success!',
        'success'
      )
    } catch (error) {
      console.log("Login failed : ", error); 
    }
  })

  return (
    <>
      <div className="container login-box">
        <div className="rounded shadow m-5 text-center inner-box-login">
          <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
            {/* <h1 className="my-3">Login</h1> */}
            <h3 className="py-4" style={{color:"blueviolet"}}>Login</h3>

            <Form.Group className="mb-3 form-reg">
              <Form.Control type="text" placeholder="Username" className="shadow" onChange={handleOnChange} name="username"/>
            </Form.Group>

            <Form.Group className="mb-3 form-reg">
              <Form.Control type="password" placeholder="Password" className="shadow" onChange={handleOnChange} name="password"/>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-2" style={{width:"100px", backgroundColor:"blueviolet"}}>
              Login
            </Button>

            <div style={{fontSize:"12px", marginTop:"10px"}}>
              <Link to="/register" style={{fontSize:"12px", textDecoration:"none", color:"black"}}>
                <p>Don't have an account, register <b>Click Here</b></p>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
