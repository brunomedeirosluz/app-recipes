import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { Form, Button, Image } from "react-bootstrap";

const INITIAL_LOGIN = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(INITIAL_LOGIN);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    const { email } = formData;
    localStorage.setItem("user", JSON.stringify({ email }));
    navigate("/meals");
  };

  const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
    formData.email
  );
  const isPasswordValid = formData.password.length >= 7;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 flex-column login-container">
      {/* Logo fora do formulário */}
      <Image
        src="src/assets/logo.png"
        alt="Logo"
        className="mb-4 logo-img"
        fluid
      />

      <Form onSubmit={handleSubmit} className="p-4 rounded shadow login-form">
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Control
            type="email"
            placeholder="E-Mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            data-testid="email-input"
            className="login-input"
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            data-testid="password-input"
            className="login-input"
          />
        </Form.Group>

        <Button
          variant="btn btn-warning"
          type="submit"
          disabled={!isEmailValid || !isPasswordValid}
          data-testid="login-submit-btn"
          className="w-100">
          Enter
        </Button>
      </Form>
    </div>
  );
}
