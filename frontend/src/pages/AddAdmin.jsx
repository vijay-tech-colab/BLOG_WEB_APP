import AdminCard from "@/components/sub-components/AdminCard";
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
import { addNewAdmin } from "@/store/slices/userSlice";
import { Plus } from "lucide-react";
import { useReducer } from "react";
import { useDispatch } from "react-redux";

const reducerFun = (state, action) => {
  switch (action.type) {
    case "NAME":
      return { ...state, name: action.payload };
    case "EMAIL":
      return { ...state, email: action.payload };
    case "PASSWORD":
      return { ...state, password: action.payload };
    case "RESET":
      return { name: "", email: "", password: "" };
    default:
      return state;
  }
};

export function AddAdmin() {
  const dispatch = useDispatch();
  const [formState, formDispatch] = useReducer(reducerFun, {
    name: "",
    email: "",
    password: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewAdmin(formState));
    formDispatch({ type: "RESET" });
  };

  return (
    <div className="flex items-center justify-center relative flex-wrap gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="absolute top-0 right-5">
            Add new Admin
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleFormSubmit}>
            <DialogHeader>
              <DialogTitle>Add new Admin</DialogTitle>
              <DialogDescription>
                Create a new Admin with name, email, and password. They can
                update their profile later.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input
                  id="name-1"
                  name="name"
                  value={formState.name}
                  onChange={(e) =>
                    formDispatch({ type: "NAME", payload: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={(e) =>
                    formDispatch({ type: "EMAIL", payload: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={(e) =>
                    formDispatch({ type: "PASSWORD", payload: e.target.value })
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">
                <Plus /> Add Admin
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AdminCard />
    </div>
  );
}
