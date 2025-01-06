import { DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

interface CardControlProps {
  title: string;
  value: number;
}

function CardControl({ title, value }: CardControlProps) {
  return (
    <div className="w-[40%] z-10 ">
      <Card className="">
        <CardHeader>
          <div className="flex items-center justify-center">
            <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
              {title}
            </CardTitle>
            <DollarSign className="ml-auto w-4 h-4" />
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-base sm:text-lg font-bold">R$ {value}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default CardControl;
