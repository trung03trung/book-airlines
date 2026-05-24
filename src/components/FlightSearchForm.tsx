import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('book')
  const [trip, setTrip] = useState<Trip>('roundtrip')
  const [from, setFrom] = useState('HAN')
  const [fromCity, setFromCity] = useState('Hà Nội, Việt Nam')
  const [to, setTo] = useState('')
  const [toCity, setToCity] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [showToDropdown, setShowToDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [toSearchQuery, setToSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const toDropdownRef = useRef<HTMLDivElement>(null)

  const [formActive, setFormActive] = useState(false)
  const [showDateDropdown, setShowDateDropdown] = useState(false)
  const [selectedDate, setSelectedDate] = useState('CN - 24/05/2026')
  const dateRef = useRef<HTMLDivElement>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [departDate, setDepartDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [calMonth1, setCalMonth1] = useState(4) // May (0-indexed)
  const [calYear1, setCalYear1] = useState(2026)
  const datePickerRef = useRef<HTMLDivElement>(null)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [showPassengers, setShowPassengers] = useState(false)
  const passengersRef = useRef<HTMLDivElement>(null)
  const [showScheduleDropdown, setShowScheduleDropdown] = useState(false)
  const [scheduleFrom, setScheduleFrom] = useState('HAN')
  const [scheduleFromCity] = useState('Hà Nội, Việt Nam')
  const [scheduleTo, setScheduleTo] = useState('')
  const [scheduleSearchQuery, setScheduleSearchQuery] = useState('')
  const [scheduleTrip, setScheduleTrip] = useState<'roundtrip'|'oneway'>('roundtrip')
  const scheduleDropdownRef = useRef<HTMLDivElement>(null)

  const dateOptions = [
    'Th 6 - 22/05/2026',
    'Th 7 - 23/05/2026',
    'CN - 24/05/2026',
    'Th 2 - 25/05/2026',
    'Th 3 - 26/05/2026',
  ]

  const filteredAirports = airports.filter(a =>
    a.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
      if (toDropdownRef.current && !toDropdownRef.current.contains(e.target as Node)) {
        setShowToDropdown(false)
      }
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) {
        setShowDateDropdown(false)
      }
      if (scheduleDropdownRef.current && !scheduleDropdownRef.current.contains(e.target as Node)) {
        setShowScheduleDropdown(false)
      }
      if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
        setShowDatePicker(false)
      }
      if (passengersRef.current && !passengersRef.current.contains(e.target as Node)) {
        setShowPassengers(false)
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
    <section className="relative -mt-[480px] z-20">
      {/* Backdrop blur when form is active */}
      {formActive && (
        <div className="fixed inset-0 z-30 bg-black/15 backdrop-blur-[1px]" onClick={() => { setFormActive(false); setShowDropdown(false) }} />
      )}

      <div className={`relative ${formActive ? 'z-40' : ''}`} style={{ marginLeft: '3rem', marginRight: '2.5rem' }}>
        <div className="bg-white shadow-xl rounded-2xl" style={{ overflow: 'visible' }}>
          {/* Tabs */}
          <div className="flex border-b border-vna-border">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setFormActive(true) }}
                className={`flex-1 py-5 text-[14px] font-medium transition-colors text-center ${
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
              <>
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
                  onClick={() => { const tmp = from; const tmpCity = fromCity; setFrom(to); setFromCity(toCity); setTo(tmp); setToCity(tmpCity) }}
                  className="w-10 h-10 border-2 border-vna-border text-vna-gray-text hover:text-vna-teal flex items-center justify-center transition-colors"
                  style={{ borderColor: '#E5E5E5' }}
                  aria-label="Đổi"
                >
                  <ArrowRightLeft size={16} />
                </button>

                {/* To */}
                <div className="flex-1 border-b border-vna-border pb-4 relative" ref={toDropdownRef}>
                  <div className="flex items-center gap-2 text-vna-gray-light text-[13px] mb-2">
                    <Plane size={14} style={{ color: '#008080', transform: 'rotate(90deg)' }} />
                    Đến
                  </div>
                  <button
                    onClick={() => { setShowToDropdown(!showToDropdown); setFormActive(true) }}
                    className="flex items-baseline gap-3 w-full text-left"
                  >
                    <span className="text-[48px] font-bold leading-none" style={{ color: to ? '#1A2B4A' : '#008080' }}>{to || 'Chọn điểm đến'}</span>
                    {toCity && <span className="text-[12px] border px-2 py-0.5 rounded-full" style={{ color: '#008080', borderColor: '#008080' }}>{toCity}</span>}
                  </button>

                  {showToDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-[380px] bg-white shadow-2xl border border-vna-border z-50 rounded-xl overflow-hidden">
                      {/* Trip type */}
                      <div className="flex gap-2 p-3 bg-vna-gray-bg">
                        {([['roundtrip','Khứ hồi'],['oneway','Một chiều'],['multi','Nhiều chặng']] as [Trip,string][]).map(([k,l]) => (
                          <button
                            key={k}
                            onClick={() => setTrip(k)}
                            className={`px-5 py-2 text-[13px] font-medium rounded-full transition-colors ${trip === k ? 'text-white shadow' : 'text-vna-gray-text hover:bg-white'}`}
                            style={trip === k ? { backgroundColor: '#C8860A' } : {}}
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
                            value={toSearchQuery}
                            onChange={e => setToSearchQuery(e.target.value)}
                            className="flex-1 text-[13px] outline-none bg-transparent"
                            autoFocus
                          />
                        </div>
                      </div>

                      {/* Airport list */}
                      <div className="max-h-[280px] overflow-y-auto">
                        {airports.filter(a => a.city.toLowerCase().includes(toSearchQuery.toLowerCase()) || a.code.toLowerCase().includes(toSearchQuery.toLowerCase())).map((a, i) => (
                          <button
                            key={i}
                            onClick={() => { setTo(a.code); setToCity(`${a.city}, ${a.country}`); setShowToDropdown(false); setToSearchQuery(''); setShowDatePicker(true) }}
                            className={`w-full flex items-center justify-between px-4 py-3 hover:bg-vna-gray-bg transition-colors border-b border-vna-border/30 last:border-0`}
                          >
                            <div className="text-left">
                              <p className="text-[14px] font-semibold" style={{ color: '#1A2B4A' }}>{a.city}</p>
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
              </div>

              {/* Date & Passengers row - shows when both from and to are selected */}
              {from && to && (
                <div className="mt-6 flex items-start gap-8">
                  {/* Date picker */}
                  <div className="flex-1 border-b border-vna-border pb-4 relative" ref={datePickerRef}>
                    <div
                      className="flex items-center gap-2 text-vna-gray-light text-[13px] mb-2 cursor-pointer"
                      onClick={() => setShowDatePicker(!showDatePicker)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#008080" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                      {trip === 'oneway' ? 'Ngày đi' : 'Ngày đi - Ngày về'}
                    </div>
                    <button
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      className="text-[24px] font-bold"
                      style={{ color: departDate ? '#1A2B4A' : '#9ca3af' }}
                    >
                      {departDate && returnDate && trip !== 'oneway'
                        ? `${departDate} - ${returnDate}`
                        : departDate
                          ? trip === 'oneway' ? departDate : `${departDate} - DD/MM/YYYY`
                          : trip === 'oneway' ? 'DD/MM/YYYY' : 'DD/MM/YYYY - DD/MM/YYYY'}
                    </button>

                  {showDatePicker && (
                    <div className="absolute top-full left-0 mt-2 bg-white shadow-2xl border border-gray-200 z-50 rounded-xl p-4 w-[620px]">
                      {/* Month navigation */}
                      <div className="flex items-center justify-between mb-4">
                        <button onClick={() => { if (calMonth1 === 0) { setCalMonth1(11); setCalYear1(calYear1 - 1) } else setCalMonth1(calMonth1 - 1) }} className="p-1 hover:bg-gray-100 rounded">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                        </button>
                        <div className="flex gap-8">
                          <span className="font-medium text-[14px]">Tháng {calMonth1 + 1} — {calYear1}</span>
                          <span className="font-medium text-[14px]">Tháng {(calMonth1 + 1) % 12 + 1} — {calMonth1 === 11 ? calYear1 + 1 : calYear1}</span>
                        </div>
                        <button onClick={() => { if (calMonth1 === 11) { setCalMonth1(0); setCalYear1(calYear1 + 1) } else setCalMonth1(calMonth1 + 1) }} className="p-1 hover:bg-gray-100 rounded">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                        </button>
                      </div>

                      {/* Calendars */}
                      <div className="flex gap-4">
                        {[0, 1].map(offset => {
                          const m = (calMonth1 + offset) % 12
                          const y = calMonth1 + offset > 11 ? calYear1 + 1 : calYear1
                          const firstDay = new Date(y, m, 1).getDay()
                          const daysInMonth = new Date(y, m + 1, 0).getDate()
                          const days: (number | null)[] = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))

                          return (
                            <div key={offset} className="flex-1">
                              <div className="grid grid-cols-7 text-center text-[11px] text-gray-500 mb-2">
                                {['CN', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7'].map(d => <span key={d}>{d}</span>)}
                              </div>
                              <div className="grid grid-cols-7 text-center gap-y-1">
                                {days.map((day, i) => {
                                  if (!day) return <span key={i} />
                                  const dateStr = `${String(day).padStart(2, '0')}/${String(m + 1).padStart(2, '0')}/${y}`
                                  const isDepart = departDate === dateStr
                                  const isReturn = returnDate === dateStr
                                  const today = new Date()
                                  const cellDate = new Date(y, m, day)
                                  const isPast = cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())

                                  return (
                                    <button
                                      key={i}
                                      disabled={isPast}
                                      onClick={() => {
                                        if (trip === 'oneway') {
                                          setDepartDate(dateStr)
                                          setShowDatePicker(false)
                                        } else {
                                          if (!departDate || (departDate && returnDate)) {
                                            setDepartDate(dateStr)
                                            setReturnDate('')
                                          } else {
                                            // Ensure return > depart
                                            const [dd, dm, dy] = departDate.split('/').map(Number)
                                            const depDate = new Date(dy, dm - 1, dd)
                                            if (cellDate > depDate) {
                                              setReturnDate(dateStr)
                                              setShowDatePicker(false)
                                            } else {
                                              setDepartDate(dateStr)
                                              setReturnDate('')
                                            }
                                          }
                                        }
                                      }}
                                      className={`py-2 text-[13px] rounded transition-colors ${
                                        isPast ? 'text-gray-300 cursor-not-allowed' :
                                        isDepart || isReturn ? 'bg-teal-700 text-white font-bold' :
                                        'hover:bg-gray-100'
                                      }`}
                                    >
                                      {day}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Footer */}
                      <div className="mt-4 pt-3 border-t border-gray-200 text-[11px] text-gray-500">
                        Giá vé khứ hồi tính bằng VND cho 1 người lớn cho chuyến đi
                      </div>
                    </div>
                  )}
                  </div>

                  {/* Passenger selector */}
                  {(departDate && (trip === 'oneway' || returnDate)) && (
                    <div className="flex-1 border-b border-vna-border pb-4 relative" ref={passengersRef}>
                      <div className="flex items-center gap-2 text-vna-gray-light text-[13px] mb-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#008080" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg>
                        Hành khách
                      </div>
                      <button
                        onClick={() => setShowPassengers(!showPassengers)}
                        className="text-[24px] font-bold"
                        style={{ color: '#1A2B4A' }}
                      >
                        {String(adults + children + infants).padStart(2, '0')} Hành khách
                      </button>

                      {showPassengers && (
                        <div className="absolute top-full left-0 mt-2 bg-white shadow-2xl border border-gray-200 z-50 rounded-xl p-5 w-[300px]">
                          <p className="font-semibold text-[15px] text-gray-900 mb-4">Hành khách</p>

                          {/* Adults */}
                          <div className="flex items-center justify-between mb-4">
                            <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-teal-600">−</button>
                            <div className="text-center">
                              <p className="text-[14px] font-medium">{adults} Người lớn</p>
                              <p className="text-[12px] text-gray-400">Từ 12 tuổi</p>
                            </div>
                            <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 rounded-full border border-teal-600 flex items-center justify-center text-teal-600 hover:bg-teal-50">+</button>
                          </div>

                          {/* Children */}
                          <div className="flex items-center justify-between mb-4">
                            <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-teal-600">−</button>
                            <div className="text-center">
                              <p className="text-[14px] font-medium">{children} Trẻ em</p>
                              <p className="text-[12px] text-gray-400">2-12 tuổi</p>
                            </div>
                            <button onClick={() => setChildren(children + 1)} className="w-8 h-8 rounded-full border border-teal-600 flex items-center justify-center text-teal-600 hover:bg-teal-50">+</button>
                          </div>

                          {/* Infants */}
                          <div className="flex items-center justify-between mb-4">
                            <button onClick={() => setInfants(Math.max(0, infants - 1))} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-teal-600">−</button>
                            <div className="text-center">
                              <p className="text-[14px] font-medium">{infants} Trẻ em</p>
                              <p className="text-[12px] text-gray-400">Dưới 2 tuổi</p>
                            </div>
                            <button onClick={() => setInfants(infants + 1)} className="w-8 h-8 rounded-full border border-teal-600 flex items-center justify-center text-teal-600 hover:bg-teal-50">+</button>
                          </div>

                          <button
                            onClick={() => setShowPassengers(false)}
                            className="w-full text-white font-medium py-2 rounded text-[14px] mt-2"
                            style={{ backgroundColor: '#006885' }}
                          >
                            Chọn
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              {/* Action buttons */}
              {from && to && (
                <div className="flex items-center justify-end gap-4 mt-6">
                  <button className="flex items-center gap-2 text-[13px] text-gray-700 hover:text-teal-700 transition-colors">
                    <span>🎫</span> Mã khuyến mại
                  </button>
                  <button
                    onClick={() => navigate(`/flights?from=${from}&to=${to}&fromCity=${encodeURIComponent(fromCity)}&toCity=${encodeURIComponent(toCity)}&date=${departDate}&passengers=${adults + children + infants}`)}
                    className="text-white font-semibold px-6 py-3 text-[14px] rounded-lg transition-colors" style={{ backgroundColor: '#006885' }}
                  >
                    Tìm chuyến bay
                  </button>
                </div>
              )}
              </>
            )}

            {tab === 'manage' && (
              <div>
                <div className="flex items-center gap-4">
                  {/* Mã đặt chỗ */}
                  <div className="flex-1 border-b border-vna-border pb-4">
                    <div className="flex items-center gap-2 text-vna-gray-light text-[13px] mb-2">
                      <Plane size={14} style={{ color: '#008080' }} />
                      Mã đặt chỗ/số vé điện tử
                    </div>
                    <input type="text" placeholder="Nhập mã đặt chỗ/số vé điện tử" className="text-[24px] font-medium leading-none w-full outline-none bg-transparent text-vna-gray-light placeholder:text-vna-gray-light/50" />
                  </div>

                  {/* Họ */}
                  <div className="flex-1 border-b border-vna-border pb-4">
                    <div className="flex items-center gap-2 text-vna-gray-light text-[13px] mb-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#008080" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg>
                      Họ
                    </div>
                    <input type="text" placeholder="Nhập họ" className="text-[24px] font-medium leading-none w-full outline-none bg-transparent text-vna-gray-light placeholder:text-vna-gray-light/50" />
                  </div>

                  {/* Nút tìm kiếm */}
                  <button className="text-white font-semibold px-6 py-3 text-[14px] rounded-lg transition-colors whitespace-nowrap" style={{ backgroundColor: '#006885' }}>Tìm kiếm</button>
                </div>

                {/* Quick links */}
                <div className="flex justify-between mt-6 pt-4 border-t border-vna-border">
                  <a href="#" className="flex items-center gap-2 text-[13px] font-medium text-vna-navy hover:text-[#006885]">
                    <span className="text-[18px]">💰</span> Giữ giá tốt
                  </a>
                  <a href="#" className="flex items-center gap-2 text-[13px] font-medium text-vna-navy hover:text-[#006885]">
                    <span className="text-[18px]">💺</span> Chọn chỗ ngồi
                  </a>
                  <a href="#" className="flex items-center gap-2 text-[13px] font-medium text-vna-navy hover:text-[#006885]">
                    <span className="text-[18px]">👥</span> Thêm dịch vụ bổ trợ
                  </a>
                  <a href="#" className="flex items-center gap-2 text-[13px] font-medium text-vna-navy hover:text-[#006885]">
                    <span className="text-[18px]">🧳</span> Thông tin hành lý
                  </a>
                  <a href="#" className="flex items-center gap-2 text-[13px] font-medium text-vna-navy hover:text-[#006885]">
                    <span className="text-[18px]">✈️</span> Thay đổi chuyến bay
                  </a>
                </div>
              </div>
            )}

            {tab === 'checkin' && (
              <div>
                {/* Radio options */}
                <div className="flex items-center gap-6 mb-4">
                  <label className="flex items-center gap-2 text-[13px] text-vna-navy font-medium cursor-pointer">
                    <input type="radio" name="checkin_type" defaultChecked className="accent-[#006885]" /> Mã đặt chỗ (PNR)
                  </label>
                  <label className="flex items-center gap-2 text-[13px] text-vna-gray-text cursor-pointer">
                    <input type="radio" name="checkin_type" className="accent-[#006885]" /> Số vé điện tử
                  </label>
                  <label className="flex items-center gap-2 text-[13px] text-vna-gray-text cursor-pointer">
                    <input type="radio" name="checkin_type" className="accent-[#006885]" /> Số thẻ FFP
                  </label>
                </div>

                {/* Inputs */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 border-b border-vna-border pb-4">
                    <div className="flex items-center gap-2 text-vna-gray-light text-[13px] mb-2">
                      <Plane size={14} style={{ color: '#008080' }} />
                      Mã đặt chỗ (PNR)
                    </div>
                    <input type="text" placeholder="Nhập mã đặt chỗ" className="text-[24px] font-medium leading-none w-full outline-none bg-transparent text-vna-gray-light placeholder:text-vna-gray-light/50" />
                  </div>

                  <div className="flex-1 border-b border-vna-border pb-4">
                    <div className="flex items-center gap-2 text-vna-gray-light text-[13px] mb-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#008080" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg>
                      Họ
                    </div>
                    <input type="text" placeholder="Nhập họ" className="text-[24px] font-medium leading-none w-full outline-none bg-transparent text-vna-gray-light placeholder:text-vna-gray-light/50" />
                  </div>

                  <button className="font-semibold px-6 py-3 text-[14px] rounded-lg transition-colors whitespace-nowrap border-2 border-[#006885] text-[#006885] hover:bg-[#006885] hover:text-white">Làm thủ tục</button>
                </div>

                {/* Note */}
                <p className="text-[12px] text-vna-gray-text mt-4">Quý khách có thể làm thủ tục trực tuyến từ <span className="text-[#006885] underline">24 đến 01 tiếng</span> trước chuyến bay.</p>
              </div>
            )}

            {tab === 'status' && (
              <div>
                {/* Radio options */}
                <div className="flex items-center gap-6 mb-4">
                  <label className="flex items-center gap-2 text-[13px] text-vna-navy font-medium cursor-pointer">
                    <input type="radio" name="status_type" defaultChecked className="accent-[#006885]" /> Số hiệu chuyến bay
                  </label>
                  <label className="flex items-center gap-2 text-[13px] text-vna-gray-text cursor-pointer">
                    <input type="radio" name="status_type" className="accent-[#006885]" /> Đường bay
                  </label>
                </div>

                {/* Inputs */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 border-b border-vna-border pb-4">
                    <div className="flex items-center gap-2 text-vna-gray-light text-[13px] mb-2">
                      <Plane size={14} style={{ color: '#008080' }} />
                      Số hiệu chuyến bay
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[24px] font-bold" style={{ color: '#1A2B4A' }}>VN</span>
                      <input type="text" placeholder="1234" className="text-[24px] font-medium leading-none w-full outline-none bg-transparent text-[#008080] placeholder:text-[#008080]/50" />
                    </div>
                  </div>

                  <div className="flex-1 border-b border-vna-border pb-4">
                    <div className="flex items-center gap-2 text-vna-gray-light text-[13px] mb-2">
                      <Plane size={14} style={{ color: '#008080', transform: 'rotate(90deg)' }} />
                      Từ (không bắt buộc)
                    </div>
                    <input type="text" placeholder="Chọn điểm đi" className="text-[24px] font-medium leading-none w-full outline-none bg-transparent text-vna-gray-light placeholder:text-vna-gray-light/50" />
                  </div>

                  <div className="flex-1 border-b border-vna-border pb-4 relative" ref={dateRef}>
                    <div className="flex items-center gap-2 text-vna-gray-light text-[13px] mb-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#008080" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                      Ngày bay
                    </div>
                    <button onClick={() => setShowDateDropdown(!showDateDropdown)} className="text-[24px] font-bold text-left w-full" style={{ color: '#1A2B4A' }}>{selectedDate}</button>

                    {showDateDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-[260px] bg-white shadow-2xl border border-vna-border z-50 rounded-xl overflow-hidden">
                        {dateOptions.map((d, i) => (
                          <button
                            key={i}
                            onClick={() => { setSelectedDate(d); setShowDateDropdown(false) }}
                            className={`w-full text-left px-4 py-3 text-[14px] transition-colors ${d === selectedDate ? 'bg-[#e6f7f7] text-[#006885] font-semibold border-l-[3px] border-[#006885]' : 'text-vna-navy hover:bg-gray-50'}`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button className="font-semibold px-6 py-3 text-[14px] rounded-lg transition-colors whitespace-nowrap border-2 border-[#006885] text-[#006885] hover:bg-[#006885] hover:text-white">Tìm chuyến bay</button>
                </div>

                {/* Note */}
                <p className="text-[12px] text-vna-gray-text mt-4">*Thông tin trạng thái chuyến bay sẽ chỉ có sẵn trong vòng 48 giờ trước khi chuyến bay cất cánh hoặc hạ cánh.</p>
              </div>
            )}

            {tab === 'schedule' && (
              <div className="flex items-center gap-4">
                {/* From */}
                <div className="flex-1 border-b border-vna-border pb-4">
                  <div className="flex items-center gap-2 text-vna-gray-light text-[13px] mb-2">
                    <Plane size={14} style={{ color: '#008080' }} />
                    Từ
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[48px] font-bold leading-none" style={{ color: '#1A2B4A' }}>{scheduleFrom || '---'}</span>
                    {scheduleFromCity && <span className="text-[12px] border px-2 py-0.5 rounded-full" style={{ color: '#008080', borderColor: '#008080' }}>{scheduleFromCity}</span>}
                  </div>
                </div>

                {/* Swap */}
                <button
                  onClick={() => { const tmp = scheduleFrom; setScheduleFrom(scheduleTo); setScheduleTo(tmp) }}
                  className="w-10 h-10 border-2 border-vna-border text-vna-gray-text hover:text-vna-teal flex items-center justify-center transition-colors"
                  aria-label="Đổi"
                >
                  <ArrowRightLeft size={16} />
                </button>

                {/* To */}
                <div className="flex-1 border-b border-vna-border pb-4 relative" ref={scheduleDropdownRef}>
                  <div className="flex items-center gap-2 text-vna-gray-light text-[13px] mb-2">
                    <Plane size={14} style={{ color: '#008080', transform: 'rotate(90deg)' }} />
                    Đến
                  </div>
                  <button
                    onClick={() => { setShowScheduleDropdown(!showScheduleDropdown); setFormActive(true) }}
                    className="text-[24px] font-medium leading-none w-full text-left"
                    style={{ color: scheduleTo ? '#1A2B4A' : '#008080' }}
                  >
                    {scheduleTo || 'Chọn điểm đến'}
                  </button>

                  {showScheduleDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-[380px] bg-white shadow-2xl border border-vna-border z-50 rounded-xl overflow-hidden">
                      {/* Trip type */}
                      <div className="flex gap-2 p-3 bg-vna-gray-bg">
                        {([['roundtrip','Khứ hồi'],['oneway','Một chiều']] as ['roundtrip'|'oneway',string][]).map(([k,l]) => (
                          <button
                            key={k}
                            onClick={() => setScheduleTrip(k)}
                            className={`px-5 py-2 text-[13px] font-medium rounded-full transition-colors ${scheduleTrip === k ? 'text-white shadow' : 'text-vna-gray-text hover:bg-white'}`}
                            style={scheduleTrip === k ? { backgroundColor: '#C8860A' } : {}}
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
                            value={scheduleSearchQuery}
                            onChange={e => setScheduleSearchQuery(e.target.value)}
                            className="flex-1 text-[13px] outline-none bg-transparent"
                            autoFocus
                          />
                        </div>
                      </div>

                      {/* Airport list */}
                      <div className="max-h-[280px] overflow-y-auto">
                        {airports.filter(a => a.city.toLowerCase().includes(scheduleSearchQuery.toLowerCase()) || a.code.toLowerCase().includes(scheduleSearchQuery.toLowerCase())).map((a, i) => (
                          <button
                            key={i}
                            onClick={() => { setScheduleTo(a.code); setShowScheduleDropdown(false); setScheduleSearchQuery('') }}
                            className={`w-full flex items-center justify-between px-4 py-3 hover:bg-vna-gray-bg transition-colors border-b border-vna-border/30 last:border-0`}
                          >
                            <div className="text-left">
                              <p className="text-[14px] font-semibold" style={{ color: '#1A2B4A' }}>{a.city}</p>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
