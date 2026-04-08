import Footer from "@/components/admin/partial/footer";
import Header from "@/components/admin/partial/header";
import Sidebar from '@/components/admin/partial/sidebar';
import {Be_Vietnam_Pro} from "next/font/google"

const beVietNam = Be_Vietnam_Pro({
  subsets:['latin','vietnamese'],
  weight: ['400','500','600','700','800','900'],
  display:'swap'
});

export default function AdminLayout({ children }) {
  return (
    <div>
      <div className="grid grid-cols-[15%_1fr] transition-all duration-300
        lg:grid-cols-[10%_1fr]
         ">
        <Sidebar/>
        <div className={`bg-gray-200 flex flex-col ${beVietNam.className}`}>
            <Header/>
            <main className="flex-1">
                {children}
            </main>
            <Footer/>
        </div>
      </div>
    </div>
  );
}