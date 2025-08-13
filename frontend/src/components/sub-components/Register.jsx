import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/slices/userSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react"; // Spinner icon

export default function RegisterForm({ className, ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    role: "reader",
    avatar: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, avatar: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    dispatch(registerUser(data));
  };

  if (user) return <Navigate to="/" />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="p-6 md:p-10 flex items-center justify-center w-full">
        <div
          className={cn("flex flex-col gap-6 w-full max-w-4xl", className)}
          {...props}
        >
          <Card className="bg-white shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Fill in your details below to register
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="flex flex-col gap-6">
                    {/* Name */}
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        required
                        minLength={2}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Email */}
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        value={formData.email}
                        required
                        onChange={handleChange}
                      />
                    </div>

                    {/* Password */}
                    <div className="grid gap-3">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        required
                        minLength={6}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-6">
                    {/* Bio */}
                    <div className="grid gap-3">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        placeholder="Tell something about yourself"
                        value={formData.bio}
                        maxLength={200}
                        onChange={handleChange}
                      />
                    </div>
                    {/* Avatar */}
                    <div className="grid gap-3">
                      <Label htmlFor="avatar">Avatar</Label>
                      <Input
                        id="avatar"
                        name="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                      />

                      {preview && (
                        <img
                          src={preview}
                          alt="Avatar preview"
                          className="w-20 h-20 rounded-full object-cover border"
                        />
                      )}
                    </div>

                    {/* Role */}
                    <div className="grid gap-3">
                      <Label>Role</Label>
                      <Select
                        defaultValue="reader"
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, role: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reader">Reader</SelectItem>
                          <SelectItem value="author">Author</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full"
                    variant="outline"
                    disabled={loading}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {loading ? "Registering..." : "Register"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
