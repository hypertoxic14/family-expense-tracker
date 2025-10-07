'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { NewExpense } from '@/types/expense'
import { Plus } from 'lucide-react'

interface AddExpenseProps {
  onExpenseAdded: () => void
}

const categories = ['Food', 'Transportation', 'Utilities', 'Entertainment', 'Healthcare', 'Shopping', 'Education', 'Other']

export default function AddExpense({ onExpenseAdded }: AddExpenseProps) {
  const [expense, setExpense] = useState<NewExpense>({
    description: '',
    amount: 0,
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!expense.description.trim() || expense.amount <= 0) return
    
    setLoading(true)
    try {
      const { error } = await supabase
        .from('expenses')
        .insert([expense])

      if (error) throw error

      setExpense({
        description: '',
        amount: 0,
        category: 'Food',
        date: new Date().toISOString().split('T')[0]
      })
      onExpenseAdded()
      alert('Expense added successfully!')
    } catch (error) {
      console.error('Error:', error)
      alert('Error adding expense')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
        <Plus className="mr-2 text-blue-500" size={24} />
        Add New Expense
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <input
              type="text"
              required
              value={expense.description}
              onChange={(e) => setExpense({...expense, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What did you buy?"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              value={expense.amount || ''}
              onChange={(e) => setExpense({...expense, amount: parseFloat(e.target.value) || 0})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={expense.category}
              onChange={(e) => setExpense({...expense, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              required
              value={expense.date}
              onChange={(e) => setExpense({...expense, date: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading || !expense.description.trim() || expense.amount <= 0}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </form>
    </div>
  )
}
