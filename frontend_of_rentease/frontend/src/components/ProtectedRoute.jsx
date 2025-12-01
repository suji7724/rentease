import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const loginTime = localStorage.getItem("loginTime");

  const MAX_SESSION_TIME = 30 * 60 * 1000; //  30 minutes

  useEffect(() => {
    if (!loginTime) return;

    const remainingTime =
      MAX_SESSION_TIME - (Date.now() - Number(loginTime));

    if (remainingTime <= 0) {
      //  Session expired
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("loginTime");
      window.location.href = "/login";
      return;
    }

    //  Auto logout after remaining time
    const timer = setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("loginTime");
      alert("Session expired. Please login again.");
      window.location.href = "/login";
    }, remainingTime);

    return () => clearTimeout(timer);
  }, [loginTime]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

