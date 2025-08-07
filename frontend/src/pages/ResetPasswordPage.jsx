// src/pages/ResetPasswordPage.jsx

import React, { useState } from "react";
import { Loader2Icon, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/store/slices/userSlice";

const ResetPasswordPage = () => {
  const disPatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const { token } = useParams();
  const navigate = useNavigate();
  console.log(token);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await disPatch(resetPassword({ token, payload: { password } }));
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100 px-4">
      <Card className="w-full max-w-md shadow-xl border-none rounded-2xl">
        <CardContent className="p-8">
          <div className="flex flex-col items-center mb-6">
            <Lock className="h-10 w-10 text-blue-500 mb-2" />
            <h2 className="text-2xl font-bold text-gray-800">
              Reset Your Password
            </h2>
            <p className="text-sm text-gray-500 text-center mt-1">
              Enter a new password to recover your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                Reset Password
              </Button>
            )}
          </form>

          <div className="text-center text-xs text-gray-400 mt-6">
            © {new Date().getFullYear()} YourAppName. All rights reserved.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
