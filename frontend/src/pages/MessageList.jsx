import { useSelector, useDispatch } from "react-redux";
import { deleteMessage } from "../store/slices/messageSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useState } from "react";
import readbleDate from "../utils/convertDateToReadable";

function UserMessageCard({ messageData }) {
  const dispatch = useDispatch();
  const { _id, sender, email, subject, body, sentAt } = messageData;
  const [open, setOpen] = useState(false);

  const handleDeleteConfirm = () => {
    dispatch(deleteMessage(_id));
    setOpen(false);
    toast.success("Message deleted successfully");
  };

  return (
    <Card className="w-full max-w-md shadow-md relative">
      {/* Delete Button */}
      <div className="absolute top-2 right-2">
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-full hover:bg-red-50 hover:text-red-500 transition"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:max-w-md rounded-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-semibold text-gray-800">
                Delete Message
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                Are you sure you want to delete this message?
                <span className="block text-gray-500 mt-1">
                  This action cannot be undone.
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Yes, Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Link to={`/dashboard/message/${_id}`} className="block">
        <CardHeader>
          <CardTitle className="text-lg">{subject}</CardTitle>
          <p className="text-sm text-muted-foreground">
            From: {sender} | {email}
          </p>
          <p className="text-xs text-gray-400 mt-1">{readbleDate(sentAt)}</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed whitespace-pre-line">{body}</p>
        </CardContent>
      </Link>
    </Card>
  );
}

export default function MessageList() {
  const {userMessages} = useSelector((state) => state.message);
  // console.log(userMessages);
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">USER MESSAGES</h2>
      <div className="flex flex-wrap gap-4 items-start justify-center">
        {!userMessages.length && "No messages"}
        {userMessages?.map((msg) => (
          <UserMessageCard key={msg._id} messageData={msg} />
        ))}
      </div>
    </div>
  );
}
