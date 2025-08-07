import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updatePassword } from "@/store/slices/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ChangePassword() {
  const disPatch = useDispatch();
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleChangePassword = (e) => {
    setPassword((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handleSubmit = () => {
    disPatch(updatePassword(password));
    setPassword({
      oldPassword: "",
      newPassword: "",
    });
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>Change Password</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Password</DialogTitle>
            <DialogDescription>
              Make changes to your password here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="old-password">Old Password</Label>
              <Input
                id="old-password"
                name="oldPassword"
                onChange={handleChangePassword}
                type="password"
                autoComplete="off"
                value={password.oldPassword}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                name="newPassword"
                onChange={handleChangePassword}
                type="password"
                autoComplete="off"
                value={password.newPassword}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
