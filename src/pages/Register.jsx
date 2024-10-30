import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    user_name: "",
    birthdate: "",
    phone_number: "",
    role: "Worker", // Default role
  });
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Create payload that matches both Django User model and auth requirements
    const payload = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      user_name: formData.user_name,
      birthdate: formData.birthdate,
      phone_number: formData.phone_number,
      role: formData.role,
    };

    fetch(`http://localhost:8000/register`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo.token) {
          localStorage.setItem(
            "workflow_token",
            JSON.stringify({
              token: authInfo.token,
              userId: authInfo.id,
            })
          );
          navigate("/");
        } else {
          existDialog.current.showModal();
        }
      });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>Registration failed. Please try again.</div>
        <button
          className="button--close"
          onClick={(e) => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <section>
        <form className="form--login" onSubmit={handleRegister}>
          <h1 className="text-4xl mt-7 mb-3">Workflow Manager</h1>
          <h2 className="text-xl mb-10">Register new account</h2>

          <fieldset className="mb-4">
            <label htmlFor="username">Username*</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Choose a username"
              required
            />
          </fieldset>

          <fieldset className="mb-4">
            <label htmlFor="user_name">Display Name*</label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter your display name"
              required
            />
          </fieldset>

          <fieldset className="mb-4">
            <label htmlFor="first_name">First Name*</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter your first name"
              required
            />
          </fieldset>

          <fieldset className="mb-4">
            <label htmlFor="last_name">Last Name*</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter your last name"
              required
            />
          </fieldset>

          <fieldset className="mb-4">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </fieldset>

          <fieldset className="mb-4">
            <label htmlFor="birthdate">Birthdate*</label>
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </fieldset>

          <fieldset className="mb-4">
            <label htmlFor="phone_number">Phone Number*</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter your phone number"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              title="Format: 123-456-7890"
              required
            />
          </fieldset>

          <fieldset className="mb-4">
            <label htmlFor="role">Role*</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="form-control"
              required
            >
              <option value="Worker">Worker</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
            </select>
          </fieldset>

          <fieldset className="mb-4">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Choose a password"
              required
            />
          </fieldset>

          <fieldset>
            <button
              type="submit"
              className="button p-3 rounded-md bg-blue-800 text-blue-100"
            >
              Register
            </button>
          </fieldset>
        </form>
      </section>
      <div className="loginLinks">
        <section className="link--register">
          <Link
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            to="/login"
          >
            Already have an account?
          </Link>
        </section>
      </div>
    </main>
  );
};
