import { useState } from 'react'
import { Search, ChevronLeft, ChevronRight, Globe, Compass, CreditCard, Briefcase, Route, Tv, Star, HelpCircle, MessageCircle, X, User } from 'lucide-react'

const navItems = [
  { icon: Compass, label: 'Khám Phá', sections: [
    { icon: '🏷️', title: 'Ưu đãi', items: ['Ưu đãi tháng', 'Ưu đãi LotuSociety', 'Ưu đãi cho người cao tuổi'] },
    { icon: '🗺️', title: 'Lịch bay & Mạng đường bay', items: ['Mạng đường bay'] },
  ]},
  { icon: CreditCard, label: 'Mua vé', sections: [
    { icon: '💳', title: 'Hướng dẫn mua vé & thanh toán', items: ['Hướng dẫn đặt vé máy bay online', 'Các hình thức thanh toán', 'Xuất hóa đơn VAT điện tử'] },
    { icon: '✈️', title: 'Mua vé & Quản lý đặt chỗ', items: ['Mua vé', 'Quản lý đặt chỗ', 'Làm thủ tục', 'Tự nguyện hoàn/đổi vé & Hủy đặt chỗ', 'Tự đổi chuyến bay'] },
    { icon: '📍', title: 'Điều kiện giá', items: ['Điều kiện giá vé', 'Thuế, phí, lệ phí và & phụ thu'] },
  ]},
  { icon: Briefcase, label: 'Dịch vụ bổ trợ', sections: [
    { icon: '🧳', title: 'Dịch vụ bổ trợ', items: ['Mua thêm hành lý ký gửi', 'Chọn trước chỗ ngồi', 'Nâng hạng', 'Sky Sofa', 'Tất cả các dịch vụ bổ trợ'] },
  ]},
  { icon: Route, label: 'Hành trình', sections: [
    { icon: '🧳', title: 'Hành lý', items: ['Tra cứu thông tin hành lý', 'Hành lý xách tay', 'Hành lý ký gửi miễn cước'] },
    { icon: '📋', title: 'Làm thủ tục', items: ['Làm thủ tục trực tuyến', 'Làm thủ tục tại kiosk', 'Làm thủ tục tại sân bay'] },
    { icon: '🏢', title: 'Thông tin sân bay', items: ['Phòng khách Thương gia', 'Dịch vụ nối chuyến', 'Bản đồ sân bay'] },
  ]},
  { icon: Tv, label: 'Trải nghiệm bay', sections: [
    { icon: '✨', title: 'Trải nghiệm bay', items: ['Hạng Thương gia', 'Hạng Phổ thông đặc biệt', 'Hạng Phổ thông', 'Giải trí trên chuyến bay'] },
  ]},
  { icon: Star, label: 'Lotusmiles', sections: [
    { icon: '⭐', title: 'Lotusmiles', items: ['Giới thiệu chương trình', 'Quyền lợi và tiêu chí xét hạng', 'Đăng ký và quản lý tài khoản'] },
    { icon: '📈', title: 'Tích lũy dặm', items: ['Trên các chuyến bay', 'Chi tiêu thẻ ngân hàng'] },
    { icon: '🎁', title: 'Sử dụng dặm', items: ['Đổi dặm lấy vé thưởng', 'Đổi dặm nâng hạng vé'] },
  ]},
  { icon: HelpCircle, label: 'Trợ giúp' },
]

