import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react'

const news = [
  { date: '2026-03-19', title: 'Thông báo về việc tạm ngừng các chuyến bay do đóng cửa tạm thời Sân bay Đà Lạt' },
  { date: '2026-03-17', title: 'Vietnam Airlines chuyển nhà ga khai thác tại một số sân bay quốc tế' },
  { date: '2026-02-26', title: 'Thông báo tạm dừng hoạt động sân bay Liên Khương' },
  { date: '2026-02-06', title: 'Thông báo tạm dừng hoạt động Phòng khách Eventyr tại sân bay Copenhagen' },
]

const flights = [
  { route: 'TP. Hồ Chí Minh đến Hà Nội', price: '979.000 VND*', time: 'Đã xem 14 giờ trước', type: 'Một chiều', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=500&fit=crop' },
  { route: 'Hà Nội đến TP. Hồ Chí Minh', price: '979.000 VND*', time: 'Đã xem 14 giờ trước', type: 'Một chiều', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=500&fit=crop' },
  { route: 'Hà Nội đến Đà Nẵng', price: '849.000 VND*', time: 'Đã xem 7 giờ trước', type: 'Một chiều', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&h=500&fit=crop' },
  { route: 'TP. Hồ Chí Minh đến Đà Nẵng', price: '817.000 VND*', time: 'Đã xem 7 giờ trước', type: 'Một chiều', img: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=400&h=500&fit=crop' },
  { route: 'Hà Nội đến Phú Quốc', price: '1.200.000 VND*', time: 'Đã xem 5 giờ trước', type: 'Một chiều', img: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=400&h=500&fit=crop' },
  { route: 'TP. Hồ Chí Minh đến Nha Trang', price: '750.000 VND*', time: 'Đã xem 3 giờ trước', type: 'Một chiều', img: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=500&fit=crop' },
  { route: 'Đà Nẵng đến Hà Nội', price: '849.000 VND*', time: 'Đã xem 2 giờ trước', type: 'Một chiều', img: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400&h=500&fit=crop' },
  { route: 'Hà Nội đến Huế', price: '680.000 VND*', time: 'Đã xem 1 giờ trước', type: 'Một chiều', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&h=500&fit=crop' },
  { route: 'TP. Hồ Chí Minh đến Phú Quốc', price: '950.000 VND*', time: 'Đã xem 4 giờ trước', type: 'Một chiều', img: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=400&h=500&fit=crop' },
  { route: 'Hà Nội đến Nha Trang', price: '1.100.000 VND*', time: 'Đã xem 6 giờ trước', type: 'Một chiều', img: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=500&fit=crop' },
  { route: 'Đà Nẵng đến TP. Hồ Chí Minh', price: '849.000 VND*', time: 'Đã xem 8 giờ trước', type: 'Một chiều', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=500&fit=crop' },
  { route: 'Phú Quốc đến Hà Nội', price: '1.200.000 VND*', time: 'Đã xem 10 giờ trước', type: 'Một chiều', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=500&fit=crop' },
]

export default function News() {
  const [newsIndex, setNewsIndex] = useState(0)
  const [flightPage, setFlightPage] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setNewsIndex(i => (i + 1) % news.length), 4000)
    return () => clearInterval(t)
  }, [])
  const perPage = 4
  const totalPages = Math.ceil(flights.length / perPage)
  const currentFlights = flights.slice(flightPage * perPage, flightPage * perPage + perPage)

  return (
    <section className="py-10 bg-white">
      <div style={{ marginLeft: '3rem', marginRight: '2.5rem' }}>
        {/* Tin nhanh */}
        <div className="flex items-center border border-vna-border rounded-full px-6 py-3 mb-10">
          <div className="flex items-center gap-2 pr-4 border-r border-vna-border">
            <Zap size={16} className="text-[#006885]" />
            <span className="text-[14px] font-bold text-[#006885]">Tin nhanh</span>
          </div>
          <p className="flex-1 text-[13px] text-vna-gray-text px-4">{news[newsIndex].title}</p>
          <span className="text-[12px] text-vna-gray-light mr-4">{news[newsIndex].date}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setNewsIndex(i => (i - 1 + news.length) % news.length)} className="text-vna-gray-light hover:text-[#006885]"><ChevronLeft size={16} /></button>
            <span className="text-[12px] text-vna-gray-text">{newsIndex + 1} / {news.length}</span>
            <button onClick={() => setNewsIndex(i => (i + 1) % news.length)} className="text-vna-gray-light hover:text-[#006885]"><ChevronRight size={16} /></button>
          </div>
        </div>

        {/* Các Chuyến Bay Được Ưa Thích Nhất */}
        <h2 className="text-[36px] font-bold text-vna-navy mb-6">Các Chuyến Bay Được Ưa Thích Nhất</h2>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6 border-b border-vna-border pb-4">
          <button className="flex items-center gap-1 text-[13px] text-vna-navy font-medium border border-vna-border rounded-full px-4 py-2">
            Chọn tuyến đường <ChevronRight size={12} className="rotate-90" />
          </button>
          <button className="flex items-center gap-1 text-[13px] text-vna-navy font-medium border border-vna-border rounded-full px-4 py-2">
            Ngân sách <ChevronRight size={12} className="rotate-90" />
          </button>
          <button className="text-[13px] text-vna-gray-light hover:text-[#006885]">Làm mới</button>
        </div>

        {/* Flight cards */}
        <div className="relative">
          <div className="grid grid-cols-4 gap-4">
            {currentFlights.map((f, i) => (
              <div key={i} className="rounded-xl overflow-hidden relative h-[380px] group">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${f.img})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Badge */}
                <div className="absolute top-3 right-3 bg-black/50 text-white text-[11px] px-2 py-0.5 rounded">
                  {flightPage * perPage + i + 1}/{flights.length}
                </div>
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-white font-semibold text-[15px] mb-3">{f.route}</h4>
                  <div className="text-right">
                    <p className="text-white/80 text-[11px]">Từ</p>
                    <p className="text-white font-bold text-[20px]">{f.price}</p>
                    <p className="text-white/70 text-[11px]">{f.time}</p>
                    <p className="text-white/70 text-[11px]">{f.type}</p>
                  </div>
                  <button className="w-full mt-3 py-2.5 text-white font-semibold text-[13px] rounded-lg" style={{ backgroundColor: '#008080' }}>
                    Mua ngay
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Next button */}
          {flightPage < totalPages - 1 && (
            <button onClick={() => setFlightPage(p => p + 1)} className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-vna-gray-text hover:text-[#006885]">
              <ChevronRight size={20} />
            </button>
          )}
          {flightPage > 0 && (
            <button onClick={() => setFlightPage(p => p - 1)} className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-vna-gray-text hover:text-[#006885]">
              <ChevronLeft size={20} />
            </button>
          )}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setFlightPage(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === flightPage ? 'bg-[#006885]' : 'bg-gray-300'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
