import { Trash2 } from "lucide-react";
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
import { deleteFinancialData } from "../../hooks/deleteFinancialData";
import { toast } from "sonner";

interface AlertDialogDeleteProps {
  id: string;
}

export function AlertDialogDelete({ id }: AlertDialogDeleteProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error, string>({
    mutationFn: deleteFinancialData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-financial"] });
      toast.success("Dado financeiro excluído com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao adicionar dado financeiro: " + error.message);
    },
  });

  function handleClickDelete(id: string) {
    mutation.mutate(id);
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-destructive hover:bg-destructive/80 w-[40px] h-[30px]"
          title="Excluir registro"
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja realmente excluir?</AlertDialogTitle>
          <AlertDialogDescription>
            Atenção, ao clicar no botão confirmar, o dado será excluído.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-teal-800"
            onClick={() => handleClickDelete(id)}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
