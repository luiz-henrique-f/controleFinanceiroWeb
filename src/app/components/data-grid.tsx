import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useFinancialData } from "../../hooks/useFinancialData";

interface DataGridProps {
  date: string;
}

export function DataGrid({ date }: DataGridProps) {
  const { data } = useFinancialData(date);

  // console.log(data);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="w-[100%] flex justify-center items-center mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead className="w-[200px] text-center">Valor</TableHead>
            <TableHead className="w-[100px] text-center">Tipo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(data) &&
            data.map((data: any) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium">
                  {data.description}
                </TableCell>
                <TableCell className="text-center">
                  {formatCurrency(data.value)}
                </TableCell>
                <TableCell className="text-center">
                  {data.typeMoviment == "E" ? (
                    <Badge variant={"theme"}>Entrada</Badge>
                  ) : (
                    <Badge variant={"destructive"}>Saída</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
