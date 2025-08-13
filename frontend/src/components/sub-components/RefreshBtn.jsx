import { RotateCw } from "lucide-react";
import { Button } from "../ui/button";

export default function RefreshButton() {
  return (
    <Button onClick={() => window.location.reload()} variant="ghost" size="icon" className="bg-gray-50">
      <RotateCw />
    </Button>
  );
}