"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare,faTrashCan } from "@fortawesome/free-solid-svg-icons";
import formatPrice from './../../../utils/formatPrice';
export default function AdminTable({ columns, data,onEdit,onDel }) {
  return (
    <table border="1" className="w-full border-collapse bg-white text-left  shadow-sm">
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
              col.key=="price"?<td key={col.key} className="border border-gray-200 px-4 py-3">{formatPrice(row[col.key])}</td>:<td key={col.key} className="border border-gray-200 px-4 py-3">{row[col.key]}</td>
            ))}
            <td className="border border-gray-200 px-4 py-3">
                <div className="flex items-center justify-center gap-3">
                    <button className="rounded-[5px] border border-gray-200 px-3 py-2 text-[#131921] transition duration-300 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-500" 
                    onClick={()=>onEdit(row)}>
                        <FontAwesomeIcon icon={faPenToSquare} className="w-6 h-6" />
                    </button>
                    <button className="rounded-[5px] border border-gray-200 px-3 py-2 text-red-500 transition duration-300 hover:border-red-300 hover:bg-red-50" 
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
