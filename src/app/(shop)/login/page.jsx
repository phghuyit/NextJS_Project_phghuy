"use client"
import Link from 'next/link';
import { useState } from 'react';
import { login } from '@/services/authServices';
import { useRouter } from 'next/navigation';
import{useAuth} from '@/context/AuthContext';

export default function Page() {
    const router = useRouter();
    const [loading,setLoad]=useState(false);
    const [err,setErr]=useState([]);
    const {loginUser}= useAuth();
    const [form,setForm]=useState({
        email:'',
        password:''
    });
    function handleForm(e){
        const {name,value}=e.target;
        setForm({
            ...form,
            [name]:value,
        });
    }
    
    async function handleSubmit(e){
        e.preventDefault();
        setLoad(true);
        setErr([]);
        try{
            const res=await login(form);
            console.log(res)
            alert("Đăng nhập thành công!",res);
            loginUser(res.data, res.access_token);
            router.push("/");
        }catch(error){
            if (error.response?.status === 422 || error.response?.status === 401) {
                const validationErrors = error.response.data.errors;
                if (validationErrors) {
                    setErr("Đã xảy ra lỗi hệ thống, vui lòng thử lại.");
                    console.error(Object.values(validationErrors).flat());
                } else {
                    setErr([error.response.data.message || "Email hoặc mật khẩu không chính xác."]);
                }
            } else {
                setErr([error.response?.data?.message || "Đã xảy ra lỗi hệ thống, vui lòng thử lại."]);
            }
        }finally{
            setLoad(false);
        }
    }
    const input ="border border-[#a6a6a6] focus:ring-orange-200 focus:ring-2 focus:border-orange-100 outline-none h-9.5 px-3 rounded-[3px] w-full text-base  duration-300 mt-2 transition-all";

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="border border-[#d5d9d9] bg-white p-8 rounded-lg w-[400px]">
            <h1 className="font-semibold text-3xl mb-5 uppercase">Đăng nhập</h1>
            {err.length > 0 && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg" role="alert">
                <ul className="list-disc list-inside space-y-1">
                  {err.map((errorMsg, index) => (
                    <li key={index}>{errorMsg}</li>
                  ))}
                </ul>
              </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <label className="font-bold text-base text-[#111]">Email hoặc số điện thoại di
                        động</label>
                    <input type="text" id="email" name="email" value={form.email}
                        className={input} onChange={handleForm}/>
                    <label className="font-bold text-base text-[#111]">Mật Khẩu:</label>
                    <input type="password" id="password" name="password" 
                        className={input} onChange={handleForm} value={form.password}/>
                </div>
                <button type="submit"
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
