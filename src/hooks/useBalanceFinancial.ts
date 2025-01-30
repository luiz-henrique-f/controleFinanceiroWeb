import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { BalanceFinancialData } from "../interfaces/balance-financial-data";

const fetchData = async (
  month: string,
  year: string
): AxiosPromise<BalanceFinancialData> => {
  const response = await axios.get<BalanceFinancialData>(
    "http://localhost:8080/financeiro/resumoFinanceiro",
    {
      params: {
        month,
        year,
      },
    }
  );
  return response;
};

export function useBalanceFinancial(monthYearFn: string) {
  const monthFn = monthYearFn.split("/")[0];
  const yearFn = monthYearFn.split("/")[1];

  const query = useQuery({
    queryFn: () => fetchData(monthFn, yearFn),
    queryKey: ["list-balance-financial"],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
