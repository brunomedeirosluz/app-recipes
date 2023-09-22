import React, { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email);
  const isPasswordValid = formData.password.length >= 7;

  return (
    <div>
      <form>
        <input
          name="email"
          placeholder="E-Mail"
          type="email"
          data-testid="email-input"
          value={ formData.email }
          onChange={ handleChange }
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          data-testid="password-input"
          value={ formData.password }
          onChange={ handleChange }
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !isEmailValid || !isPasswordValid }
        >
          Enter
        </button>
      </form>
    </div>
  );
}
