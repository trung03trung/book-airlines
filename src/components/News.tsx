const news = [
  { date: '2026-03-19', title: 'Thông báo về việc tạm ngừng các chuyến bay do đóng cửa tạm thời Sân bay Đà Lạt' },
  { date: '2026-03-17', title: 'Vietnam Airlines chuyển nhà ga khai thác tại một số sân bay quốc tế' },
  { date: '2026-02-26', title: 'Thông báo tạm dừng hoạt động sân bay Liên Khương' },
  { date: '2026-02-06', title: 'Thông báo tạm dừng hoạt động Phòng khách Eventyr tại sân bay Copenhagen' },
]

export default function News() {
  return (
    <section className="py-10 bg-white">
      <div className="vna-container">
        <h3 className="text-[13px] font-bold text-vna-navy uppercase tracking-wide mb-4 flex items-center gap-2">
          <span className="w-1 h-4 bg-vna-gold inline-block"></span>
          Tin nhanh
        </h3>
        <div className="divide-y divide-vna-border">
          {news.map((item, i) => (
            <a key={i} href="#" className="flex items-start gap-4 py-3 group hover:bg-vna-gray-bg px-2 -mx-2 transition-colors">
              <span className="text-[11px] text-vna-gray-light whitespace-nowrap mt-0.5">{item.date}</span>
              <p className="text-[13px] text-vna-gray-text group-hover:text-vna-teal transition-colors">{item.title}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
