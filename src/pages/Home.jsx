import React from "react";

function Home() {
  console.log(localStorage.getItem("token"));

  return <div>home page</div>;
}

export default Home;
