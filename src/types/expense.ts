export interface Expense {
  id: number
  description: string
  amount: number
  category: string
  date: string
  created_at: string
}

export interface NewExpense {
  description: string
  amount: number
  category: string
  date: string
}
