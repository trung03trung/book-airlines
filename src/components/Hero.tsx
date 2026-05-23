import { useState, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'

const slides = [
  { subtitle: 'Giảm đến 10% – Bay xa hơn, tiết kiệm hơn', title: 'Weekend Sale', cta: 'Khám phá ngay', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1600&h=700&fit=crop' },
  { subtitle: 'Bay muôn nơi', title: 'Tiết kiệm tới 20%', cta: 'Khám phá ngay', img: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1600&h=700&fit=crop' },
  { subtitle: 'Ưu đãi hấp dẫn cho mọi hành trình', title: 'Bay thỏa thích', cta: 'Khám phá ngay', img: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=1600&h=700&fit=crop' },
  { subtitle: 'HÀNH TRÌNH VIỆT NAM - PERTH, ÚC', title: 'BAY XA - ƯU ĐÃI TỐT', cta: 'Mua ngay', img: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1600&h=700&fit=crop' },
  { subtitle: 'ƯU ĐÃI ĐẶC BIỆT CÙNG VIETNAM AIRLINES', title: 'Nước Úc vẫy gọi', cta: 'Khám phá ngay', img: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1600&h=700&fit=crop' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative w-full h-[500px] md:h-[550px] overflow-hidden">
      {slides.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${s.img})` }} />
          <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-transparent to-transparent" />

          {/* Content - RIGHT aligned like screenshot */}
          <div className="relative h-full flex items-center justify-end pr-8 md:pr-16">
            <div className="text-white text-right max-w-[400px]">
              <p className="text-[14px] text-white/90 mb-2">{s.subtitle}</p>
              <h2 className="text-[32px] md:text-[44px] font-bold leading-tight mb-5 font-serif italic">{s.title}</h2>
              <a href="#" className="inline-flex items-center gap-2 border border-white text-white font-medium px-5 py-2.5 text-[13px] hover:bg-white hover:text-vna-navy transition-colors">
                {s.cta} <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Vertical numbered indicators - LEFT side */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`text-[14px] font-medium py-2 transition-all ${i === current ? 'text-white text-[20px] font-bold' : 'text-white/50'}`}
          >
            {String(i + 1).padStart(2, '0')}
          </button>
        ))}
        {/* Vertical line indicator */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/20 -translate-x-1/2" />
        <div
          className="absolute left-1/2 w-[2px] bg-white -translate-x-1/2 transition-all duration-500"
          style={{ top: `${current * 20}%`, height: '20%' }}
        />
      </div>
    </section>
  )
}
