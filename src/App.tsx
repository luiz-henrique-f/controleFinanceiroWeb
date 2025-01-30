import { useEffect, useState } from "react";
import AddNewValue from "./app/components/add-new-values";
import { DataGrid } from "./app/components/data-grid";
import Header from "./app/components/header";
import { useQueryClient } from "@tanstack/react-query";
import CardsBalance from "./app/components/cards-balance";

function App() {
  const [date, setDate] = useState(() => {
    const now = new Date();
    const month = now.getMonth() + 1; // Obtém o mês atual (1-12)
    const year = now.getFullYear();

    return { month, year };
  });

  const queryClient = useQueryClient();

  function handleMonthChange(direction: "prev" | "next") {
    setDate((prevDate) => {
      let { month, year } = prevDate;

      if (direction === "prev") {
        month -= 1;
        if (month === 0) {
          month = 12; // Volta para dezembro
          year -= 1; // Reduz o ano
        }
      } else if (direction === "next") {
        month += 1;
        if (month === 13) {
          month = 1; // Avança para janeiro
          year += 1; // Aumenta o ano
        }
      }

      return { month, year };
    });
  }

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["list-financial"] });
    queryClient.invalidateQueries({ queryKey: ["list-balance-financial"] });
  }, [date]);

  const formattedDate = `${String(date.month).padStart(2, "0")}/${date.year}`;

  return (
    <div className="">
      <Header formattedDate={formattedDate} onMonthChange={handleMonthChange} />

      <CardsBalance date={formattedDate} />

      <div className="flex p-2 w-[98%] bg-white max-w-[1120px] mx-auto mt-2 rounded-lg">
        <AddNewValue date={formattedDate} />
      </div>

      <div className="w-[98%] mx-auto max-w-[1120px] p-2 rounded-lg bg-white mt-2">
        <DataGrid date={formattedDate} />
      </div>
    </div>
  );
}

export default App;
