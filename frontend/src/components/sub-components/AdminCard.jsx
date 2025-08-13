import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Ban, Trash2, Shield, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, getAllUsers, toggleBlock } from "@/store/slices/userSlice";

export default function AdminCard() {
  const { allUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Loading states for individual buttons
  const [blockLoading, setBlockLoading] = useState({});
  const [deleteLoading, setDeleteLoading] = useState({});

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const filterAdmin = allUsers.filter(
    (user) => user.role === "admin"
  );

  const handleDelete = (userId) => {
    setDeleteLoading((prev) => ({ ...prev, [userId]: true }));
    dispatch(deleteAccount(userId)).finally(() => {
      setDeleteLoading((prev) => ({ ...prev, [userId]: false }));
      setOpenDelete(false);
      setSelectedUser(null);
    });
  };

  const handleBlock = (userId) => {
    setBlockLoading((prev) => ({ ...prev, [userId]: true }));
    dispatch(toggleBlock(userId)).finally(() => {
      setBlockLoading((prev) => ({ ...prev, [userId]: false }));
    });
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto flex flex-wrap gap-2">
      {filterAdmin.map((user) => (
        <Card
          className="w-full sm:w-[350px] shadow-md hover:shadow-lg transition-all"
          key={user._id}
        >
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={user.avatar?.url} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="flex items-center gap-2">
                {user.name}
                {user.role === "admin" && (
                  <Shield className="w-4 h-4 text-yellow-500" title="Admin" />
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {user.bio && <p className="text-sm">{user.bio}</p>}

            <div className="flex justify-between items-center">
              <Badge
                variant={user.isBlock ? "destructive" : "secondary"}
                className="capitalize"
              >
                {user.isBlock ? "Blocked" : "Active"}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {user.role}
              </Badge>
            </div>

            <div className="flex gap-2">
              {/* Block / Unblock Button */}
              <Button
                variant={user.isBlock ? "secondary" : "destructive"}
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleBlock(user._id)}
                disabled={blockLoading[user._id]}
              >
                {blockLoading[user._id] ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Ban className="w-4 h-4" />
                )}
                {user.isBlock ? "Unblock" : "Block"}
              </Button>

              {/* Delete Button */}
              <Button
                variant="destructive"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => {
                  setSelectedUser(user);
                  setOpenDelete(true);
                }}
                disabled={deleteLoading[user._id]}
              >
                {deleteLoading[user._id] ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Delete Confirmation Modal */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{selectedUser?.name}</span>? This
            action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpenDelete(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(selectedUser._id)}
              disabled={deleteLoading[selectedUser?._id]}
              className="flex items-center gap-2"
            >
              {deleteLoading[selectedUser?._id] && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

