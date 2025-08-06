import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Pencil, Save, Loader2 as Loader2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/store/slices/userSlice";
import ChangePassword from "./ChangePassword";

export default function Profile() {
  const { user, loading, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "User",
    bio: user?.bio || "",
    avatar: user?.avatar || "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({ ...prev, avatar: file }));
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("bio", profile.bio);

    if (profile.avatar instanceof File) {
      formData.append("avatar", profile.avatar);
    }

    dispatch(updateUser(formData));
  };

  // Close edit mode on successful update
  useEffect(() => {
    if (!loading && message && editMode) {
      setEditMode(false);
    }
  }, [loading, message]);

  // Determine avatar image preview
  const avatarPreview =
    profile.avatar instanceof File
      ? URL.createObjectURL(profile.avatar)
      : profile.avatar?.url || "";

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Admin Profile</h2>
        <Button
          size="icon"
          variant="outline"
          onClick={() => (editMode ? handleSave() : setEditMode(true))}
          disabled={loading}
        >
          {editMode ? (
            <Save className="h-5 w-5" />
          ) : (
            <Pencil className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={avatarPreview} />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>

        {editMode && (
          <div className="w-full sm:w-auto">
            <Label htmlFor="avatarUpload">Upload Avatar</Label>
            <Input
              id="avatarUpload"
              type="file"
              accept="image/*"
              name="avatar"
              onChange={handleImageChange}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Name</Label>
          <Input
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div>
          <Label>Role</Label>
          <Input
            name="role"
            value={profile.role}
            disabled
            className="bg-muted text-muted-foreground cursor-not-allowed"
          />
        </div>
        <div className="sm:col-span-2">
          <Label>Bio</Label>
          <Textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            disabled={!editMode}
            className="resize-none"
            rows={4}
          />
        </div>
      </div>

      <div className="pt-4 w-full flex justify-between items-center">
        <div>
            {editMode ? (
          <Button
            className="w-full sm:w-auto"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                Please wait...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        ) : (
          <div className="">
            <Link to="/admin">
              <Button className="w-full sm:w-auto">Back to Dashboard</Button>
            </Link>
          </div>
        )}
        </div>
        <div>
            <ChangePassword/>
        </div>
      </div>
    </div>
  );
}
