import { ChevronRight, ArrowRight } from 'lucide-react'

const menuItems = [
  { label: 'Làm thủ tục', active: true },
  { label: 'Hành lý', active: false },
  { label: 'Thông tin sân bay', active: false },
  { label: 'Chuẩn bị cho chuyến bay', active: false },
]

const cards = [
  { title: 'Làm thủ tục trực tuyến', img: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop' },
  { title: 'Làm thủ tục tại kiosk', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop' },
  { title: 'Làm thủ tục tại sân bay', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=400&h=300&fit=crop' },
]

const testimonials = [
  { icon: '✈️', text: 'Bắt đầu một dặm của bản thân và cố gắng thêm hằng ngày' },
  { icon: '🏠', text: 'Tuyệt quá ạ' },
  { icon: '🌿', text: 'Vietnam Airlines tuyệt vời trên các chuyến bay' },
]

export default function Promotions() {
  return (
    <section className="bg-white">
      <div style={{ marginLeft: '3rem', marginRight: '2.5rem' }}>
        {/* Note */}
        <p className="text-[12px] text-vna-gray-light py-4 border-t border-vna-border">
          *Giá vé hiển thị được thu thập trong vòng 48 giờ và có thể không còn hiệu lực tại thời điểm đặt chỗ. Chúng tôi có thể thu thêm phí và lệ phí cho một số sản phẩm và dịch vụ.
        </p>

        {/* Trọn vẹn trải nghiệm */}
        <h2 className="text-[36px] font-bold text-vna-navy mt-8 mb-6">
          Trọn vẹn <span className="text-[#C8860A]">trải nghiệm</span>
        </h2>

        {/* Actions row */}
        <div className="flex items-center justify-between mb-8">
          <a href="#" className="flex items-center gap-2 text-[14px] font-medium text-[#006885] hover:underline">
            Xem tất cả các dịch vụ <ArrowRight size={14} />
          </a>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-[13px] text-vna-navy border border-vna-border rounded-full px-5 py-2.5">
              Dịch vụ mặt đất <ChevronRight size={12} className="rotate-90" />
            </button>
            <button className="flex items-center gap-2 text-[13px] text-vna-navy font-semibold border-2 border-[#006885] rounded-full px-5 py-2.5">
              Thương Gia <ChevronRight size={12} className="rotate-90" />
            </button>
          </div>
        </div>

        {/* Thương Gia section */}
        <div className="rounded-2xl overflow-hidden border border-vna-border mb-16">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4" style={{ backgroundColor: '#6B7A2A' }}>
            <h3 className="text-white font-bold text-[16px]">Thương Gia</h3>
            <div className="flex items-center gap-2">
              <span className="text-[#C8860A] text-[18px]">✿</span>
              <span className="text-white font-semibold text-[14px]">Vietnam Airlines</span>
              <span className="text-[#C8860A] text-[18px]">✿</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex">
            {/* Sidebar */}
            <div className="w-[280px] border-r border-vna-border p-4">
              {menuItems.map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className={`flex items-center justify-between px-4 py-3 text-[13px] transition-colors rounded-lg ${item.active ? 'bg-vna-gray-bg text-[#006885] font-semibold' : 'text-vna-gray-text hover:bg-vna-gray-bg'}`}
                >
                  {item.label}
                  {item.active && <ArrowRight size={14} className="text-[#C8860A]" />}
                </a>
              ))}
            </div>

            {/* Cards */}
            <div className="flex-1 grid grid-cols-3 gap-4 p-4">
              {cards.map((card, i) => (
                <div key={i} className="group">
                  <div className="rounded-xl overflow-hidden h-[200px] mb-3">
                    <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-medium text-vna-navy">{card.title}</p>
                    <ArrowRight size={14} className="text-[#C8860A]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lan tỏa bản sắc Việt */}
        <div className="grid grid-cols-3 gap-8 pb-16">
          {/* Left - text */}
          <div className="flex flex-col justify-center">
            <h2 className="text-[36px] font-bold text-vna-navy leading-tight mb-2">Lan tỏa</h2>
            <h2 className="text-[36px] font-bold text-[#C8860A] leading-tight mb-4">bản sắc Việt</h2>
            <p className="text-[13px] text-vna-gray-text leading-relaxed mb-6">
              Mỗi hành trình, mỗi câu chuyện bạn kể có thể truyền cảm hứng cho hàng ngàn người yêu Việt Nam. Hãy tham gia chương trình bằng cách đăng nhập vào tài khoản Lotusmiles.
            </p>
            <a href="#" className="inline-block border border-[#006885] text-[#006885] text-[13px] font-medium px-5 py-2.5 rounded-full hover:bg-[#006885] hover:text-white transition-colors w-fit">
              Đăng ký hội viên
            </a>
          </div>

          {/* Center - phone with video */}
          <div className="flex items-center justify-center">
            <div className="relative w-[420px] h-[780px] rounded-[40px] border-[8px] border-gray-800 bg-black overflow-hidden shadow-2xl">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[24px] bg-gray-800 rounded-b-2xl z-10" />
              {/* Video */}
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=700&fit=crop"
              >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Right - testimonials + stats */}
          <div className="flex flex-col justify-between">
            {/* Testimonials */}
            <div className="space-y-2">
              {testimonials.map((t, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <span className="text-[18px]">{t.icon}</span>
                  <p className="text-[13px] text-vna-gray-text">{t.text}</p>
                </div>
              ))}
            </div>

            {/* Up/Down arrows */}
            <div className="flex flex-col items-start gap-1 my-4">
              <button className="w-8 h-8 border border-vna-border rounded-full flex items-center justify-center text-vna-gray-light hover:text-[#006885]">
                <ChevronRight size={16} className="-rotate-90" />
              </button>
              <button className="w-8 h-8 border border-vna-border rounded-full flex items-center justify-center text-vna-gray-light hover:text-[#006885]">
                <ChevronRight size={16} className="rotate-90" />
              </button>
            </div>

            {/* Stats */}
            <div>
              <p className="text-[36px] font-bold text-[#006885]">5m+</p>
              <p className="text-[13px] text-vna-gray-text mb-4">Hơn 5.000.000 người được truyền cảm hứng</p>
              <p className="text-[36px] font-bold text-[#006885]">2100+</p>
              <p className="text-[13px] text-vna-gray-text mb-4">Hình ảnh và video gắn tag</p>
              <p className="text-[14px] font-medium text-[#006885]">#vandamnangniu</p>
            </div>
          </div>
        </div>
        {/* Banner quảng cáo thân máy bay */}
        <div className="relative rounded-2xl overflow-hidden mb-16" style={{ backgroundColor: '#005F6B' }}>
          <div className="flex items-center">
            <div className="p-10 flex-1">
              <h2 className="text-[36px] font-bold italic text-[#C8860A] leading-tight">Quảng cáo</h2>
              <h2 className="text-[36px] font-bold italic text-white leading-tight mb-4">thân máy bay</h2>
              <p className="text-[14px] text-white/80 mb-6">Hiện diện giữa bầu trời – nổi bật giữa muôn thương hiệu.</p>
              <a href="#" className="inline-block bg-white text-[#006885] font-semibold text-[14px] px-6 py-3 rounded-full hover:bg-gray-100 transition-colors">
                Liên hệ ngay
              </a>
            </div>
            <div className="flex-1 relative h-[250px]">
              <img src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&h=300&fit=crop" alt="Vietnam Airlines" className="w-full h-full object-cover" />
            </div>
            {/* QR Code */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[100px] h-[100px] bg-white rounded-xl p-2">
              <div className="w-full h-full bg-gray-800 rounded" />
            </div>
          </div>
        </div>

        {/* Đăng ký E-Newsletter */}
        <div className="grid grid-cols-2 gap-12 pb-16">
          <div>
            <h2 className="text-[28px] font-bold text-vna-navy italic mb-3">Đăng ký E-Newsletter</h2>
            <p className="text-[13px] text-vna-gray-text">
              Đăng ký E-Newsletter để cập nhật các thông tin, ưu đãi mới nhất từ Vietnam Airlines (không bao gồm các thông tin, ưu đãi từ chương trình Bông Sen Vàng).
            </p>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-[12px] text-vna-gray-text mb-1 block">Email <span className="text-red-500">*</span></label>
                <input type="email" placeholder="Nhập email" className="w-full px-4 py-2.5 border border-vna-border rounded text-[13px] outline-none" />
              </div>
              <div>
                <label className="text-[12px] text-vna-gray-text mb-1 block">Ngôn ngữ <span className="text-red-500">*</span></label>
                <select className="w-full px-4 py-2.5 border border-vna-border rounded text-[13px] outline-none appearance-none bg-white">
                  <option>Tiếng Việt</option>
                  <option>English</option>
                </select>
              </div>
            </div>
            <button className="px-8 py-2.5 text-white font-semibold text-[14px] rounded-lg" style={{ backgroundColor: '#006885' }}>Gửi</button>
          </div>
        </div>
      </div>
    </section>
  )
}
