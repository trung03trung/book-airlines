import { useState } from 'react'
import { X, EyeOff, Eye } from 'lucide-react'
import { login } from '../services/authApi'

type Tab = 'card' | 'email' | 'phone'

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('email')
  const [showPw, setShowPw] = useState(false)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const tabs: { key: Tab; label: string }[] = [
    { key: 'card', label: 'Số thẻ' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Số điện thoại' },
  ]

  const placeholders: Record<Tab, string> = {
    card: 'Nhập số thẻ',
    email: 'Nhập email',
    phone: 'Nhập số điện thoại',
  }

  const labels: Record<Tab, string> = {
    card: 'Số thẻ',
    email: 'Email',
    phone: 'Số điện thoại',
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-lg w-[460px] max-w-[95vw] p-8 relative" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[22px] font-bold text-gray-900">Đăng nhập Lotusmiles</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        {/* Cards banner */}
        <div className="mb-6 flex justify-center">
          <img
            src="https://www.vietnamairlines.com/~/media/1BA7AE2456FA4DC4B5E8B0A5C1A3C2F0.ashx"
            alt="Lotusmiles cards"
            className="h-[130px] object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 text-[14px] rounded-full border transition-colors ${
                tab === t.key
                  ? 'border-teal-700 text-teal-700 bg-white font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Form */}
        {error && <p className="text-red-500 text-[13px] mb-3">{error}</p>}
        <form onSubmit={async e => {
          e.preventDefault()
          setError('')
          setLoading(true)
          try {
            const res = await login({ email: identifier, password })
            localStorage.setItem('accessToken', res.data.accessToken)
            localStorage.setItem('refreshToken', res.data.refreshToken)
            onClose()
          } catch (err: any) {
            setError(err.message)
          } finally {
            setLoading(false)
          }
        }}>
          <label className="block text-[14px] text-gray-700 mb-1">{labels[tab]}</label>
          <input
            type={tab === 'email' ? 'email' : 'text'}
            placeholder={placeholders[tab]}
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-3 text-[14px] mb-4 focus:outline-none focus:border-teal-600"
          />

          <label className="block text-[14px] text-gray-700 mb-1">Mật khẩu</label>
          <div className="relative mb-6">
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3 text-[14px] pr-10 focus:outline-none focus:border-teal-600"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPw ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 rounded text-[15px] transition-colors disabled:opacity-50"
          >
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>

        <button className="w-full text-center text-teal-700 text-[14px] mt-4 hover:underline">
          Quên mật khẩu
        </button>
      </div>
    </div>
  )
}
