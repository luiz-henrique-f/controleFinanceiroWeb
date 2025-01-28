import axios from "axios";
import { PostFinancialRequest } from "../interfaces/post-financial-data";

export async function postFinancialData(data: PostFinancialRequest): Promise<any> {
  try {
    await axios.post("http://localhost:8080/financeiro", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Erro ao cadastrar movimentação:", error);
  }
}
