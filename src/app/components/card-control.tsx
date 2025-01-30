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
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

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
          {title == "Total" ? (
            Number(value) < 0 ? (
              <p className="text-base sm:text-lg font-bold text-destructive">
                R$ {formatCurrency(value)}
              </p>
            ) : (
              <p className="text-base sm:text-lg font-bold text-green-600">
                R$ {formatCurrency(value)}
              </p>
            )
          ) : (
            <p className="text-base sm:text-lg font-bold">
              R$ {formatCurrency(value)}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CardControl;
