import { useState, useRef, useEffect } from 'react'
import { ArrowRightLeft, Plane, Search } from 'lucide-react'

type Tab = 'book' | 'manage' | 'checkin' | 'status' | 'schedule'
type Trip = 'roundtrip' | 'oneway' | 'multi'

const airports = [
  { city: 'Hà Nội', country: 'Việt Nam', code: 'HAN', full: 'Hà Nội (HAN)' },
  { city: 'Tp. Hồ Chí Minh', country: 'Việt Nam', code: 'SGN', full: 'Tp. Hồ Chí Minh (SGN)' },
  { city: 'Đà Nẵng', country: 'Việt Nam', code: 'DAD', full: 'Đà Nẵng (DAD)' },
  { city: 'Phú Quốc', country: 'Việt Nam', code: 'PQC', full: 'Phú Quốc (PQC)' },
  { city: 'Nha Trang', country: 'Việt Nam', code: 'CXR', full: 'Nha Trang (CXR)' },
  { city: 'Huế', country: 'Việt Nam', code: 'HUI', full: 'Huế (HUI)' },
]

export default function FlightSearchForm() {
  const [tab, setTab] = useState<Tab>('book')
  const [trip, setTrip] = useState<Trip>('roundtrip')
  const [from, setFrom] = useState('HAN')
  const [fromCity, setFromCity] = useState('Hà Nội, Việt Nam')
  const [to, setTo] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [formActive, setFormActive] = useState(false)

  const filteredAirports = airports.filter(a =>
    a.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const tabs: { key: Tab; label: string }[] = [
    { key: 'book', label: 'Mua vé' },
    { key: 'manage', label: 'Quản lý đặt chỗ' },
    { key: 'checkin', label: 'Làm thủ tục' },
    { key: 'status', label: 'Trạng thái chuyến bay' },
    { key: 'schedule', label: 'Tra cứu lịch bay' },
  ]

  return (
    <section className="relative -mt-12 z-20">
      {/* Backdrop blur when form is active */}
      {formActive && (
        <div className="fixed inset-0 z-30 bg-black/15 backdrop-blur-[1px]" onClick={() => { setFormActive(false); setShowDropdown(false) }} />
      )}

      <div className={`vna-container relative ${formActive ? 'z-40' : ''}`}>
        <div className="bg-white shadow-xl rounded-2xl" style={{ overflow: 'visible' }}>
          {/* Tabs */}
          <div className="flex border-b border-vna-border">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setFormActive(true) }}
                className={`flex-1 py-4 text-[14px] font-medium transition-colors text-center ${
                  tab === t.key
                    ? 'text-vna-teal border-b-[3px] border-vna-teal'
                    : 'text-vna-gray-text hover:text-vna-teal'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {tab === 'book' && (
              <div className="flex items-center gap-4">
                {/* From */}
                <div className="flex-1 border-b border-vna-border pb-4 relative" ref={dropdownRef}>
                  <div className="flex items-center gap-2 text-vna-gray-light text-[13px] mb-2">
                    <Plane size={14} style={{ color: '#008080' }} />
                    Từ
                  </div>
                  <button
                    onClick={() => { setShowDropdown(!showDropdown); setFormActive(true) }}
                    className="flex items-baseline gap-3 w-full text-left"
                  >
                    <span className="text-[48px] font-bold leading-none" style={{ color: '#1A2B4A' }}>{from || '---'}</span>
                    {fromCity && <span className="text-[12px] border px-2 py-0.5 rounded-full" style={{ color: '#008080', borderColor: '#008080' }}>{fromCity}</span>}
                  </button>

                  {/* Dropdown - inline below */}
                  {showDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-[380px] bg-white shadow-2xl border border-vna-border z-50 rounded-xl overflow-hidden">
                      {/* Trip type */}
                      <div className="flex gap-2 p-3 bg-vna-gray-bg">
                        {([['roundtrip','Khứ hồi'],['oneway','Một chiều'],['multi','Nhiều chặng']] as [Trip,string][]).map(([k,l]) => (
                          <button
                            key={k}
                            onClick={() => setTrip(k)}
                            className={`px-5 py-2 text-[13px] font-medium rounded-full transition-colors ${trip === k ? 'text-white shadow' : 'text-vna-gray-text hover:bg-white'}`}
                            style={trip === k ? { backgroundColor: '#008080' } : {}}
                          >
                            {l}
                          </button>
                        ))}
                      </div>

                      {/* Search */}
                      <div className="px-4 py-3 border-b border-vna-border">
                        <div className="flex items-center gap-2 border border-vna-border px-3 py-2 rounded-lg">
                          <Search size={14} className="text-vna-gray-light" />
                          <input
                            type="text"
                            placeholder="Tìm kiếm"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="flex-1 text-[13px] outline-none bg-transparent"
                            autoFocus
                          />
                        </div>
                      </div>

                      {/* Airport list */}
                      <div className="max-h-[280px] overflow-y-auto">
                        {filteredAirports.map((a, i) => (
                          <button
                            key={i}
                            onClick={() => { setFrom(a.code); setFromCity(`${a.city}, ${a.country}`); setShowDropdown(false); setSearchQuery('') }}
                            className={`w-full flex items-center justify-between px-4 py-3 hover:bg-vna-gray-bg transition-colors border-b border-vna-border/30 last:border-0 ${a.code === from ? 'bg-vna-gray-bg' : ''}`}
                          >
                            <div className="text-left">
                              <p className="text-[14px] font-semibold" style={{ color: a.code === from ? '#008080' : '#1A2B4A' }}>{a.city}</p>
                              <p className="text-[11px] text-vna-gray-light">{a.country}</p>
                            </div>
                            <div className="text-right flex items-center gap-3">
                              <span className="text-[11px] text-vna-gray-light">{a.full}</span>
                              <span className="text-[12px] font-bold text-white px-2 py-0.5 rounded" style={{ backgroundColor: '#008080' }}>{a.code}</span>
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* View all */}
                      <div className="px-4 py-3 border-t border-vna-border">
                        <button className="text-[12px] text-vna-gray-light flex items-center gap-1">
                          ◎ Xem tất cả khu vực
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Swap */}
                <button
                  onClick={() => { const tmp = from; setFrom(to); setTo(tmp) }}
                  className="w-10 h-10 border-2 border-vna-border text-vna-gray-text hover:text-vna-teal flex items-center justify-center transition-colors"
                  style={{ borderColor: '#E5E5E5' }}
                  aria-label="Đổi"
                >
                  <ArrowRightLeft size={16} />
                </button>

                {/* To */}
                <div className="flex-1 border-b border-vna-border pb-4">
                  <div className="flex items-center gap-2 text-vna-gray-light text-[13px] mb-2">
                    <Plane size={14} style={{ color: '#008080', transform: 'rotate(90deg)' }} />
                    Đến
                  </div>
                  <input
                    type="text"
                    value={to}
                    onChange={e => setTo(e.target.value)}
                    placeholder="Chọn điểm đến"
                    className="text-[48px] font-bold leading-none w-full outline-none bg-transparent"
                    style={{ color: '#1A2B4A' }}
                  />
                </div>
              </div>
            )}

            {tab === 'manage' && (
              <div className="space-y-4">
                <p className="text-[13px] text-vna-gray-text">Nhập mã đặt chỗ và họ tên để quản lý đặt chỗ</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input type="text" placeholder="Mã đặt chỗ (PNR)" className="px-4 py-3 border border-vna-border text-[13px] outline-none" />
                  <input type="text" placeholder="Họ hành khách" className="px-4 py-3 border border-vna-border text-[13px] outline-none" />
                  <button className="text-white font-semibold py-3 text-[13px] uppercase transition-colors" style={{ backgroundColor: '#008080' }}>TÌM KIẾM</button>
                </div>
              </div>
            )}

            {tab === 'checkin' && (
              <div className="space-y-4">
                <p className="text-[13px] text-vna-gray-text">Làm thủ tục trực tuyến từ 24 giờ đến 01 giờ trước giờ khởi hành</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input type="text" placeholder="Mã đặt chỗ hoặc số vé" className="px-4 py-3 border border-vna-border text-[13px] outline-none" />
                  <input type="text" placeholder="Họ hành khách" className="px-4 py-3 border border-vna-border text-[13px] outline-none" />
                  <button className="text-white font-semibold py-3 text-[13px] uppercase transition-colors" style={{ backgroundColor: '#008080' }}>LÀM THỦ TỤC</button>
                </div>
              </div>
            )}

            {tab === 'status' && (
              <div className="space-y-4">
                <p className="text-[13px] text-vna-gray-text">Tra cứu trạng thái chuyến bay</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input type="text" placeholder="Số hiệu chuyến bay (VD: VN123)" className="px-4 py-3 border border-vna-border text-[13px] outline-none" />
                  <input type="date" className="px-4 py-3 border border-vna-border text-[13px] outline-none" />
                  <button className="text-white font-semibold py-3 text-[13px] uppercase transition-colors" style={{ backgroundColor: '#008080' }}>TRA CỨU</button>
                </div>
              </div>
            )}

            {tab === 'schedule' && (
              <div className="space-y-4">
                <p className="text-[13px] text-vna-gray-text">Tra cứu lịch bay</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input type="text" placeholder="Điểm đi" className="px-4 py-3 border border-vna-border text-[13px] outline-none" />
                  <input type="text" placeholder="Điểm đến" className="px-4 py-3 border border-vna-border text-[13px] outline-none" />
                  <input type="date" className="px-4 py-3 border border-vna-border text-[13px] outline-none" />
                  <button className="text-white font-semibold py-3 text-[13px] uppercase transition-colors" style={{ backgroundColor: '#008080' }}>TRA CỨU</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
