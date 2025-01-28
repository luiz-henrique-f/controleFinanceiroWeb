import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { FinancialDataResponse } from "../interfaces/financial-data";

const fetchData = async (
  month: string,
  year: string
): AxiosPromise<FinancialDataResponse> => {
  const response = await axios.get<FinancialDataResponse>(
    "http://localhost:8080/financeiro/monthYear",
    {
      params: {
        month,
        year,
      },
    }
  );
  return response;
};

export function useFinancialData(monthYearFn: string) {
  const monthFn = monthYearFn.split("/")[0];
  const yearFn = monthYearFn.split("/")[1];

  const query = useQuery({
    queryFn: () => fetchData(monthFn, yearFn),
    queryKey: ["list-financial"],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
