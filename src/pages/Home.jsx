import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { instance } from "../axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token); // Tokenni olish
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
      <Navbar />

      <div>
        <p></p>
        {data && <div>{data.username}</div>}
      </div>
    </div>
  );
}

export default Home;
