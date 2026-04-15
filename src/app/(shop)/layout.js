import Footer from "@/components/shop/footer";
import Header from "@/components/shop/header";

export default function ShopLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
        <Header/>
        <main className="flex-1 flex flex-col items-center ">
          { children }
        </main>
        <Footer/>
    </div>
  );
}
