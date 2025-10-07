'use client'
import { Expense } from '@/types/expense'
import { supabase } from '@/lib/supabase'
import { Trash2, Calendar, Tag, IndianRupee } from 'lucide-react'

interface ExpenseListProps {
  expenses: Expense[]
  onExpenseDeleted: () => void
}

export default function ExpenseList({ expenses, onExpenseDeleted }: ExpenseListProps) {
  const handleDelete = async (id: number, description: string) => {
    if (confirm(`Delete "${description}"?`)) {
      try {
        const { error } = await supabase
          .from('expenses')
          .delete()
          .eq('id', id)

        if (error) throw error
        onExpenseDeleted()
      } catch (error) {
        console.error('Error deleting expense:', error)
        alert('Error deleting expense')
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN').format(amount)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Food': 'bg-green-100 text-green-800',
      'Transportation': 'bg-blue-100 text-blue-800',
      'Utilities': 'bg-yellow-100 text-yellow-800',
      'Entertainment': 'bg-purple-100 text-purple-800',
      'Healthcare': 'bg-red-100 text-red-800',
      'Shopping': 'bg-pink-100 text-pink-800',
      'Education': 'bg-indigo-100 text-indigo-800',
      'Other': 'bg-gray-100 text-gray-800'
    }
    return colors[category] || colors['Other']
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Expenses</h2>
      
      {expenses.length === 0 ? (
        <div className="text-center py-12">
          <IndianRupee className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 text-lg">No expenses recorded yet</p>
          <p className="text-gray-400 text-sm">Add your first expense above!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-medium text-gray-900 truncate">{expense.description}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}>
                    <Tag className="mr-1" size={10} />
                    {expense.category}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1" size={14} />
                  {formatDate(expense.date)}
                </div>
              </div>
              
              <div className="flex items-center space-x-3 ml-4">
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-900">
                    ₹{formatAmount(expense.amount)}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(expense.id, expense.description)}
                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                  title="Delete expense"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
