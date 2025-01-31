import axios, { AxiosPromise } from "axios";
import { UpdateFinancialRequest } from "../interfaces/update-financial-data";
import { useQuery } from "@tanstack/react-query";

const fetchData = async (id: string): AxiosPromise<UpdateFinancialRequest> => {
  const response = await axios.get<UpdateFinancialRequest>(
    `http://localhost:8080/financeiro/${id}`
  );
  return response;
};

export function useFinancialDataById(id: string, options = {}) {
  const query = useQuery({
    queryFn: () => fetchData(id),
    queryKey: ["list-financial-by-id", id], // Adicione o `id` à chave da query
    enabled: !!id, // Habilitar a query apenas se o `id` existir
    ...options, // Mesclar com as opções passadas
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
