export interface FinancialData {
    id: number,
    typeMoviment: string,
    value: number,
    description: string,
    monthYear: string
}

export interface FinancialDataResponse {
    data: FinancialData[]
}