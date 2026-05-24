import { useSearchParams } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

export default function PassengerInfoPage() {
  const [params] = useSearchParams()
  const from = params.get('from') || 'HAN'
  const to = params.get('to') || 'DAD'
  const fromCity = params.get('fromCity') || 'Hà Nội'
  const toCity = params.get('toCity') || 'Đà Nẵng'
  const date = params.get('date') || '03/06/2026'
  const passengers = params.get('passengers') || '1'

  const [dd, mm] = date.split('/').map(Number)

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <img src="https://www.vietnamairlines.com/~/media/Images/Logo/VNA_LOGO.png" alt="Vietnam Airlines" className="h-8" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
            <span className="text-[13px] text-gray-600">Trang chủ</span>
            <span className="text-[13px] text-gray-600">Tiếng Việt</span>
          </div>
          <span className="text-[13px] text-teal-700 cursor-pointer">Đăng nhập hoặc đăng ký</span>
        </div>
        {/* Flight info bar */}
        <div className="flex items-center px-6 py-3 gap-8 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-[18px] font-bold">{from}</span>
            <span className="text-gray-400">·····✈·····</span>
            <span className="text-[18px] font-bold">{to}</span>
          </div>
          <div className="text-[12px] text-gray-500">{fromCity} | {toCity}</div>
          <div className="border-l border-gray-200 pl-6">
            <p className="text-[11px] text-gray-500">Chuyến đi</p>
            <p className="text-[13px] font-medium">Th 4, {dd} thg {mm}</p>
          </div>
          <div className="border-l border-gray-200 pl-6">
            <p className="text-[11px] text-gray-500">Hành khách</p>
            <p className="text-[13px] font-medium">{passengers} 👤</p>
          </div>
          <button className="ml-auto border border-gray-300 px-4 py-1.5 text-[12px] rounded flex items-center gap-1 hover:bg-gray-50">
            Thay đổi <ChevronDown size={12} />
          </button>
          <div className="bg-gray-800 text-white px-5 py-3 text-center">
            <p className="text-[11px]">🛒</p>
            <p className="text-[11px] font-bold">THÔNG TIN ĐẶT CHỖ</p>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="relative h-[140px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1200&h=200&fit=crop)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg px-8 py-4 text-center shadow">
            <h1 className="text-[20px] font-bold text-teal-700">Nhập thông tin hành khách</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1000px] mx-auto px-4 py-8">
        {/* Instructions */}
        <div className="mb-6 text-[13px] text-gray-700 space-y-2">
          <p><span className="text-red-500 font-medium">Lưu ý: * Trường bắt buộc nhập thông tin</span></p>
          <p>Quý Khách vui lòng sử dụng tiếng Việt không dấu và không sử dụng các ký tự đặc biệt, nhập đầy đủ tên hành khách và những thông tin khác xuất hiện trên (các) giấy tờ tùy thân do chính phủ cấp.</p>
          <p>Nếu Tên đầy đủ của Quý khách lớn hơn 41 ký tự, vui lòng viết tắt tên đệm.</p>
          <p>Ví dụ Tên đầy đủ của hành khách là: NGUYEN VUONG TRAN THI KIM NGUYET ANH DUONG MAI, Quý khách viết tắt như sau:</p>
          <p>Đệm và tên: V T K N A DUONG MAI</p>
          <p>Họ: NGUYEN</p>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <p className="text-[12px] text-gray-500 mb-1">* = các trường bắt buộc</p>
          <p className="text-[13px] text-gray-700 mb-6">Vui lòng điền thông tin cá nhân tương ứng với thông tin trong hộ chiếu</p>

          <div className="space-y-5">
            {/* Danh xưng */}
            <div className="relative border border-gray-300 rounded px-4 pt-4 pb-2">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-[12px] text-gray-500">Danh xưng*</label>
              <select className="w-full text-[14px] outline-none bg-transparent appearance-none">
                <option value="">Chọn danh xưng</option>
                <option value="mr">Ông</option>
                <option value="mrs">Bà</option>
                <option value="ms">Cô</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Tên đệm và tên */}
            <div className="relative border border-gray-300 rounded px-4 pt-4 pb-2">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-[12px] text-gray-500">Tên đệm và tên (thứ tự như trên CCCD/Hộ chiếu)*</label>
              <input type="text" className="w-full text-[14px] outline-none bg-transparent" />
            </div>

            {/* Họ */}
            <div className="relative border border-gray-300 rounded px-4 pt-4 pb-2">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-[12px] text-gray-500">Họ (như trên CCCD/Hộ chiếu)*</label>
              <input type="text" className="w-full text-[14px] outline-none bg-transparent" />
            </div>

            {/* Ngày sinh */}
            <div>
              <div className="relative border border-gray-300 rounded px-4 pt-4 pb-2">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-[12px] text-gray-500">Ngày sinh*</label>
                <input type="text" placeholder="Ngày / Tháng / Năm" className="w-full text-[14px] outline-none bg-transparent" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">📅</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1 ml-4">Định dạng là Ngày / Tháng / Năm</p>
            </div>

            {/* Chương trình khách hàng thường xuyên */}
            <div className="relative border border-gray-300 rounded px-4 pt-4 pb-2">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-[12px] text-gray-500">Chương trình khách hàng thường xuyên</label>
              <select className="w-full text-[14px] outline-none bg-transparent appearance-none">
                <option value="">Chọn chương trình</option>
                <option value="lotusmiles">Lotusmiles</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Số thẻ khách hàng thường xuyên */}
            <div className="relative border border-gray-300 rounded px-4 pt-4 pb-2">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-[12px] text-gray-500">Số thẻ khách hàng thường xuyên</label>
              <input type="text" className="w-full text-[14px] outline-none bg-transparent" />
            </div>
          </div>
        </div>

        {/* Thông tin liên lạc */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mt-6">
          <h3 className="text-[18px] font-bold text-teal-700 text-center mb-6">Thông tin liên lạc</h3>

          <div className="space-y-5">
            {/* Email */}
            <div className="relative border border-gray-300 rounded px-4 pt-4 pb-2">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-[12px] text-gray-500">Địa chỉ email bắt buộc*</label>
              <input type="email" className="w-full text-[14px] outline-none bg-transparent" />
            </div>

            <div className="flex justify-center">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-2.5 text-[13px] rounded transition-colors">
                THÊM ĐỊA CHỈ EMAIL KHÁC
              </button>
            </div>

            {/* Loại điện thoại */}
            <div className="relative border border-gray-300 rounded px-4 pt-4 pb-2">
              <label className="absolute -top-2.5 left-3 bg-white px-1 text-[12px] text-gray-500">Loại điện thoại*</label>
              <select className="w-full text-[14px] outline-none bg-transparent appearance-none">
                <option value="personal">Cá nhân</option>
                <option value="work">Công việc</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Mã quốc gia + Số điện thoại */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative border border-gray-300 rounded px-4 pt-4 pb-2">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-[12px] text-gray-500">Mã quốc gia*</label>
                <input type="text" className="w-full text-[14px] outline-none bg-transparent" />
              </div>
              <div className="relative border border-gray-300 rounded px-4 pt-4 pb-2">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-[12px] text-gray-500">Số điện thoại*</label>
                <input type="text" placeholder="Vui lòng bỏ số 0 ở đầu (VD: 912345678)" className="w-full text-[14px] outline-none bg-transparent" />
              </div>
            </div>

            <div className="flex justify-center">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-2.5 text-[13px] rounded transition-colors">
                THÊM SỐ ĐIỆN THOẠI KHÁC
              </button>
            </div>

            {/* Toggle liên lạc khẩn cấp */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-5 bg-gray-400 rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5" />
              </div>
              <span className="text-[13px] text-gray-600">Vui lòng nhập số liên lạc khẩn cấp</span>
            </div>
          </div>
        </div>

        {/* Privacy notice */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
          <div className="flex items-start gap-3">
            <input type="checkbox" className="w-4 h-4 mt-1 accent-teal-700" />
            <div className="text-[13px] text-gray-700">
              <p>Dữ liệu cá nhân của Quý khách thu thập trên trang này được xử lý và lưu trữ bởi Vietnam Airlines cho mục đích và theo điều kiện đã được công bố tại Chính sách bảo mật thông tin của Vietnam Airlines.</p>
              <a href="#" className="text-teal-700 underline">Chi tiết</a>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-end mt-6 mb-8">
          <button className="border-2 border-teal-700 text-teal-700 font-bold px-8 py-3 text-[14px] rounded hover:bg-teal-700 hover:text-white transition-colors">
            XÁC NHẬN
          </button>
        </div>
      </div>
    </div>
  )
}
