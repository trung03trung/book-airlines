const promos = [
  { title: 'Hà Nội → Đà Nẵng', price: 'từ 990.000 VNĐ', tag: 'Hot', img: 'https://images.unsplash.com/photo-1559628233-100c798642d4?w=400&h=250&fit=crop' },
  { title: 'TP.HCM → Phú Quốc', price: 'từ 1.190.000 VNĐ', tag: 'Mới', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop' },
  { title: 'Hà Nội → Bangkok', price: 'từ 2.490.000 VNĐ', tag: '-30%', img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&h=250&fit=crop' },
  { title: 'TP.HCM → Singapore', price: 'từ 2.890.000 VNĐ', tag: '-25%', img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=250&fit=crop' },
]

export default function Promotions() {
  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="vna-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[22px] font-bold text-vna-navy">Ưu đãi hấp dẫn</h2>
          <a href="#" className="text-vna-teal text-[13px] font-medium hover:underline">Xem tất cả →</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {promos.map((p, i) => (
            <a key={i} href="#" className="group overflow-hidden bg-white border border-vna-border hover:shadow-lg transition-shadow">
              <div className="relative h-[160px] overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-vna-gold text-white text-[10px] font-bold px-2 py-0.5">{p.tag}</span>
              </div>
              <div className="p-4">
                <h3 className="text-[13px] font-semibold text-vna-gray-text group-hover:text-vna-teal transition-colors">{p.title}</h3>
                <p className="text-[14px] font-bold text-vna-gold mt-1">{p.price}</p>
                <p className="text-[11px] text-vna-gray-light mt-1">Giá đã bao gồm thuế & phí</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
