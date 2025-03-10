import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { BookOpen } from "lucide-react";

function LandingPage() {
  console.log(1);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
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
            to="/login"
            className={`text-sm transition-colors hover:text-primary `}
          >
            About
          </Link>
          <Link
            to="#courses"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Courses
          </Link>
          <Link
            to="#pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
export default LandingPage;

const features = [
  {
    title: "PDF Reader",
    description:
      "Kitoblaringizni yuklang va o‘qing. PDF fayllarni oson oching va ko‘ring.",
  },
  {
    title: "So‘zlarni Tarjima Qilish",
    description:
      "Belgilanadigan so‘zlarni avtomatik tarjima qilish va izohlash imkoniyati.",
  },
  {
    title: "Topshiriqlar",
    description:
      "Belgilangan so‘zlar bo‘yicha interaktiv topshiriqlar orqali o‘rganish.",
  },
];