export default function Header({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const [activeMenu, setActiveMenu] = useState<number | null>(null)

  const sidebarWidth = collapsed ? 'w-[60px]' : 'w-[200px]'
  const sidebarPx = collapsed ? 60 : 200

  return (
    <>
      {/* Left Sidebar - always visible, just narrower when collapsed */}
      <aside className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-all duration-300 ${sidebarWidth}`} style={{ backgroundColor: '#006885' }}>
        {/* Logo */}
        <div className="flex items-center justify-center py-4">
          <a href="/">
            <svg viewBox="0 0 44 44" className="w-8 h-8">
              <path d="M22 4C24 11,27 15,32 19C27 19,24 21,22 24C20 21,17 19,12 19C17 15,20 11,22 4Z" fill="#DAA520"/>
              <path d="M22 18C24 25,27 29,32 33C27 33,24 35,22 38C20 35,17 33,12 33C17 29,20 25,22 18Z" fill="#DAA520" opacity="0.6"/>
            </svg>
          </a>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-hidden">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => item.sections && setActiveMenu(activeMenu === i ? null : i)}
              className={`group w-full flex items-center gap-3 py-5 transition-colors rounded-l-full ${collapsed ? 'justify-center px-0' : 'px-5'} ${activeMenu === i ? 'bg-[#cce1e7]' : 'hover:bg-[#cce1e7]'}`}
              title={item.label}
            >
              <item.icon size={18} className={`flex-shrink-0 transition-colors ${activeMenu === i ? 'text-black' : 'text-white group-hover:text-black'}`} />
              {!collapsed && <span className={`text-[14px] whitespace-nowrap transition-colors ${activeMenu === i ? 'text-black' : 'text-white group-hover:text-black'}`}>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Chat button */}
        <div className={`pb-3 ${collapsed ? 'px-2' : 'px-4'}`}>
          <button className={`flex items-center justify-center gap-2 text-white text-[12px] font-medium py-2.5 transition-colors ${collapsed ? 'w-full px-0' : 'w-full px-4'}`} style={{ backgroundColor: '#006666' }}>
            <MessageCircle size={16} />
            {!collapsed && <span>Chat với NEO</span>}
          </button>
        </div>

        {/* Bottom - Login icon when collapsed, full panel when expanded */}
        {collapsed ? (
          <div className="pb-4 flex justify-center">
            <button className="w-9 h-9 text-white flex items-center justify-center" style={{ backgroundColor: '#1A2B4A' }}>
              <User size={16} />
            </button>
          </div>
        ) : (
          <div className="px-4 py-4" style={{ backgroundColor: '#1A2B4A' }}>
            <p className="text-[11px] text-white/80 font-semibold tracking-wider text-center mb-2 uppercase">Lotusmiles</p>
            <button className="w-full border border-white/50 text-white text-[12px] py-1.5 mb-2 hover:bg-white/10 transition-colors">Đăng nhập</button>
            <button className="w-full border border-white/50 text-white text-[12px] py-1.5 hover:bg-white/10 transition-colors">Đăng ký</button>
          </div>
        )}
      </aside>

      {/* Collapse/Expand toggle */}
      <button
        onClick={onToggle}
        className="fixed top-[60px] z-50 w-6 h-6 bg-white shadow-md border border-vna-border flex items-center justify-center text-vna-gray-text hover:text-vna-teal transition-all duration-300"
        style={{ left: `${sidebarPx}px` }}
        aria-label="Toggle menu"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Submenu panel */}
      {activeMenu !== null && navItems[activeMenu].sections && (
        <>
          <div
            className="fixed top-[60px] z-[49] shadow-2xl overflow-y-auto max-h-[80vh] rounded-r-xl"
            style={{ left: `${sidebarPx}px`, width: '380px', backgroundColor: '#cce1e7' }}
          >
            <div className="flex justify-end p-4">
              <button onClick={() => setActiveMenu(null)} className="text-vna-gray-text hover:text-vna-teal transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="px-6 pb-6">
              {navItems[activeMenu].sections!.map((section, si) => (
                <div key={si} className="mb-6">
                  <div className="flex items-center gap-2 pb-3 border-b border-vna-border mb-3">
                    <span className="text-[16px]">{section.icon}</span>
                    <h3 className="text-[14px] font-semibold text-vna-navy">{section.title}</h3>
                  </div>
                  <ul className="space-y-1">
                    {section.items.map((item, ii) => (
                      <li key={ii}>
                        <a href="#" className="block py-2.5 px-2 text-[13px] text-vna-gray-text hover:text-vna-teal hover:bg-white/50 transition-colors">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="fixed inset-0 z-[48] bg-black/20" onClick={() => setActiveMenu(null)} />
        </>
      )}

      {/* Top bar */}
      <div
        className="fixed top-0 right-0 z-40 h-[50px] flex items-center gap-4 px-6 transition-all duration-300"
        style={{ left: `${sidebarPx}px` }}
      >
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center border border-vna-border bg-white px-3 py-1.5">
            <Search size={14} className="text-vna-gray-light mr-2" />
            <input type="text" placeholder="Tìm kiếm" className="text-[13px] outline-none w-[150px] bg-transparent" />
          </div>
          <button className="flex items-center gap-1 bg-red-600 text-white text-[12px] font-medium px-3 py-1.5">
            <Globe size={13} />
            VI
          </button>
        </div>
      </div>
    </>
  )
}
