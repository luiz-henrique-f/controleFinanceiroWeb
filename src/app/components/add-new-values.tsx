import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { RadioGroupItems } from "./radio-group-items";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { toast } from "sonner";
import { postFinancialData } from "../../hooks/postFinancialData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostFinancialRequest } from "../../interfaces/post-financial-data";

interface AddNewValueProps {
  date: string;
}

const valuesSchema = z.object({
  typeMoviment: z.string().default("E"),
  value: z.coerce.number(),
  description: z.string(),
  monthYear: z.string(),
});

type ValuesSchema = z.infer<typeof valuesSchema>;

function AddNewValue({ date }: AddNewValueProps) {
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<ValuesSchema>({
      resolver: zodResolver(valuesSchema),
    });

  const typeMoviment = watch("typeMoviment");

  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error, PostFinancialRequest>({
    mutationFn: postFinancialData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-financial"] });
      toast.success("Dado financeiro adicionado com sucesso!");

      reset();
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

  useEffect(() => {
    setValue("monthYear", date);
  }, [date, setValue]);

  return (
    // <div className="flex space-x-2 justify-between w-full">
    <form
      onSubmit={handleSubmit(handleCreateControl)}
      className="flex space-x-2 justify-between w-full"
    >
      <Input type="text" placeholder="Descrição" {...register("description")} />
      <Input type="text" placeholder="Valor" {...register("value")} />
      <Input
        className="hidden"
        type="text"
        value={date}
        placeholder="date"
        {...register("monthYear")}
      />
      <RadioGroupItems
        value={typeMoviment == "" ? "E" : typeMoviment}
        onChange={(value) => setValue("typeMoviment", value)}
        defaultValue="E"
      />
      <Button className="bg-teal-800" type="submit">
        Adicionar
      </Button>
    </form>
    // </div>
  );
}

export default AddNewValue;
