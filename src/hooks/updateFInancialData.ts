import axios from "axios";
import { UpdateFinancialRequest } from "../interfaces/update-financial-data";

export async function updateFinancialData(data: UpdateFinancialRequest): Promise<any> {
  try {
    await axios.put("http://localhost:8080/financeiro", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar movimentação:", error);
  }
}
