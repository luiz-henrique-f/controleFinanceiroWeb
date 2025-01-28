import { ArrowRight, ArrowLeft } from "lucide-react";

function Header({
  formattedDate,
  onMonthChange,
}: {
  formattedDate: string;
  onMonthChange: (direction: "prev" | "next") => void;
}) {
  return (
    <div className="h-[150px] bg-teal-800">
      <h1 className="text-white font-black text-2xl px-3">
        <div className="flex items-center">
          <button onClick={() => onMonthChange("prev")} className="bg-white text-teal-800 mr-2 hover:text-zinc-400" title="Mês anterior">
            <ArrowLeft />
          </button>
          <h1>{formattedDate}</h1>
          <button onClick={() => onMonthChange("next")} className="bg-white text-teal-800 ml-2 hover:text-zinc-400" title="Próximo mês">
            <ArrowRight />
          </button>
        </div>
      </h1>
      <h1 className="text-white font-black text-2xl text-center">
        Controle Financeiro
      </h1>
    </div>
  );
}

export default Header;
