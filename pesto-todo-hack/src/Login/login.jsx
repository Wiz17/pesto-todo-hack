import "../Login/login.css";
import { apiLogin, isExpired } from "../Api/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const formSubmit = (p) => {
    p.preventDefault();
    console.log(p);
    apiLogin(p.target[0].value, p.target[1].value);
  };
  const [expiredStatus, setExpiredStatus] = useState(true);

  useEffect(() => {
    const checkTokenValidity = async () => {
      // Check if token exists in localStorage
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`/home/isTokenExpired?token=${token}`, {
            method: "GET",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              mode: "no-cors",
            },
          });

          const data = await response.json();
          console.log(data);
          if (!data) {
            console.log("expiredStatus");
            setExpiredStatus(true); // Token is not expired
            window.location.href = "/Home";
          }
        } catch (error) {
          // Error is caught silently without logging
          setExpiredStatus(false); // Token is expired
        }
      } else {
        setExpiredStatus(false);
      }
    };

    checkTokenValidity();
  }, []);

  return (
    <>
      {expiredStatus ? (
        <h1>PAGE NOT FOUND!!!</h1>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <form onSubmit={formSubmit} className="form">
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Login</button>
            <p style={{ marginTop: "10px" }}>
              Not have acoount? <Link to="/signup">Signup</Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
};
export default Login;
