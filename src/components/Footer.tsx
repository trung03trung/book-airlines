export default function Footer() {
  return (
    <footer className="bg-vna-navy-dark text-white">
      <div className="vna-container py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div>
            <h4 className="text-[12px] font-bold text-vna-gold-light mb-3 uppercase">Vietnam Airlines</h4>
            <ul className="space-y-2">
              {['Giới Thiệu Công Ty','Đội Bay','Đối Tác','Thông Tin Truyền Thông','Phát Triển Bền Vững','Quan Hệ Cổ Đông','Việc Làm'].map(t => (
                <li key={t}><a href="#" className="text-[11px] text-white/60 hover:text-vna-gold-light transition-colors">{t}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-bold text-vna-gold-light mb-3 uppercase">Hỗ Trợ</h4>
            <ul className="space-y-2">
              {['Góp Ý Dịch Vụ','Trung Tâm Trợ Giúp','Câu Hỏi Thường Gặp','Liên Hệ Chi Nhánh VNA','Chính Sách Bảo Vệ HK','Ứng Dụng Di Động'].map(t => (
                <li key={t}><a href="#" className="text-[11px] text-white/60 hover:text-vna-gold-light transition-colors">{t}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-bold text-vna-gold-light mb-3 uppercase">Pháp Lý</h4>
            <ul className="space-y-2">
              {['Điều Kiện & Điều Khoản','Điều Lệ Vận Chuyển','Chính Sách Cookies','Bảo Mật Thông Tin','Quy Chế Sàn TMĐT'].map(t => (
                <li key={t}><a href="#" className="text-[11px] text-white/60 hover:text-vna-gold-light transition-colors">{t}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-bold text-vna-gold-light mb-3 uppercase">Thông Tin Hữu Ích</h4>
            <ul className="space-y-2">
              {['Hợp Tác Với Lotusmiles','Tạp Chí Heritage','Cẩm Nang Du Lịch','Quảng Cáo Với VNA'].map(t => (
                <li key={t}><a href="#" className="text-[11px] text-white/60 hover:text-vna-gold-light transition-colors">{t}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-bold text-vna-gold-light mb-3 uppercase">Vận Tải Hàng Hóa</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[11px] text-white/60 hover:text-vna-gold-light transition-colors">Trang Web Hàng Hoá</a></li>
            </ul>
            <div className="mt-5">
              <p className="text-[11px] text-white/40 mb-2">Kết nối với chúng tôi</p>
              <div className="flex gap-2">
                {[{l:'FB',c:'bg-[#1877F2]'},{l:'YT',c:'bg-[#FF0000]'},{l:'IG',c:'bg-[#E4405F]'},{l:'TT',c:'bg-black'}].map(s => (
                  <a key={s.l} href="#" className={`w-7 h-7 ${s.c} flex items-center justify-center text-[9px] text-white font-bold hover:opacity-80 transition-opacity`}>{s.l}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Awards */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
          <span className="text-[10px] text-white/40">Giải thưởng:</span>
          {['World Travel Awards','CAPA Aviation','TripAdvisor','SkyTeam'].map(a => (
            <span key={a} className="text-[10px] text-white/30 border border-white/10 px-2 py-1">{a}</span>
          ))}
        </div>

        {/* Legal */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-[10px] text-white/40 leading-relaxed">
            © 2026 Vietnam Airlines JSC. Tổng công ty Hàng không Việt Nam - CTCP.<br/>
            Số 200 Nguyễn Sơn, Phường Bồ Đề, Hà Nội. Điện thoại: (+84-24) 38272289
          </p>
        </div>
      </div>
    </footer>
  )
}
