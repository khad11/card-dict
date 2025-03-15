import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { BookOpen } from "lucide-react";

function LandingPage() {
  return (
    <div className=" bg-slate-900 h-screen text-white align-elements">
      <div className="sticky top-0 z-50 w-full  mb-10 bg-slate-800 ">
        <div className="container flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 " />
            <Link to="/" className="text-xl font-bold ">
              Easy-Learn
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" variant="default">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  p-6 ">
        {features.map((f, index) => {
          return (
            <div
              key={index}
              className="p-6 mt-20 bg-slate-800  rounded-lg w-[250px]"
            >
              <h1 className="text-2xl text-center font-bold">{f.title}</h1>
              <p className="text-sm text-center p-2">{f.description}</p>
            </div>
          );
        })}
      </div>
    </div>
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
