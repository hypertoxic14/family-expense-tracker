'use client'
import { Expense } from '@/types/expense'
import { TrendingUp, Calendar, PieChart, IndianRupee } from 'lucide-react'

interface SummaryProps {
  expenses: Expense[]
}

export default function Summary({ expenses }: SummaryProps) {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date)
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
  })
  
  const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)
  
  const topCategory = Object.entries(categoryTotals).sort(([,a], [,b]) => b - a)[0]

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN').format(amount)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Expenses</p>
            <p className="text-2xl font-bold">₹{formatAmount(totalAmount)}</p>
            <p className="text-blue-100 text-xs mt-1">{expenses.length} transactions</p>
          </div>
          <TrendingUp size={32} className="text-blue-200" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-md p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">This Month</p>
            <p className="text-2xl font-bold">₹{formatAmount(monthlyTotal)}</p>
            <p className="text-green-100 text-xs mt-1">{monthlyExpenses.length} transactions</p>
          </div>
          <Calendar size={32} className="text-green-200" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Top Category</p>
            <p className="text-2xl font-bold">
              {topCategory ? topCategory[0] : 'None'}
            </p>
            <p className="text-purple-100 text-xs mt-1">
              {topCategory ? `₹${formatAmount(topCategory[1])}` : '₹0'}
            </p>
          </div>
          <PieChart size={32} className="text-purple-200" />
        </div>
      </div>
    </div>
  )
}
