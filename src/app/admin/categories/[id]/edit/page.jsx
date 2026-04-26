"use client";
import categoryServices from "@/services/categoryService";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const {id}=useParams();
  const router = useRouter();

  const [cat,setCat]=useState({
    category_name: '',
    parent_id: 0,
    sort_order: 1,
    status: 1,
    description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [load,setLoad]=useState(true);
  const [err,setErr]=useState(null);
  const [cats, setCats] = useState([]);
  
  useEffect(()=>{
    async function fetchCat() {
      try {
        const res = await categoryServices.getCatById(id);
        const catData = res?.data || res;
        setCat({
          category_name: catData.category_name || '',
          parent_id: catData.parent_id || 0,
          sort_order: catData.sort_order || 1,
          status: catData.status !== undefined ? catData.status : 1,
          description: catData.description || ''
        });
      } catch (error) {
        console.error(error);
        setErr("Không thể tải thông tin danh mục.");
      } finally {
        setLoad(false);
      }
    }

    async function fetchCats() {
      try {
        const res = await categoryServices.getAll();
        if (res) {
          setCats(res.categories || res.data || (Array.isArray(res) ? res : []));
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    }

    if (id) {
      fetchCat();
      fetchCats();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCat(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    setErr(null);
    try {
      const formData = new FormData();
      formData.append('category_name', cat.category_name);
      formData.append('parent_id', cat.parent_id);
      formData.append('sort_order', cat.sort_order);
      formData.append('status', cat.status);
      formData.append('description', cat.description);
      if (imageFile) {
        formData.append('image', imageFile);
      }
      
      await categoryServices.updateCat(id,formData);
      alert("Cập nhật danh mục thành công!");
      router.push('/admin/categories');
    } catch (error) {
      console.error(error);
      setErr("Có lỗi xảy ra khi cập nhật danh mục.");
    } finally {
      setLoad(false);
    }
  };

  if (load && !cat.category_name) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <h1 className="text-center text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <nav className="flex items-center space-x-2 text-sm font-medium text-gray-500 mb-4">
        <Link href="/admin" className="hover:text-blue-600 transition-colors">Trang Chủ</Link>
        <span>/</span>
        <Link href="/admin/categories" className="hover:text-blue-600 transition-colors">Quản Lý Danh Mục</Link>
        <span>/</span>
        <span className="text-gray-800">Chỉnh Sửa Danh Mục</span>
      </nav>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Chỉnh Sửa Danh Mục</h1>
      </div>

      {err && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
          {err}
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tên danh mục */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên Danh Mục</label>
              <input 
                type="text" 
                name="category_name"
                value={cat.category_name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Nhập tên danh mục..." 
                required
              />
            </div>

            {/* Danh mục cha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Danh Mục Cha</label>
              <select 
                name="parent_id"
                value={cat.parent_id}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              >
                <option value="0">Không có (Danh mục gốc)</option>
                {cats.filter((c) => c.id != id).map((c) => (
                  <option key={c.id} value={c.id}>{c.category_name}</option>
                ))}
              </select>
            </div>

            {/* Sắp xếp */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sắp Xếp (Sort Order)</label>
              <input 
                type="number" 
                name="sort_order"
                value={cat.sort_order}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="1" 
              />
            </div>
            {/*danh sach don hang */}
            {/* Trạng thái */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trạng Thái</label>
              <select 
                name="status"
                value={cat.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">Hiển thị</option>
                <option value="0">Ẩn</option>
              </select>
            </div>

            {/* Hình ảnh */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hình Ảnh</label>
              <input 
                type="file" 
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô Tả</label>
            <textarea 
              rows="4" 
              name="description"
              value={cat.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Nhập mô tả chi tiết danh mục..."
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
            <Link 
              href="/admin/categories"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors font-medium"
            >
              Hủy Bỏ
            </Link>
            <button 
              type="submit" 
              disabled={load}
              className={`px-6 py-2 text-white rounded font-medium shadow-sm transition-colors ${load ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {load ? 'Đang lưu...' : 'Lưu Thay Đổi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
