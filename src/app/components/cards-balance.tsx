import { useBalanceFinancial } from "../../hooks/useBalanceFinancial";
import CardControl from "./card-control";

interface CardsBalanceProps {
  date: string;
}

function CardsBalance({ date }: CardsBalanceProps) {
  const { data } = useBalanceFinancial(date);

  return (
    <div className="max-w-[1120px] w-[98%] mx-auto flex gap-5 mt-[-50px] justify-around">
      <CardControl title="Entrada" value={data?.entrada || 0} />
      <CardControl title="Saída" value={data?.saida || 0} />
      <CardControl title="Total" value={data?.saldo || 0} />
    </div>
  );
}

export default CardsBalance;
