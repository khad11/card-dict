import { Link } from "react-router-dom";
import React from "react";
import { Button } from "./ui/button";
import { BookOpen } from "lucide-react";

function Navbar({ data }) {
  console.log(data);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 align-elements">
      <div className=" flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <Link to="/" className="text-xl font-bold text-foreground">
            Easy-Learn
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm transition-colors hover:text-primary `}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-sm transition-colors hover:text-primary `}
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <h3>{data && data.username}</h3>
          <Link to="">
            <Button size="sm">img</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Navbar;
