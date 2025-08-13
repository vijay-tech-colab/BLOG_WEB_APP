import React from "react";
import {
  Bell,
  UserCog,
  LayoutDashboard,
  Users,
  PenLine,
  MessageSquare,
  BarChart2,
  Plus,
  Menu,
  X,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";
import StatsCardWithChart from "@/components/sub-components/Statistics";
function AdminMainSection() {
  const { allUsers, user } = useSelector((state) => state.user);
  const { allBlogs } = useSelector((state) => state.blog);
  const { userMessages } = useSelector((state) => state.message);
  // console.log(allBlogs);
  const ALLUSERS = allUsers.reduce(
    (acc, curr) => {
      if (curr.role === "admin") {
        acc.admin = acc.admin + 1;
      } else if (curr.role === "author") {
        acc.author = acc.author + 1;
      }
      return acc
    },
    {
      admin: 0,
      author: 0,
    }
  );
  const data = {
    users: allUsers?.length,
    admins: ALLUSERS.admin?.length,
    blogs: allBlogs?.length,
    messages: userMessages?.length,
    comments: 10,
    authors: ALLUSERS.author?.length
  }
  return (
    <div>
      {" "}
      <div className="mt-6 md:mt-0 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allUsers.length}</div>
            <p className="text-sm text-muted-foreground">Active this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Authors</CardTitle>
            <PenLine className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ALLUSERS.author}</div>
            <p className="text-sm text-muted-foreground">Publishing blogs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <UserCog className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ALLUSERS.admin}</div>
            <p className="text-sm text-muted-foreground">Team managers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allBlogs?.length}</div>
            <p className="text-sm text-muted-foreground">Published</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,341</div>
            <p className="text-sm text-muted-foreground">User feedbacks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Message</CardTitle>
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userMessages?.length}</div>
            <p className="text-sm text-muted-foreground">User message</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>User Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {[1, 2, 3].map((comment) => (
                <div
                  key={comment}
                  className="p-3 border rounded-md bg-white shadow-sm"
                >
                  <p className="text-sm">
                    <strong>User {comment}:</strong> This blog was very
                    informative and helpful!
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <StatsCardWithChart data={data}/>
      </div>
    </div>
  );
}

export default AdminMainSection;
