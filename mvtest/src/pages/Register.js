import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./index.css";
import { useMutation } from "react-query";
import { API } from "../config/API/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const [preview, setPreview] = useState(null);
  const [passwordError, setPasswordError] = useState("");

  let navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPass: "",
    photo: "",
  });

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
  
    if (name === "confirmPass" && value !== form.password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

  
  const handleSubmit = useMutation(
    async (e) => {
      try {
        e.preventDefault();

        if (form.password !== form.confirmPass) {
          setPasswordError("Passwords do not match");
          return;
        }
  
        // const photoBase64 = await fileToBase64(form.photo);
        // const photoResponse = await API.post("/file", { photoBase64 });

        // const fileName = photoResponse.data.fileName;

        const formData = new FormData();
        formData.set("name", form.name);
        formData.set("username", form.username);
        formData.set("email", form.email);
        formData.set("password", form.password);
        formData.append("picture", form.picture);
        // formData.set("photo", fileName);

        const response = await API.post("/auth/register", formData);
        console.log("Register success :", response);
        Swal.fire(
          'Register Success!',
          'Please Login First',
          'success'
        )
  
        navigate("/login");
      } catch (error) {
        console.error("Error during registration:", error);
        Swal.fire(
          'Register Failed!',
          'Email already registered',
          'error'
        )
      }
    }
  );
  

  console.log(form);
  return (
    <>
      <div className="container register-box">
        <div className="rounded m-5 text-center shadow inner-box-reg">
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <h3 className="py-4" style={{ color: "blueviolet" }}>
              Register
            </h3>
            <Form.Group className="mb-2 form-reg">
              <Form.Control
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Name"
                size="sm"
                className="shadow"
                required
              />
            </Form.Group>

            <Form.Group className="mb-2 form-reg">
              <Form.Control
                onChange={handleChange}
                name="username"
                type="text"
                placeholder="Username"
                size="sm"
                className="shadow"
                required
              />
            </Form.Group>

            <Form.Group className="mb-2 form-reg">
              <Form.Control
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Email"
                size="sm"
                className="shadow"
                required
              />
            </Form.Group>

            <Form.Group className="mb-2 form-reg">
              <Form.Control
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
                size="sm"
                className="shadow"
              />
            </Form.Group>

            <Form.Group className="mb-2 form-reg">
              <Form.Control
                onChange={handleChange}
                name="confirmPass"
                type="password"
                placeholder="Confirm Password"
                size="sm"
                className="shadow"
              />
            </Form.Group>
            {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}

            <Form.Group controlId="formFile" className="mb-4 form-reg">
              <Form.Control
                type="file"
                size="sm"
                className="shadow"
                name="picture"
                onChange={handleChange}
              />
            </Form.Group>

              <div className="preview-img">
                {preview && (
                  <img src={preview} alt="Preview" className="img-preview" />
                )}
              </div>

            <Button
              variant="primary"
              type="submit"
              className="my-5"
              style={{ width: "100px", backgroundColor: "blueviolet" }}
            >
              Login
            </Button>
          </Form>
          {/* {passwordError && <div style={{ color: "red" }}>{passwordError}</div>} */}
        </div>
      </div>
    </>
  );
}

export default Register;
