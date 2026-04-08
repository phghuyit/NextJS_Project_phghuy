export default function Footer() {
  return (
    <footer className="bg-[#232f3e] text-gray-300 mt-16">

    {/* <!-- Top Links --> */}
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

        <div>
            <h3 className="text-white font-semibold mb-4">Get to Know Us</h3>
            <ul className="space-y-2">
                <li><a href="#" className="hover:underline">About Amazon</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Press Releases</a></li>
                <li><a href="#" className="hover:underline">Investor Relations</a></li>
            </ul>
        </div>

        <div>
            <h3 className="text-white font-semibold mb-4">Make Money with Us</h3>
            <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Sell on Amazon</a></li>
                <li><a href="#" className="hover:underline">Affiliate Program</a></li>
                <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
                <li><a href="#" className="hover:underline">Self-Publish with Kindle</a></li>
            </ul>
        </div>

        <div>
            <h3 className="text-white font-semibold mb-4">Amazon Payment</h3>
            <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Business Card</a></li>
                <li><a href="#" className="hover:underline">Shop with Points</a></li>
                <li><a href="#" className="hover:underline">Reload Balance</a></li>
                <li><a href="#" className="hover:underline">Currency Converter</a></li>
            </ul>
        </div>

        <div>
            <h3 className="text-white font-semibold mb-4">Let Us Help You</h3>
            <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Your Account</a></li>
                <li><a href="#" className="hover:underline">Returns Centre</a></li>
                <li><a href="#" className="hover:underline">Help</a></li>
                <li><a href="#" className="hover:underline">Shipping Rates</a></li>
            </ul>
        </div>

    </div>
    
    {/* <!-- Bottom --> */}
    <div className="border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm">

            <div className="text-white font-bold text-xl mb-4 md:mb-0">
                amazin<span className="text-orange-400">ebook</span>
            </div>

            <div className="text-gray-400 text-center md:text-right">
                © 2026 Amazon Ebook Clone. All rights reserved.
            </div>

        </div>
    </div>

</footer>

  );
}