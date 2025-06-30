import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function OAuth2Redirect({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("jwtToken", token);
      setIsLoggedIn(true);
      alert("Google login successful");
      navigate("/");
    } else {
      alert("Login failed");
      navigate("/login");
    }
  }, [location, navigate, setIsLoggedIn]);

  return null;
}
