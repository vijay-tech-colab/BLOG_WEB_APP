import { LoginForm } from "@/components/login-form";
import React from "react";

function LoginSection() {
  return (
    <div className="relative bg-gradient-soft flex min-h-svh w-full items-center justify-center p-6 md:p-10 flex-col md:flex-row gap-10 h-[100vh]">
      {/* Image above form on small screens, beside on large */}
      <div className="relative w-full max-w-lg flex justify-center items-center md:order-1 -mb-5 sm:mb-0 z-10">
        <img
          src="/images/login-girl.png"
          alt="Login Illustration"
          className="w-[300px] sm:w-[400px] md:w-[500px] object-contain drop-shadow-xl"
        />
      </div>

      {/* Login Form (visually behind image on small screens) */}
      <div className="relative z-0 w-full max-w-sm mt-[-40px] sm:mt-0">
        <LoginForm/>
      </div>
    </div>
  );
}

export default LoginSection;
