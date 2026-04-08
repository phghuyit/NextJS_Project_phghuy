import Header from "@/components/admin/partial/header";
import Sidebar from '@/components/admin/partial/sidebar';
export default function AdminLayout({ children }) {
  return (
    <div>
      <div className="grid grid-cols-[30%_1fr] transition-all duration-300
        lg:grid-cols-[25%_1fr]
        xl:grid-cols-[15%_1fr] ">
        <Sidebar/>
        <div className="bg-gray-200">
            <Header/>
            <main className="flex-1">
                {children}
            </main>
        </div>
      </div>
    </div>
  );
}