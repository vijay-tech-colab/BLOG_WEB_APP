import { useParams } from "react-router-dom";
import { Mail, User2, CalendarDays } from "lucide-react";

import GoDashboard from "@/components/sub-components/GoDashboard";
import { useSelector } from "react-redux";
const MessageDetails = () => {
  const {userMessages } = useSelector((state)=> state.message)
  const { id } = useParams();
  const message = userMessages.find((msg) => msg._id === id);
// console.log( "message" ,userMessages)
  if (!message) {
    return <div className="text-center text-red-500 p-8">Message not found.</div>;
  }

  return (
    <div className="p-4 space-y-6">
        <div className="min-h-full flex justify-center items-start px-4">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-500" />
          {message.subject}
        </h1>

        <div className="text-sm text-gray-500 flex flex-col gap-2">
          <span className="flex items-center gap-2">
            <User2 className="w-4 h-4" /> {message.sender} ({message.email})
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" /> {message.sentAt}
          </span>
        </div>

        <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line border-t pt-4">
          {message.body}
        </div>
      </div>
    </div>
    <GoDashboard path='/dashboard/messages'>Back Messages</GoDashboard>
    </div>
  );
};

export default MessageDetails;
