import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";

function GoDashboard({ children, path }) {
  console.log(children, path);
  return (
    <div className="md:flex items-center justify-center">
      <Link to={path}>
        <Button className="w-full sm:w-auto">
          <CircleArrowLeft />
          {children}
        </Button>
      </Link>
    </div>
  );
}

export default GoDashboard;
