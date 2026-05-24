import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

const flights = [
  { depart: '05:00', arrive: '06:25', code: 'VN 7151', duration: '1h 25phút', economy: 2499000, premiumEco: 3903000, business: 5266000 },
  { depart: '05:35', arrive: '07:00', code: 'VN 7153', duration: '1h 25phút', economy: 2499000, premiumEco: 3903000, business: 5266000 },
  { depart: '05:50', arrive: '07:15', code: 'VN 157', duration: '1h 25phút', economy: 2499000, premiumEco: 3903000, business: 5266000 },
  { depart: '07:00', arrive: '08:25', code: 'VN 161', duration: '1h 25phút', economy: 2499000, premiumEco: 3903000, business: 5266000 },
  { depart: '09:00', arrive: '10:25', code: 'VN 163', duration: '1h 25phút', economy: 2499000, premiumEco: 3903000, business: 5266000 },
]

function formatPrice(n: number) {
  return n.toLocaleString('vi-VN')
}

export default function FlightResultsPage() {
  const [params] = useSearchParams()
  const from = params.get('from') || 'HAN'
  const to = params.get('to') || 'DAD'
  const fromCity = params.get('fromCity') || 'Hà Nội'
  const toCity = params.get('toCity') || 'Đà Nẵng'
  const date = params.get('date') || '19/06/2026'
  const passengers = params.get('passengers') || '1'

  const [selectedDateIdx, setSelectedDateIdx] = useState(0)
  const [dateOffset, setDateOffset] = useState(0)
  const [expandedFlight, setExpandedFlight] = useState<{ idx: number; cls: string } | null>(null)
  const [fareSelected, setFareSelected] = useState<{ idx: number; cls: string } | null>(null)

  const totalDays = 21
  const dateDays = Array.from({ length: totalDays }, (_, i) => {
    const [d, m, y] = date.split('/').map(Number)
    const base = new Date(y, m - 1, d)
    const dayIdx = i - 10
    base.setDate(base.getDate() + dayIdx)
    const dayNames2 = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7']
    return {
      day: dayNames2[base.getDay()],
      date: base.getDate(),
      absIdx: dayIdx,
      price: Math.abs(dayIdx) <= 1 ? 2499000 : 1886000,
    }
  })

  // Parse date for display
  const [dd, mm, yy] = date.split('/').map(Number)
  const displayDate = new Date(yy, mm - 1, dd)
  const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']
  const monthNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <img src="https://www.vietnamairlines.com/~/media/Images/Logo/VNA_LOGO.png" alt="Vietnam Airlines" className="h-8" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
            <span className="text-[13px] text-gray-600">Trang chủ</span>
            <span className="text-[13px] text-gray-600">Tiếng Việt</span>
          </div>
          <span className="text-[13px] text-teal-700 cursor-pointer">Đăng nhập hoặc đăng ký</span>
        </div>

        {/* Flight info bar */}
        <div className="flex items-center px-6 py-3 gap-8 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-[18px] font-bold">{from}</span>
            <span className="text-gray-400">·····✈·····</span>
            <span className="text-[18px] font-bold">{to}</span>
          </div>
          <div className="text-[12px] text-gray-500 flex gap-1">
            <span>{fromCity}</span><span className="text-gray-300">|</span><span>{toCity}</span>
          </div>
          <div className="border-l border-gray-200 pl-6">
            <p className="text-[11px] text-gray-500">Chuyến đi</p>
            <p className="text-[13px] font-medium">Th 6, {dd} thg {mm}</p>
          </div>
          <div className="border-l border-gray-200 pl-6">
            <p className="text-[11px] text-gray-500">Hành khách</p>
            <p className="text-[13px] font-medium">{passengers} 👤</p>
          </div>
          <button className="ml-auto border border-gray-300 px-4 py-1.5 text-[12px] rounded flex items-center gap-1 hover:bg-gray-50">
            Thay đổi <ChevronDown size={12} />
          </button>
          <div className="border-l border-gray-200 pl-6 flex items-center gap-2">
            <span className="text-[13px] font-semibold">THÔNG TIN ĐẶT CHỖ</span>
          </div>
        </div>
      </header>

      {/* Hero banner */}
      <div className="relative h-[140px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1200&h=200&fit=crop)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg px-8 py-4 text-center shadow">
            <h1 className="text-[22px] font-bold text-teal-700">Chọn chuyến bay</h1>
            <p className="text-[14px] text-gray-600">{fromCity} đến {toCity}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* Notice */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6 text-[13px] text-gray-700">
          <p>Tra cứu thông tin hành lý <a href="#" className="underline">tại đây.</a></p>
          <p>Lưu ý: Giá dưới đây đã bao gồm thuế, phí</p>
          <p className="text-teal-700 cursor-pointer">+ Phí Dịch Vụ Đặc Biệt</p>
          <p className="text-teal-700 cursor-pointer">+ Thuế, Phí, Lệ phí & Phụ thu</p>
          <p className="text-[12px] text-gray-500 mt-1">Đồng tiền thanh toán hiển thị theo "Quốc gia/Vùng" đã chọn. Quý khách kiểm tra kỹ đồng tiền trước khi thanh toán.</p>
        </div>

        {/* Date display */}
        <p className="text-center text-[16px] font-semibold italic mb-4">
          {dayNames[displayDate.getDay()]}, {dd} tháng {monthNames[mm - 1]}, {yy}
        </p>

        {/* Date slider */}
        <div className="relative rounded-lg p-6 mb-6" style={{ backgroundColor: '#9dcdd8' }}>
          {(() => {
            const [d, m, y] = date.split('/').map(Number)
            const base = new Date(y, m - 1, d)
            // Ngày cuối cùng hiển thị trong cửa sổ (vị trí +5 so với center)
            const lastVisibleDate = new Date(base.getTime() + (dateOffset + 5) * 86400000)
            const firstVisibleDate = new Date(base.getTime() + (dateOffset - 5) * 86400000)
            const daysInLastMonth = new Date(lastVisibleDate.getFullYear(), lastVisibleDate.getMonth() + 1, 0).getDate()
            const atEndOfMonth = lastVisibleDate.getDate() === daysInLastMonth
            const atStartOfMonth = firstVisibleDate.getDate() === 1

            const jumpNextMonth = () => {
              const nextMonth1st = new Date(lastVisibleDate.getFullYear(), lastVisibleDate.getMonth() + 1, 1)
              const diff = Math.round((nextMonth1st.getTime() - base.getTime()) / 86400000) - 5
              setDateOffset(diff)
            }
            const jumpPrevMonth = () => {
              const prevMonthLast = new Date(firstVisibleDate.getFullYear(), firstVisibleDate.getMonth(), 0)
              const diff = Math.round((prevMonthLast.getTime() - base.getTime()) / 86400000) + 5
              setDateOffset(diff)
            }

            return (
              <>
                {atStartOfMonth ? (
                  <button onClick={jumpPrevMonth} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 shadow-lg rounded-md w-12 h-16 flex items-center justify-center hover:bg-gray-50">
                    <ChevronLeft size={22} className="text-gray-700" />
                  </button>
                ) : (
                  <button onClick={() => setDateOffset(dateOffset - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-teal-600 text-white rounded-full flex items-center justify-center z-10">
                    <ChevronLeft size={18} />
                  </button>
                )}
                {atEndOfMonth ? (
                  <button onClick={jumpNextMonth} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 shadow-lg rounded-md w-12 h-16 flex items-center justify-center hover:bg-gray-50">
                    <ChevronRight size={22} className="text-gray-700" />
                  </button>
                ) : (
                  <button onClick={() => setDateOffset(dateOffset + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-teal-600 text-white rounded-full flex items-center justify-center z-10">
                    <ChevronRight size={18} />
                  </button>
                )}
              </>
            )
          })()}

          <div className="overflow-hidden px-12">
            <div
              className="flex items-end gap-2"
              style={{
                transition: 'margin 225ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)',
                marginLeft: `calc(-${(dateOffset + 5) * (100 / 11)}% - ${(dateOffset + 5) * 8}px)`,
                width: `${(totalDays * 100) / 11}%`,
              }}
            >
            {dateDays.map((d) => (
              <button
                key={d.absIdx}
                onClick={() => setSelectedDateIdx(d.absIdx)}
                className={`flex-1 flex flex-col items-center px-2 py-3 rounded ${
                  d.absIdx === selectedDateIdx ? 'bg-yellow-500 text-white' : 'bg-white'
                }`}
              >
                <span className={`text-[13px] font-bold ${d.absIdx === selectedDateIdx ? '' : 'text-gray-700'}`}>
                  {formatPrice(d.price)}
                </span>
                <span className={`text-[11px] ${d.absIdx === selectedDateIdx ? '' : 'text-gray-500'}`}>VND</span>
                <span className={`text-[12px] mt-1 font-medium ${d.absIdx === selectedDateIdx ? '' : 'text-gray-600'}`}>
                  {d.day} {d.date}
                </span>
              </button>
            ))}
            </div>
          </div>

          <div className="text-center mt-4">
            <button className="text-white text-[13px] flex items-center gap-1 mx-auto">
              Ẩn ngày <ChevronDown size={12} className="rotate-180" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-6 text-[12px] text-gray-600">
            <span>Giá vé rẻ nhất 🏷️</span>
            <span>Thời gian nối chuyến dưới 2 giờ ⏱️</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <button className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded text-[13px] font-medium">
            ☰ HIỂN THỊ BỘ LỌC
          </button>
          <div className="flex items-center gap-2 text-[13px]">
            Sắp xếp theo <a href="#" className="underline font-medium">Mặc định</a> <ChevronDown size={12} />
          </div>
        </div>

        <p className="text-[12px] text-gray-500 mb-4">
          ℹ️ Các chuyến bay hiển thị theo thứ tự mặc định do Vietnam Airlines lựa chọn. Quý khách vui lòng chọn tính năng (Bộ lọc hoặc Sắp xếp) để thay đổi thứ tự hiển thị theo nhu cầu.
        </p>

        {/* Flight list */}
        <div className="space-y-4">
          {flights.map((f, i) => {
            const isExpanded = expandedFlight?.idx === i
            const expandedClass = expandedFlight?.cls

            return (
            <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex">
              {/* Flight info */}
              <div className="flex-1 p-5">
                <div className="flex items-center gap-4 mb-2">
                  <div>
                    <span className="text-[26px] font-bold">{f.depart}</span>
                    <p className="text-[12px] text-teal-700 font-medium">{from}</p>
                    <p className="text-[11px] text-gray-400">Nhà ga 1</p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-[12px] text-gray-400">Bay thẳng</p>
                    <div className="border-t border-dashed border-gray-300 my-1" />
                  </div>
                  <div>
                    <span className="text-[26px] font-bold">{f.arrive}</span>
                    <p className="text-[12px] text-teal-700 font-medium">{to}</p>
                    <p className="text-[11px] text-gray-400">Nhà ga 1</p>
                  </div>
                </div>
                <div className="text-[11px] text-gray-500">
                  <p>⏱ Thời gian bay {f.duration}</p>
                  <p>✈ {f.code} Khai thác bởi Vietnam Airlines</p>
                  <a href="#" className="text-teal-700 underline text-[11px]">Chi tiết hành trình ⓘ</a>
                </div>
              </div>

              {/* Price columns */}
              <div className="flex">
                <div
                  onClick={() => setExpandedFlight(isExpanded && expandedClass === 'economy' ? null : { idx: i, cls: 'economy' })}
                  className={`w-[140px] text-white flex flex-col items-center justify-center p-3 cursor-pointer transition-colors ${isExpanded && expandedClass === 'economy' ? 'bg-teal-900' : 'bg-teal-700 hover:bg-teal-800'}`}
                >
                  <p className="text-[11px] font-bold uppercase">Phổ thông</p>
                  <p className="text-[11px]">từ</p>
                  <p className="text-[22px] font-bold">{formatPrice(f.economy)}</p>
                  <p className="text-[11px]">VND</p>
                  <ChevronDown size={12} className={`mt-1 transition-transform ${isExpanded && expandedClass === 'economy' ? 'rotate-180' : ''}`} />
                </div>
                <div
                  onClick={() => setExpandedFlight(isExpanded && expandedClass === 'premium' ? null : { idx: i, cls: 'premium' })}
                  className={`w-[140px] text-white flex flex-col items-center justify-center p-3 cursor-pointer transition-colors ${isExpanded && expandedClass === 'premium' ? 'bg-teal-800' : 'bg-teal-600 hover:bg-teal-700'}`}
                >
                  <p className="text-[11px] font-bold uppercase">Phổ thông đặc biệt</p>
                  <p className="text-[11px]">từ</p>
                  <p className="text-[22px] font-bold">{formatPrice(f.premiumEco)}</p>
                  <p className="text-[11px]">VND</p>
                  <ChevronDown size={12} className={`mt-1 transition-transform ${isExpanded && expandedClass === 'premium' ? 'rotate-180' : ''}`} />
                </div>
                <div
                  onClick={() => setExpandedFlight(isExpanded && expandedClass === 'business' ? null : { idx: i, cls: 'business' })}
                  className={`w-[140px] text-white flex flex-col items-center justify-center p-3 cursor-pointer transition-colors ${isExpanded && expandedClass === 'business' ? 'bg-yellow-700' : 'bg-yellow-600 hover:bg-yellow-700'}`}
                >
                  <p className="text-[11px] font-bold uppercase">Thương gia</p>
                  <p className="text-[11px]">từ</p>
                  <p className="text-[22px] font-bold">{formatPrice(f.business)}</p>
                  <p className="text-[11px]">VND</p>
                  <ChevronDown size={12} className={`mt-1 transition-transform ${isExpanded && expandedClass === 'business' ? 'rotate-180' : ''}`} />
                </div>
              </div>
              </div>

              {/* Expanded fare details */}
              {isExpanded && (
                <div className="border-t border-gray-200 p-6">
                  <h3 className="text-[16px] font-bold text-center mb-1">Chọn giá vé</h3>
                  <p className="text-center text-[13px] text-teal-700 underline mb-4">Điều kiện giá vé ⓘ</p>

                  <div className="flex justify-center">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-5 w-[240px]">
                      <div className="flex items-center justify-between mb-3">
                        <input
                          type="radio"
                          name={`fare-${i}`}
                          className="w-4 h-4 accent-teal-700"
                          checked={fareSelected?.idx === i && fareSelected?.cls === expandedClass}
                          onChange={() => setFareSelected({ idx: i, cls: expandedClass! })}
                        />
                        <span className="text-teal-700">🏷️</span>
                      </div>
                      <p className="text-[20px] font-bold text-gray-900">
                        {formatPrice(expandedClass === 'economy' ? f.economy : expandedClass === 'premium' ? f.premiumEco : f.business)} <span className="text-[13px] font-normal">VND</span>
                      </p>
                      <p className="text-[13px] font-semibold text-gray-700 mb-4">
                        {expandedClass === 'economy' ? 'Phổ Thông Linh Hoạt' : expandedClass === 'premium' ? 'Phổ Thông Đặc Biệt Linh Hoạt' : 'Thương Gia Linh Hoạt'}
                      </p>

                      <div className="space-y-3 text-[12px] text-gray-600">
                        <div className="flex items-start gap-2">
                          <span>🔄</span>
                          <div>
                            <p className="font-semibold text-gray-800">Thay đổi vé</p>
                            <p>Được phép ⓘ</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <span>💳</span>
                          <div>
                            <p className="font-semibold text-gray-800">Hoàn vé</p>
                            <p>Phí hoàn vé tối đa 500.000 VND mỗi hành khách ⓘ</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <span>🧳</span>
                          <div>
                            <p className="font-semibold text-gray-800">Hành lý ký gửi</p>
                            <p>1 x 23 kg ⓘ</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <span>👜</span>
                          <div>
                            <p className="font-semibold text-gray-800">Hành lý xách tay</p>
                            <p>✅ Không quá 10kg</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <span>⭐</span>
                          <div>
                            <p className="font-semibold text-gray-800">Số dặm tích được</p>
                            <p>⭐ Tích lũy 110% số dặm</p>
                          </div>
                        </div>
                      </div>

                      <a href="#" className="text-teal-700 underline text-[12px] mt-3 inline-block">Chi tiết 📋</a>
                    </div>
                  </div>

                  <p className="text-center text-[13px] text-gray-500 mt-4">Vui lòng chọn giá vé để tiếp tục.</p>

                  {fareSelected?.idx === i && fareSelected?.cls === expandedClass && (
                    <div className="mt-6 text-center border-t border-cyan-300 pt-5">
                      <p className="text-[15px] text-gray-800 mb-3">
                        ✅ Quý khách đã chọn {expandedClass === 'economy' ? 'Phổ Thông Linh Hoạt' : expandedClass === 'premium' ? 'Phổ Thông Đặc Biệt Linh Hoạt' : 'Thương Gia Linh Hoạt'}.
                      </p>
                      <button className="border-2 border-teal-700 text-teal-700 font-bold px-8 py-3 text-[15px] rounded hover:bg-teal-700 hover:text-white transition-colors">
                        XÁC NHẬN VÀ TIẾP TỤC
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
