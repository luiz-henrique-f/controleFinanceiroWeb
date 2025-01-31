import { FileText, SquarePen } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "../../components/ui/input";
import { RadioGroupItems } from "./radio-group-items";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateFinancialData } from "../../hooks/updateFInancialData";
import { UpdateFinancialRequest } from "../../interfaces/update-financial-data";
import { useFinancialDataById } from "../../hooks/useFinancialDataById";
import { useEffect, useState } from "react";

const valuesSchema = z.object({
  id: z.string(),
  typeMoviment: z.string(),
  value: z.coerce.number(),
  description: z.string(),
  monthYear: z.string(),
});

type ValuesSchema = z.infer<typeof valuesSchema>;

interface AlertDialogUpdateProps {
  id: string;
  date: string;
}

export function ALertDialogUpdate({ id, date }: AlertDialogUpdateProps) {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar a abertura do modal
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<ValuesSchema>({
      resolver: zodResolver(valuesSchema),
    });

  // Executar o hook apenas quando o modal estiver aberto
  const { data, refetch } = useFinancialDataById(id, {
    enabled: isOpen, // Habilitar a query apenas quando o modal estiver aberto
  });

  const typeMoviment = watch("typeMoviment");

  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error, UpdateFinancialRequest>({
    mutationFn: updateFinancialData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-financial"] });
      queryClient.invalidateQueries({ queryKey: ["list-balance-financial"] });
      toast.success("Dado financeiro atualizado com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao adicionar dado financeiro: " + error.message);
    },
  });

  function handleCreateControl(data: ValuesSchema) {
    if (!data.description) {
      toast.error("A descrição é obrigatória");
      return;
    }
    if (!data.value) {
      toast.error("Informe o valor");
      return;
    }

    mutation.mutate(data);
  }

  // Resetar o formulário quando os dados são carregados
  useEffect(() => {
    if (isOpen && data) {
      reset({
        id: id,
        description: data.description,
        value: data.value,
        monthYear: date,
        typeMoviment: data.typeMoviment,
      });
    }
  }, [isOpen, data, date, id, reset]);

  // Forçar a recarga dos dados quando o modal é aberto
  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-blue-600 hover:bg-blue-500 w-[40px] h-[30px]"
          title="Atualizar registro"
          onClick={() => setIsOpen(true)} // Forçar a abertura do modal
        >
          <SquarePen />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex">
            <FileText />
            Atualização de dados
          </AlertDialogTitle>
          <AlertDialogDescription>
            <form
              id="update-form"
              onSubmit={handleSubmit(handleCreateControl)}
              className="flex space-x-2 justify-between w-full"
            >
              <Input
                className="hidden"
                type="text"
                placeholder="id"
                {...register("id")}
              />
              <Input
                type="text"
                placeholder="Descrição"
                {...register("description")}
              />
              <Input type="text" placeholder="Valor" {...register("value")} />
              <Input
                className="hidden"
                type="text"
                value={date}
                placeholder="date"
                {...register("monthYear")}
              />
              <RadioGroupItems
                value={
                  typeMoviment == ""
                    ? (data?.typeMoviment as string)
                    : typeMoviment
                }
                onChange={(value) => setValue("typeMoviment", value)}
                defaultValue={data?.typeMoviment as string}
              />
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-teal-800"
            form="update-form"
            type="submit"
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
