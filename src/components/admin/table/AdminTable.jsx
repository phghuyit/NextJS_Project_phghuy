"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare,faTrashCan } from "@fortawesome/free-solid-svg-icons";
import formatPrice from './../../../utils/formatPrice';
import { useState, useEffect } from "react";
import categoryServices from "@/services/categoryService";
import Image from "next/image";
import getImageSrc from "@/utils/getImageSrc";

let btnClass="rounded-[5px] border border-gray-200 px-3 py-2  transition duration-300 hover:border-red-300 hover:bg-red-50 cursor-pointer"
export default function AdminTable({ columns, data,onEdit,onDel}) {
  const [cat, setCat] = useState([]);
  useEffect(() => {
    async function fetchCats() {
      try {
        const res = await categoryServices.getAll();
        if (res) setCat(res.categories || res.data || []);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCats();
  }, []);

  return (
    <table border="1" className="border-collapse bg-white text-left  shadow-sm mx-3">
      <thead>
        <tr className="bg-[#131921] text-white">
          {columns.map(col => (
            <th className="border border-[#243244] px-4 py-3 font-semibold capitalize" key={col.key}>{col.label}</th>
          ))}
          <th className="border border-[#243244] px-4 py-3 text-center font-semibold">Hành Động</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id} className="text-gray-700 transition duration-200 hover:bg-orange-50">
            {columns.map(col => (
                col.key=="price" || col.key=="sale_price"?
                <td key={col.key} className="border border-gray-200 px-4 py-3">
                {formatPrice(row[col.key])}</td>
                :col.key=="status"?
                <td key={col.key} className="border border-gray-200 px-4 py-3">
                  <span className={`${row[col.key] == 1 ? "text-green-600" : "text-red-600"}`}>
                    {row[col.key] == 1 ? "Hoạt động" : "Không hoạt động"}
                  </span>
                </td>
                :col.key=="is_on_sale"?
                <td key={col.key} className="border border-gray-200 px-4 py-3">
                  <span className={`${row[col.key] == 1 ? "text-green-600" : "text-red-600"}`}>
                    {row[col.key] == 1 ? "Hoạt động" : "Không hoạt động"}
                  </span>
                </td>
                :col.key=="parent_id"?
                <td key={col.key} className="border border-gray-200 px-4 py-3">
                  {
                    cat.find((c) => c.id == row[col.key])?.category_name || 
                    (row[col.key] === 0 ? 'Danh mục gốc' : row[col.key])
                  }
                </td>
                :col.key=="cat_id"?
                <td key={col.key} className="border border-gray-200 px-4 py-3">
                  {
                    cat.find((c) => c.id == row[col.key])?.category_name || row[col.key]
                  }
                </td>
                :col.key=="image"?
                <td key={col.key} className="border border-gray-200 px-4 py-3">
                  <div className="relative w-16 h-16 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                    <Image 
                      src={getImageSrc(row["image"])} 
                      alt="hình ảnh mô tả sản phẩm" 
                      fill 
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </td>
                :<td key={col.key} className="border border-gray-200 px-4 py-3">{row[col.key]}</td>
            ))}
            <td className="border border-gray-200 px-4 py-3">
                <div className="flex items-center justify-center gap-3">
                    <button className={`text-[#131921] ${btnClass}`} 
                    onClick={()=>onEdit(row)}>
                        <FontAwesomeIcon icon={faPenToSquare} className="w-6 h-6" />
                    </button>
                    <button className={`text-red-500 ${btnClass}`} 
                    onClick={()=>onDel(row.id)}>
                        <FontAwesomeIcon icon={faTrashCan} className="w-6 h-6" />
                    </button>
                </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
