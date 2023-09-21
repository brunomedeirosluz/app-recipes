import React from 'react';

export default function Login() {
  return (
    <div>
      <form>
        <input
          name="email"
          placeholder="E-Mail"
          type="email"
          data-testid="email-input"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          data-testid="password-input"
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
        >
          Enter

        </button>
      </form>
    </div>
  );
}
