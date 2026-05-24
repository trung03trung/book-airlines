import { useState } from 'react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [countryCode, setCountryCode] = useState('84')
  const [phone, setPhone] = useState('')

  return (
    <div className="min-h-[calc(100vh-50px)]">
      {/* Top nav bar */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-center gap-12 py-4 text-[14px] text-gray-700">
          <a href="#" className="hover:text-teal-700">Mua vé</a>
          <a href="#" className="hover:text-teal-700">Quản lý đặt chỗ</a>
          <a href="#" className="hover:text-teal-700">Làm thủ tục</a>
          <a href="#" className="hover:text-teal-700">Trạng thái chuyến bay</a>
          <a href="#" className="hover:text-teal-700">Tra cứu lịch bay</a>
        </div>
      </nav>

      {/* Header */}
      <div className="px-8 py-6 flex items-center justify-between">
        <h1 className="text-[28px] font-bold text-gray-900">Đăng ký tài khoản</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 text-[13px] rounded hover:bg-gray-50">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Đăng ký qua Facebook
          </button>
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 text-[13px] rounded hover:bg-gray-50">
            🌟 Mua số thẻ đẹp
          </button>
        </div>
      </div>

      {/* Form section */}
      <div className="mx-8 border border-gray-200 rounded-lg p-8 bg-white">
        <h2 className="text-[18px] font-bold text-gray-900 mb-2">Nhập thông tin đăng ký</h2>
        <p className="text-[14px] text-gray-600 mb-6">Đăng ký hội viên Bông Sen Vàng, nhận ngay 1000 dặm thưởng.</p>

        <p className="text-[14px] font-semibold text-gray-800 mb-4">Thông tin đăng ký</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email */}
          <div>
            <label className="block text-[13px] text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Nhập Email"
              className="w-full border-b border-gray-300 py-2 text-[14px] focus:outline-none focus:border-teal-600 bg-transparent"
            />
          </div>

          {/* Mã vùng */}
          <div>
            <label className="block text-[13px] text-gray-700 mb-1">
              Mã Vùng <span className="text-red-500">*</span>
            </label>
            <select
              value={countryCode}
              onChange={e => setCountryCode(e.target.value)}
              className="w-full border-b border-gray-300 py-2 text-[14px] focus:outline-none focus:border-teal-600 bg-transparent appearance-none"
            >
              <option value="84">VIET NAM (84)</option>
              <option value="1">USA (1)</option>
              <option value="44">UK (44)</option>
              <option value="81">JAPAN (81)</option>
              <option value="82">KOREA (82)</option>
              <option value="61">AUSTRALIA (61)</option>
              <option value="33">FRANCE (33)</option>
            </select>
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-[13px] text-gray-700 mb-1">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
              className="w-full border-b border-gray-300 py-2 text-[14px] focus:outline-none focus:border-teal-600 bg-transparent"
            />
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end mt-8">
          <button className="border border-gray-800 text-gray-800 px-6 py-2 text-[14px] font-medium hover:bg-gray-800 hover:text-white transition-colors">
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  )
}
