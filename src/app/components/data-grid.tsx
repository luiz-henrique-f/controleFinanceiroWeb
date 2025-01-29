import { useState } from "react";
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

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "../../components/ui/button";

interface DataGridProps {
  date: string;
}

interface CustomColumnMeta {
  className?: string;
}

export function DataGrid({ date }: DataGridProps) {
  const { data } = useFinancialData(date);

  // Garantir que `data` seja sempre um array
  const tableData = Array.isArray(data) ? data : [];

  // Estado da paginação
  const [pagination, setPagination] = useState({
    pageIndex: 0, // Começa na primeira página
    pageSize: 5, // Exibir 5 registros por página
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Definir as colunas da tabela
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ getValue }) => (
        <span className="font-medium">{getValue() as any}</span>
      ),
    },
    {
      accessorKey: "value",
      header: "Valor",
      meta: { className: "text-center w-[300px]" } as CustomColumnMeta, // Alinha esta coluna ao centro
      cell: ({ getValue }) => (
        <span className="text-center">
          {formatCurrency(getValue() as number)}
        </span>
      ),
    },
    {
      accessorKey: "typeMoviment",
      header: "Tipo",
      meta: { className: "text-center w-[100px]" } as CustomColumnMeta, // Alinha esta coluna ao centro
      cell: ({ getValue }) => (
        <div className="text-center">
          {getValue() === "E" ? (
            <Badge variant={"theme"}>Entrada</Badge>
          ) : (
            <Badge variant={"destructive"}>Saída</Badge>
          )}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination }, // Passar o estado de paginação
    onPaginationChange: setPagination, // Atualizar estado ao mudar página
    manualPagination: false, // Deixar o React Table controlar a paginação
  });

  return (
    <div>
      <div className="w-[100%] flex justify-center items-center mx-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      (header.column.columnDef.meta as CustomColumnMeta)
                        ?.className || ""
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        (cell.column.columnDef.meta as CustomColumnMeta)
                          ?.className || ""
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  <Search className="w-8 h-8 mx-auto" />
                  Nenhum dado disponível
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="bg-teal-800"
        >
          <ChevronLeft />
          Anterior
        </Button>
        <span>
          Página {pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-teal-800"
        >
          Próximo
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
