import { Card, CardContent } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Users,
  MessageSquare,
  Bell,
} from "lucide-react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const stats = [
  { icon: Users, label: "Users", value: 1234 },
  { icon: MessageSquare, label: "Comments", value: 567 },
  { icon: Bell, label: "Notifications", value: 89 },
];

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "User Activity",
      data: [100, 200, 150, 220, 300, 250, 400],
      backgroundColor: "#4f46e5",
      borderRadius: 8,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function AnalyticsDashboard() {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Analytics Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((item, i) => (
          <Card key={i} className="bg-gradient-to-tr from-indigo-100 to-white shadow-sm">
            <CardContent className="flex items-center gap-4 p-6">
              <item.icon className="h-8 w-8 text-indigo-600" />
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <h3 className="text-xl font-bold">{item.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly User Activity</h3>
          <Bar data={data} options={options} />
        </CardContent>
      </Card>
    </div>
  );
}
