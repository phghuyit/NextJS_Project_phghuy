"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { register } from '@/services/authServices';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [loading,setLoad]=useState(false);
  const [err,setErr]=useState([]);
  const [form,setForm]=useState({
    name: '',
    email:'',
    password:'',
    gender:'',
    daybirth:'',
    avatar:'',
  })
  const input = "border border-[#a6a6a6] focus:ring-orange-200 focus:ring-2 focus:border-orange-100 outline-none py-1.5 h-9.5 px-3 rounded-[3px] w-full text-base duration-300 mt-1 transition-all"
  function handleForm(e){
    const {name,value,files} = e.target;
    setForm({
      ...form,
      [name]: files && files.length>0?files[0]: value,
    })
  }

  const handleSubmit= async (e)=>{
    e.preventDefault();
    setLoad(true);
    try{
      const formData = new FormData();
      Object.entries(form).forEach(([key,value])=>{
        if(value!=null&&value!="")
          formData.append(key,value);
      })
      await register(formData);
      alert("Dang ky thanh cong");
      router.push("/login");
    }
    catch(error){
      if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors;
        if (validationErrors) {
          setErr(Object.values(validationErrors).flat());
        } else {
          setErr([error.response.data.message || "Dữ liệu đăng ký không hợp lệ."]);
        }
      } else {
        setErr(["Đã xảy ra lỗi hệ thống, vui lòng thử lại."]);
      }
      setLoad(false);
    }
  }
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-10">
      <div className="border border-[#d5d9d9] bg-white p-8 rounded-lg w-[80%]">
        <h1 className="font-semibold text-3xl mb-5 uppercase">Tạo tài khoản</h1>
        {err.length > 0 && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-5">
            <ul className="list-disc list-inside text-sm space-y-1">
              {err.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="font-bold text-base text-[#111]">Họ và tên</label>
                  <input type="text" id="name" name="name" required
                      className={input} value={form.name} onChange={handleForm}/>
                </div>

                <div>
                  <label htmlFor="email" className="font-bold text-base text-[#111]">Địa chỉ Email</label>
                  <input type="email" id="email" name="email" required value={form.email}
                      className={input} onChange={handleForm}/>
                </div>

                <div>
                    <label htmlFor="password" className="font-bold text-base text-[#111]">Mật khẩu</label>
                    <input type="password" id="pass" name="password" required value={form.password}
                        className={input} onChange={handleForm}/>
                </div>

                <div>
                  <label htmlFor="gender" className="font-bold text-base text-[#111]">Giới tính</label>
                  <select id="gender" name="gender" required
                      className={input} onChange={handleForm} value={form.gender}>
                      <option value="">Chọn giới tính</option>
                      <option value="0">Nam</option>
                      <option value="1">Nữ</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="daybirth" className="font-bold text-base text-[#111]">Ngày sinh</label>
                  <input type="date" id="daybirth" name="daybirth" required value={form.daybirth} onChange={handleForm}
                      className="border border-[#a6a6a6] focus:ring-orange-200 focus:ring-2 focus:border-orange-100 outline-none py-1.5 h-10 px-3 rounded-[3px] w-full text-base duration-300 mt-1 transition-all"/>
                </div>

                <div>
                    <label htmlFor="avatar" className="font-bold text-base text-[#111]">Ảnh đại diện</label>
                    <input type="file" id="avatar" name="avatar" accept="image/*" onChange={handleForm}
                        className="w-full text-base text-gray-700 mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#ffd814] file:text-[#111] hover:file:bg-[#f7ca00] transition-all cursor-pointer"/>
                </div>
            </div>
            
            <button type="submit"
                className="bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-2xl w-full py-2.5 text-base shadow font-medium mt-6">
                Đăng ký
            </button>
        </form>

        <p className="text-sm text-[#111] mt-5 leading-relaxed">
            Bằng cách tiếp tục, bạn đồng ý với <a href="#"
                className="text-[#0066c0] hover:text-[#c45500] hover:underline">Điều kiện sử dụng</a> và <a
                href="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">Thông báo bảo mật</a> của
            Amazin.
        </p>

        <div className="border-[#d5d9d9] border-b my-6"></div>
        <div className="text-base font-bold text-[#111] mb-2">Đã có tài khoản?</div>
        <Link href="/login" className="text-base text-[#0066c0] hover:text-[#c45500] hover:underline">Đăng nhập tại đây</Link>
      </div>
    </div>
  );
}
