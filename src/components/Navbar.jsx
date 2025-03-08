import React from "react";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <div>
      <div className="flex justify-between gap-4">
        <div className="">
          <img src="" alt="site-logo" />
        </div>

        <div className="flex  gap-5">
          <img src="" alt="user-img" />
          <Button>login</Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
