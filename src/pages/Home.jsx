import React, { useEffect, useState } from "react";
import { instance } from "../axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PDFViewer from "../components/PDFViewer";

function Home() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  console.log(data);
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
  }, []);

  if (loading) {
    return <div>loading..... user</div>;
  }

  return (
    <div className="align-elements">
      <Navbar data={data} />

      <PDFViewer />
    </div>
  );
}

export default Home;
