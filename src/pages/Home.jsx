import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { instance } from "../axios";
import { useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";

function Home() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      console.log("Token topilmadi!");

      return;
    }

    setLoading(true);
    instance
      .get("/user/get-me/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Xatolik:", error.message);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <div>loading..... user</div>;
  }

  return (
    <div>
      <h1>home page</h1>
    </div>
  );
}

export default Home;
