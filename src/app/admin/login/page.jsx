"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin as loginAdminService } from '@/services/authServices';
import { useAdminAuth } from '@/context/AdminContext';
export default function Page() {
    const router = useRouter();
    const [loading, setLoad] = useState(false);
    const [err, setErr] = useState([]);
    const { loginAdmin } = useAdminAuth();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    function handleForm(e) {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    }
    
    async function handleSubmit(e) {
        e.preventDefault()
        setLoad(true);
        setErr([]);
        try {
            const res = await loginAdminService(form);
            const token = res?.access_token;
            loginAdmin(res.data,token);
            router.replace("/admin"); 
            // router.push("/admin"); 
        } catch (error) {
            if (error.response?.status === 422 || error.response?.status === 401) {
                const validationErrors = error.response.data.errors;
                if (validationErrors) {
                    setErr(Object.values(validationErrors).flat());
                } else {
                    setErr([error.response.data.message || "Email hoặc mật khẩu không chính xác."]);
                }
            } else {
                setErr([error.response?.data?.message || "Đã xảy ra lỗi hệ thống, vui lòng thử lại."]);
            }
        } finally {
            setLoad(false);
        }
    }

    const input = "border border-[#a6a6a6] focus:ring-blue-200 focus:ring-2 focus:border-blue-400 outline-none h-10 px-3 rounded-[3px] w-full text-base duration-300 mt-2 transition-all";

  return (
    <div className="h-full bg-gray-50 flex flex-col items-center justify-center">
      <div className="border border-[#d5d9d9] bg-white p-8 rounded-lg w-[400px] shadow-sm">
            <div className="text-center mb-6">
                <h1 className="font-semibold text-3xl uppercase text-gray-800">Admin Login</h1>
            </div>
            {err.length > 0 && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg" role="alert">
                <ul className="list-disc list-inside space-y-1">
                  {err.map((errorMsg, index) => (
                    <li key={index} className="text-sm">{errorMsg}</li>
                  ))}
                </ul>
              </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="space-y-3">
                    <label className="font-bold text-base text-[#111] block">Email quản trị</label>
                    <input type="email" id="email" name="email" value={form.email} className={input} onChange={handleForm} required />
                    <label className="font-bold text-base text-[#111] block mt-3">Mật Khẩu</label>
                    <input type="password" id="password" name="password" className={input} onChange={handleForm} value={form.password} required />
                </div>
                <button type="submit" disabled={loading} className={`cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-md w-full py-2.5 text-base shadow font-medium mt-6 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>{loading ? 'Đang xử lý...' : 'Đăng nhập'}</button>
            </form>
        </div>
    </div>
  );
}
