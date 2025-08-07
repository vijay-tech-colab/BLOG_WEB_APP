// src/pages/ForgotPasswordPage.jsx

import React, { useState } from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "@/store/slices/userSlice";
import { Pencil, Save, Loader2 as Loader2Icon } from "lucide-react";
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const disPatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    disPatch(forgotPassword({ email }));
    setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100 px-4">
      <Card className="w-full max-w-md shadow-xl border-none rounded-2xl">
        <CardContent className="p-8">
          <div className="flex flex-col items-center mb-6">
            <Mail className="h-10 w-10 text-blue-500 mb-2" />
            <h2 className="text-2xl font-bold text-gray-800">
              Forgot Your Password?
            </h2>
            <p className="text-sm text-gray-500 text-center mt-1">
              Enter your email address and we’ll send you a link to reset your
              password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            {loading ? (
              <Button className="w-full rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
                <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                Please wait...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Send Reset Link
              </Button>
            )}
          </form>

          <div className="text-center text-xs text-gray-400 mt-6">
            © {new Date().getFullYear()} BloggApp. All rights reserved.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
