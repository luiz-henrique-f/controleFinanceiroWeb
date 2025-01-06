import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { RadioGroupItems } from "./radio-group-items";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const valuesSchema = z.object({
  description: z.string(),
  value: z.coerce.number(),
  type: z.string(),
});

type ValuesSchema = z.infer<typeof valuesSchema>;

function AddNewValue() {
  const { register, handleSubmit, setValue, watch } = useForm<ValuesSchema>({
    resolver: zodResolver(valuesSchema),
  });

  const type = watch("type");

  function handleCreateControl(data: ValuesSchema) {
    console.log(data);
  }

  return (
    // <div className="flex space-x-2 justify-between w-full">
    <form
      onSubmit={handleSubmit(handleCreateControl)}
      className="flex space-x-2 justify-between w-full"
    >
      <Input type="text" placeholder="Descrição" {...register("description")} />
      <Input type="text" placeholder="Valor" {...register("value")} />
      <RadioGroupItems
        value={type || "entrada"}
        onChange={(value) => setValue("type", value)}
      />
      <Button className="bg-teal-800" type="submit">
        Adicionar
      </Button>
    </form>
    // </div>
  );
}

export default AddNewValue;
