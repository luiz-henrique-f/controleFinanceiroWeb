import axios from "axios";

export async function deleteFinancialData(id: string): Promise<any> {
  try {
    await axios.delete(`http://localhost:8080/financeiro/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Movimentação deletada com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar movimentação:", error);
  }
}