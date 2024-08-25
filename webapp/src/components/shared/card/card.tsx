import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface CardDashboardProps {
  header: ReactNode;
  content: ReactNode;
  icon?: ReactNode;
  iconColor?: string;
  backgroundColor?: string;
}

export const CardDashboard = ({
  header,
  content,
  icon,
  iconColor = "bg-blue-600",
  backgroundColor = "bg-white"
}: CardDashboardProps) => {
  return (
    <Card
      className={`relative border border-gray-200 rounded-lg w-48 p-4 flex flex-col items-center justify-center text-center ${backgroundColor} shadow-md`}
    >
      {icon && (
        <div
          className={`absolute -top-6 flex items-center justify-center rounded-full p-2 ${iconColor} text-white shadow-md`}
        >
          {icon}
        </div>
      )}
      <CardHeader className="text-xs font-medium mb-1">
        {header}
      </CardHeader>
      <CardContent className="text-md font-semibold">
        {content}
      </CardContent>
    </Card>
  );
};
