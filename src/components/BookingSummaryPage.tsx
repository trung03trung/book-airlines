import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function BookingSummaryPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [showFareDetails, setShowFareDetails] = useState(false)
  const from = params.get('from') || 'HAN'
  const to = params.get('to') || 'DAD'
  const fromCity = params.get('fromCity') || 'Hà Nội'
  const toCity = params.get('toCity') || 'Đà Nẵng'
  const date = params.get('date') || '03/06/2026'
  const fare = params.get('fare') || 'Phổ Thông Tiêu Chuẩn'
  const price = Number(params.get('price') || '2167000')
  const code = params.get('code') || 'VN 7151'
  const depart = params.get('depart') || '05:00'
  const arrive = params.get('arrive') || '06:25'
  const passengers = params.get('passengers') || '1'

  const [dd, mm, yy] = date.split('/').map(Number)
  const dateObj = new Date(yy, mm - 1, dd)
  const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1100px] mx-auto">
          <div className="flex items-center gap-6">
            <img src="https://www.vietnamairlines.com/~/media/Images/Logo/VNA_LOGO.png" alt="Vietnam Airlines" className="h-8" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
            <span className="text-[13px] text-gray-600">Trang chủ</span>
            <span className="text-[13px] text-gray-600">Tiếng Việt</span>
          </div>
          <span className="text-[13px] text-teal-700 underline cursor-pointer">Đăng nhập hoặc đăng ký</span>
        </div>
      </header>

      {/* Banner */}
      <div className="relative h-[120px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1200&h=200&fit=crop)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg px-8 py-4 text-center shadow">
            <h1 className="text-[20px] font-bold text-gray-900">Lựa chọn của Quý khách</h1>
            <p className="text-[14px] text-gray-600">{fromCity} đến {toCity}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1100px] mx-auto px-4 py-8">
        {/* Warning */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 flex items-center gap-3">
          <span className="text-[20px]">⚠️</span>
          <p className="text-[14px] text-gray-700">Hãy nhanh tay! Chỉ còn vài ghế cuối cùng với mức giá này.</p>
        </div>

        {/* Flight details */}
        <h2 className="text-[20px] font-bold text-teal-700 text-center italic mb-6">Các chuyến bay</h2>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <p className="text-[15px] font-semibold text-gray-900 mb-4">
            {fromCity} đến {toCity} - <span className="font-normal text-gray-600">{dayNames[dateObj.getDay()]}, {dd} tháng {mm}, {yy}</span>
          </p>

          <div className="flex items-center">
            {/* Time left */}
            <div>
              <p className="text-[22px] font-bold">{depart}</p>
              <p className="text-[12px] text-teal-700 font-medium">{from}</p>
              <p className="text-[11px] text-gray-400">Nhà ga 1</p>
            </div>

            {/* Dashed line */}
            <div className="flex-1 mx-4 text-center">
              <p className="text-[11px] text-gray-400">Bay thẳng</p>
              <div className="border-t border-dashed border-gray-300 my-1" />
            </div>

            {/* Time right */}
            <div>
              <p className="text-[22px] font-bold">{arrive}</p>
              <p className="text-[12px] text-teal-700 font-medium">{to}</p>
              <p className="text-[11px] text-gray-400">Nhà ga 1</p>
            </div>

            {/* Flight info */}
            <div className="text-[12px] text-gray-500 ml-8">
              <p>⏱ Thời gian bay 1h 25phút</p>
              <p>✈ {code} Khai thác bởi Vietnam Airlines 🌟</p>
              <a href="#" className="text-teal-700 underline">Chi tiết hành trình ⓘ</a>
            </div>

            {/* Fare class */}
            <div onClick={() => setShowFareDetails(!showFareDetails)} className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 ml-6 cursor-pointer hover:bg-gray-50">
              <span className="text-[13px] font-medium">{fare}</span>
              {showFareDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
          </div>

          {/* Expanded fare details */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showFareDetails ? 'max-h-[800px] opacity-100 mt-6 pt-6 border-t border-gray-200' : 'max-h-0 opacity-0'}`}>
              <div className="grid grid-cols-2 gap-8">
                {/* Left - Chi tiết hành trình */}
                <div>
                  <h4 className="text-[15px] font-semibold text-teal-700 mb-4">Chi tiết hành trình</h4>
                  <div className="relative pl-8 ml-[70px]">
                    <div className="absolute left-[7px] top-2 bottom-[60px] w-[2px] bg-teal-600" />
                    <div className="mb-6 relative">
                      <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-teal-600" />
                      <p className="text-[15px] font-bold">{depart} {fromCity}</p>
                      <p className="text-[12px] text-gray-500">Sân bay Nội Bài, Việt Nam</p>
                      <p className="text-[12px] text-gray-500">Nhà ga 1</p>
                    </div>
                    <p className="text-[12px] text-gray-500 my-6 -ml-[85px] text-center w-[60px]">1 giờ 25 phút</p>
                    <div className="relative">
                      <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-teal-600" />
                      <p className="text-[15px] font-bold">{arrive} {toCity}</p>
                      <p className="text-[12px] text-gray-500">Sân bay Đà Nẵng, Việt Nam</p>
                      <p className="text-[12px] text-gray-500">Nhà ga 1</p>
                    </div>
                  </div>
                  <div className="mt-4 text-[12px] text-gray-600">
                    <p>Số hiệu chuyến bay <span className="font-bold">{code}</span></p>
                    <p>Khai thác bởi Vietnam Airlines 🌟</p>
                    <p>AIRBUS A321</p>
                  </div>
                  <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 text-[13px] rounded transition-colors">
                    CHỌN CHUYẾN KHÁC
                  </button>
                </div>

                {/* Right - Giá vé */}
                <div>
                  <h4 className="text-[15px] font-semibold text-teal-700 mb-4">Giá vé của Quý khách</h4>
                  <p className="font-semibold text-[14px] text-gray-800 mb-4">Phổ Thông Tiêu Chuẩn</p>
                  <div className="space-y-3 text-[13px] text-gray-600">
                    <div className="flex items-start gap-2">
                      <span>🔄</span>
                      <p><span className="font-semibold text-gray-800">Thay đổi vé</span> Phí đổi tối đa 1.010.000 VND mỗi hành khách cho toàn bộ vé ⓘ</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span>💳</span>
                      <p><span className="font-semibold text-gray-800">Hoàn vé</span> Phí hoàn tối đa 1.150.000 VND mỗi hành khách cho toàn bộ vé ⓘ</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span>🧳</span>
                      <p><span className="font-semibold text-gray-800">Hành lý ký gửi</span> 1 x 23 kg ⓘ</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span>👜</span>
                      <p><span className="font-semibold text-gray-800">Hành lý xách tay</span> 1 x 10 kg ⓘ</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span>⭐</span>
                      <p><span className="font-semibold text-gray-800">Số dặm tích được</span> ⭐ Tích lũy 80% số dặm</p>
                    </div>
                  </div>
                  <a href="#" className="text-teal-700 underline text-[12px] mt-3 inline-block">Chi tiết 📋</a>
                </div>
              </div>
          </div>
        </div>

        {/* Price summary */}
        <div className="text-right mb-4">
          <p className="text-[14px] text-gray-600">
            Tổng số tiền: <span className="text-[22px] font-bold text-gray-900">{price.toLocaleString('vi-VN')}</span> <span className="text-[13px]">VND</span>
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6 text-right">
          <p className="text-[14px] text-gray-600 italic">
            Tổng số tiền: <span className="text-[26px] font-bold text-gray-900">{price.toLocaleString('vi-VN')}</span> <span className="text-[14px]">VND</span>
          </p>
          <p className="text-[12px] text-gray-500 mt-1">
            Tổng giá cho tất cả các hành khách (đã bao gồm thuế, phí và chiết khấu). <a href="#" className="text-teal-700 underline">Xem chi tiết giá ⓘ</a>
          </p>

          <div className="flex items-center justify-end gap-2 mt-3 text-[12px] text-teal-700">
            <a href="#" className="underline">Chính sách hành lý ⓘ</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="underline">Xem lại các điều kiện ⓘ</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="underline">Chính sách hàng hóa nguy hiểm ⓘ</a>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-4 mt-6">
            <button onClick={() => navigate(`/passenger-info?from=${from}&to=${to}&fromCity=${encodeURIComponent(fromCity)}&toCity=${encodeURIComponent(toCity)}&date=${date}&passengers=${passengers}`)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-3 text-[14px] rounded transition-colors">
              TIẾP TỤC
            </button>
            <button className="border-2 border-gray-800 text-gray-800 font-bold px-6 py-3 text-[14px] rounded hover:bg-gray-800 hover:text-white transition-colors">
              ĐĂNG NHẬP VÀ TIẾP TỤC
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
