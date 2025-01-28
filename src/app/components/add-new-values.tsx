import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { RadioGroupItems } from "./radio-group-items";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { toast } from "sonner";

interface AddNewValueProps {
  date: string;
}

const valuesSchema = z.object({
  description: z.string(),
  value: z.coerce.number(),
  type: z.string().default("E"),
  date: z.string(),
});

type ValuesSchema = z.infer<typeof valuesSchema>;

function AddNewValue({ date }: AddNewValueProps) {
  const { register, handleSubmit, setValue, watch } = useForm<ValuesSchema>({
    resolver: zodResolver(valuesSchema),
  });

  const type = watch("type");

  function handleCreateControl(data: ValuesSchema) {
    if (!data.description) {
      toast.error("A descrição é obrigatória");
      return;
    }
    if (!data.value) {
      toast.error("Informe o valor");
      return;
    }
    console.log(data);
  }

  useEffect(() => {
    setValue("date", date);
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
        {...register("date")}
      />
      <RadioGroupItems
        value={type == '' ? 'E' : type}
        onChange={(value) => setValue("type", value)}
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
