import Footer from "@/components/shop/footer";
import Header from "@/components/shop/header";
import { AuthProvider } from "@/context/AuthContext";
import StoreProvider from "@/lib/StoreProvider";

export default function ShopLayout({ children }) {
  return (
    <StoreProvider>
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
          <Header/>
          <main className="flex-1 flex flex-col items-center ">
            { children }
          </main>
          <Footer/>
      </div>
    </AuthProvider>
    </StoreProvider>
  );
}
