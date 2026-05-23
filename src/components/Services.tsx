import { useState } from 'react'
import { Luggage, ArrowUpCircle, ShoppingBag, Building2, Shield, MoreHorizontal } from 'lucide-react'

const categories = [
  { icon: Luggage, label: 'HÀNH LÝ TRẢ TRƯỚC', items: [{ t: 'MUA HÀNH LÝ TRẢ TRƯỚC', d: 'Tiết kiệm đến 40% so với mua tại sân bay' }, { t: 'TRA CỨU TIÊU CHUẨN HÀNH LÝ', d: 'Kiểm tra hành lý miễn cước của bạn' }] },
  { icon: ArrowUpCircle, label: 'NÂNG HẠNG GHẾ', items: [{ t: 'CHỌN CHỖ NGỒI', d: 'Chọn trước vị trí ghế yêu thích' }, { t: 'NÂNG HẠNG', d: 'Trải nghiệm dịch vụ cao cấp hơn' }, { t: 'SKY-SOFA', d: 'Không gian riêng tư cho gia đình' }] },
  { icon: ShoppingBag, label: 'MUA SẮM', items: [{ t: 'GIFT VOUCHER', d: 'Quà tặng bay cho người thân' }, { t: 'LOTUSMALL', d: 'Mua sắm đổi dặm thưởng' }, { t: 'SUẤT ĂN', d: 'Đặt trước bữa ăn trên chuyến bay' }, { t: 'FLY-CARD', d: 'Thẻ bay tiện lợi' }] },
  { icon: Building2, label: 'KHÁCH SẠN & TOUR', items: [{ t: 'KHÁCH SẠN', d: 'Đặt phòng khách sạn giá tốt' }] },
  { icon: Shield, label: 'BẢO HIỂM', items: [{ t: 'BẢO HIỂM DU LỊCH TRIPCARE', d: 'An tâm trên mọi hành trình' }] },
  { icon: MoreHorizontal, label: 'CÁC DỊCH VỤ KHÁC', items: [{ t: 'ĐẶT DỊCH VỤ ĐẶC BIỆT TRỰC TUYẾN', d: 'Dịch vụ hỗ trợ đặc biệt' }, { t: 'GÓI CƯỚC VIETTEL', d: 'Gói cước quốc tế khi bay' }, { t: 'PHÒNG KHÁCH THƯƠNG GIA', d: 'Thư giãn trước chuyến bay' }] },
]

export default function Services() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-10 md:py-12 bg-vna-gray-bg">
      <div className="vna-container">
        <h2 className="text-[22px] font-bold text-vna-navy mb-6">Trọn vẹn trải nghiệm</h2>

        {/* Tabs */}
        <div className="flex overflow-x-auto mb-6 border-b border-vna-border">
          {categories.map((cat, i) => (
            <button key={i} onClick={() => setActive(i)} className={`flex flex-col items-center gap-2 min-w-[110px] px-3 py-4 text-center transition-all border-b-[3px] ${active === i ? 'border-vna-teal bg-white text-vna-teal' : 'border-transparent text-vna-gray-light hover:text-vna-teal'}`}>
              <cat.icon size={20} />
              <span className="text-[10px] font-semibold leading-tight">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories[active].items.map((item, i) => (
            <a key={i} href="#" className="bg-white p-5 border border-vna-border hover:border-vna-teal/40 hover:shadow-md transition-all group">
              <h4 className="text-[12px] font-bold text-vna-navy group-hover:text-vna-teal transition-colors mb-1">{item.t}</h4>
              <p className="text-[12px] text-vna-gray-light">{item.d}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
