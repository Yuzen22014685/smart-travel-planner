import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Login.css";

export default function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const loginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", loginData);
      localStorage.setItem("token", res.data.token);
      navigate("/trips");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const registerSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.post("/auth/register", registerData);

    alert("Registration successful! Please login.");

    // Clear register form
    setRegisterData({
      name: "",
      email: "",
      password: "",
    });

    // Switch to Login form
    setIsLogin(true);

  } catch (err) {
    alert(err.response?.data?.message || "Register failed");
  }
};

  return (
    <div className="login-container">
      <div className="form-box">

        <div className="button-box">
          <div
            id="btn"
            style={{ left: isLogin ? "0" : "110px" }}
          ></div>

          <button
            type="button"
            className="toggle-btn"
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>

          <button
            type="button"
            className="toggle-btn"
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <div className="name">Smart Travel Planner</div>

        {/* Login Form */}
        <form
          className={`input-group ${
            isLogin ? "active-form" : "hidden-form"
          }`}
          onSubmit={loginSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                email: e.target.value,
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                password: e.target.value,
              })
            }
            required
          />

          <button className="submit-btn">
            Login
          </button>
        </form>

        {/* Register Form */}
        <form
          className={`input-group ${
            !isLogin ? "active-form" : "hidden-form"
          }`}
          onSubmit={registerSubmit}
        >
          <input
            type="text"
            placeholder="Name"
            className="input-field"
            value={registerData.name}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                name: e.target.value,
              })
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                email: e.target.value,
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                password: e.target.value,
              })
            }
            required
          />

          <button className="submit-btn">
            Register
          </button>
        </form>

      </div>
    </div>
  );
}
