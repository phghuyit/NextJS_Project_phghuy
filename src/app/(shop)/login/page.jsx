import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="border border-[#d5d9d9] bg-white p-8 rounded-lg w-[400px]">
            <h1 className="font-semibold text-3xl mb-5 uppercase">Đăng nhập</h1>
            <form action="">
                <div className="space-y-2">
                    <label className="font-bold text-base text-[#111]">Email hoặc số điện thoại di
                        động</label>
                    <input type="text" id="email" name="email"
                        className="border border-[#a6a6a6] focus:ring-orange-200 focus:ring-2 focus:border-orange-100 outline-none h-9.5 px-3 rounded-[3px] w-full text-base  duration-300 mt-2 transition-all"/>
                    <label className="font-bold text-base text-[#111]">Mật Khẩu:</label>
                    <input type="text" id="password" name="password"
                        className="border border-[#a6a6a6] focus:ring-orange-200 focus:ring-2 focus:border-orange-100 outline-none h-9.5 px-3 rounded-[3px] w-full text-base  duration-300 mt-2 transition-all"/>
                </div>
                <button type="button"
                    className="bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-2xl w-full py-2.5 text-base shadow font-medium mt-5">Tiếp
                    tục</button>
            </form>

            <p className="text-sm text-[#111] mt-5 leading-relaxed">
                Bằng cách tiếp tục, bạn đồng ý với <a href="#"
                    className="text-[#0066c0] hover:text-[#c45500] hover:underline">Điều kiện sử dụng</a> và <a
                    href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Thông báo bảo mật</a> của
                Amazin.
            </p>
            <details className="text-base mt-3 group">
                <summary className="cursor-pointer text-[#0066c0] hover:text-[#c45500] list-none flex items-center">
                    <i className="fa-solid fa-angle-down transition- form duration-300 group-open:rotate-180 text-xs"></i>
                    <span className="group-hover:underline">Cần trợ giúp?</span>
                </summary>
                <div className="pl-4 mt-2 space-y-2 flex flex-col translate-x-2 items-start">
                    <a href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline text-sm">Quên mật khẩu</a>
                    <a href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline text-sm">Vấn đề khác với
                        đăng nhập</a>
                </div>
            </details>
            <div className="border-[#d5d9d9] border-b my-6"></div>
            <div className="text-base font-bold text-[#111]">Bạn chưa có tài khoản?</div>
            <Link href="/register" className="text-base text-[#0066c0] hover:text-[#c45500] hover:underline">Tạo tài khoản mới</Link>
        </div>
    </div>
  );
}
