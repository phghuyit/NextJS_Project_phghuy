"use client";

import formatPrice from "@/utils/formatPrice";
import Link from "next/link";
import { useState } from "react";
import CartItem from "@/components/shop/cart/CartItem";

export default function OrderItem({ order }) {
    // Destructure order details with some safe default fallbacks
    const {
        id,
        created_at,
        status = "Đang xử lý", 
        total_amount,
        total_qty,
        items = []
    } = order;

    const [showPreview, setShowPreview] = useState(false);

    // Format the date to a readable Vietnamese format
    const orderDate = new Date(created_at || Date.now()).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    // Helper function to dynamically color the status badge
    const getStatusColor = (currentStatus) => {
        switch (currentStatus.toLowerCase()) {
            case "đã giao":
            case "hoàn thành":
                return "bg-green-100 text-green-800";
            case "đã hủy":
                return "bg-red-100 text-red-800";
            default:
                return "bg-blue-100 text-blue-800"; // default for processing/pending
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
            {/* Header: Order ID, Date, and Status */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 mb-4 gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Đơn hàng #{id}</h3>
                    <p className="text-sm text-gray-500 mt-1">Ngày đặt: {orderDate}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                    {status}
                </span>
            </div>

            {/* Body: Quantity, Items preview, and Total Price */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                    <p className="text-gray-700 font-medium">
                        Số lượng sản phẩm: <span className="font-bold">{total_qty}</span>
                    </p>
                    {items.length > 0 && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                            Bao gồm: {items.map(item => item.product_name).join(", ")}
                        </p>
                    )}
                </div>
                <div className="text-left sm:text-right">
                    <p className="text-sm text-gray-500 mb-1">Tổng tiền</p>
                    <p className="text-xl font-bold text-orange-600">{formatPrice(total_amount)}</p>
                </div>
            </div>

            {/* Footer: Action Buttons */}
            <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-4">
                <Link
                    href={`/orders/${id}`}
                    className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                    Xem chi tiết
                </Link>
                <button 
                    onClick={() => setShowPreview(!showPreview)}
                    className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                    {showPreview ? "Ẩn xem trước" : "Xem trước"}
                </button>
                <button className="px-4 py-2 text-sm font-semibold text-[#131921] bg-orange-400 hover:bg-orange-500 rounded transition-colors">
                    Mua lại
                </button>
            </div>

            {/* Expanded Preview section */}
            {showPreview && (
                <div className="mt-4 border-t border-gray-100 pt-4 space-y-4">
                    {items.map((item) => (
                        <CartItem 
                            key={item.id} 
                            item={item} 
                            // Empty functions prevent errors if the user clicks +/- or delete in read-only mode
                            onUpdateQuantity={() => {}} 
                            onRemove={() => {}} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}