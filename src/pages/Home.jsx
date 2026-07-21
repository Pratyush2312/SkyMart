import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
    Zap,
    ShoppingCart,
    LogOut,
    Package,
    TrendingUp,
    Star,
    Tag,
    Shield,
    ArrowRight,
} from "lucide-react";
import Navbar from './../components/Navbar';
import ProductShowcase from './../components/ProductShowcase';
import CategorySection from './../components/CategorySection';
import Footer from "../components/Footer";
import Cart from './../components/Cart';
import { MyStore } from './../context/MyContext';
import { useNavigate } from "react-router";

const Home = () => {
    const [topRated, setTopRated] = useState([]);
    const [arrivals, setArrivals] = useState([]);
    const { isCartOpen, setIsCartOpen, cart } = useContext(MyStore);

    

    const fetchProducts = async () => {
        let response = await axios("https://fakestoreapi.com/products");
        // console.log();
        setTopRated(response.data.slice(0, 5));
        setArrivals(response.data.slice(5, 10));
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    const navigate = useNavigate();

    let totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    let totaValue = cart.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    ).toFixed(2);

    return (
        <div className="min-h-screen bg-[#090a09] text-white">

            {/* Navbar */}
            <Navbar />

            <main className="mx-auto flex max-w-[1280px] flex-col gap-6 px-4 pb-16 sm:gap-8 sm:px-6 md:gap-10 md:pb-24">

                {/* Hero */}
                <section className="relative overflow-hidden rounded-[20px] border border-[#888] px-5 py-8 sm:rounded-[24px] sm:px-8 sm:py-10 lg:px-12 lg:py-14">

                    {/* Grid Background */}
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    <div className="relative z-10 flex flex-col gap-5 lg:max-w-[65%]">
                        <p className="text-xs font-bold tracking-widest text-[#c6ff00]">
                            GOOD AFTERNOON 👋
                        </p>

                        <h2 className="text-3xl font-bold leading-[1.05] sm:text-4xl lg:text-5xl">
                            Welcome back,
                            <br />
                            <span className="text-[#c6ff00]">
                                Pratyush!
                            </span>
                        </h2>

                        <p className="max-w-[500px] text-sm leading-6 text-[#777]">
                            Discover today's picks — hand-crafted products across
                            <br className="hidden sm:block" />
                            electronics, fashion, and more.
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                onClick={() => { navigate('/products') }}
                                className="flex items-center justify-center gap-3 rounded-xl bg-[#c6ff00] px-7 py-3 text-sm font-bold text-black cursor-pointer"
                            >
                                Shop Now
                                <ArrowRight size={16} />
                            </button>

                            <button
                                onClick={() => { navigate('/products') }}
                                className="rounded-xl border border-[#333] px-7 py-3 text-sm text-[#bbb] cursor-pointer"
                            >
                                View All Products
                            </button>
                        </div>
                    </div>

                    {/* Right Hero Cards */}
                    <div className="relative z-10 mt-8 grid grid-cols-2 gap-3 lg:absolute lg:right-12 lg:top-1/2 lg:mt-0 lg:flex lg:-translate-y-1/2 lg:flex-col">
                        <div className="w-full rounded-2xl border border-[#3d5100] bg-[#1d2905] px-3 py-5 text-center sm:px-5 sm:py-6 lg:w-40">
                            <p className="text-2xl font-bold text-[#c6ff00] sm:text-3xl">
                                20
                            </p>
                            <p className="text-xs text-[#777]">
                                Products Available
                            </p>
                        </div>

                        <div className="w-full rounded-2xl border border-[#888] px-3 py-5 text-center sm:px-5 lg:w-40">
                            <p className="text-xl font-bold sm:text-2xl">
                                Free
                            </p>
                            <p className="text-xs text-[#777]">
                                Delivery on ₹999+
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        icon={<Package />}
                        value={totalItems}
                        title="Cart Items"
                        subtitle="In your bag"
                        iconStyle="bg-[#1c2900] text-[#c6ff00]"
                    />

                    <StatCard
                        icon={<TrendingUp />}
                        value={totaValue}
                        title="Cart Value"
                        subtitle="Ready to checkout"
                        iconStyle="bg-[#071525] text-blue-400"
                    />

                    <StatCard
                        icon={<Star />}
                        value="5"
                        title="Top Products"
                        subtitle="Highly rated"
                        iconStyle="bg-[#2b2005] text-yellow-400"
                    />

                    <StatCard
                        icon={<Tag />}
                        value="4"
                        title="Categories"
                        subtitle="To explore"
                        iconStyle="bg-[#24112e] text-purple-400"
                    />
                </section>

                <CategorySection />

                <ProductShowcase
                    topRated={topRated}
                    newArrivals={arrivals}
                />

                {/* Features */}
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard
                        icon={<Zap />}
                        title="Fast Delivery"
                        subtitle="Same-day on select items"
                    />

                    <FeatureCard
                        icon={<Shield />}
                        title="Secure Payments"
                        subtitle="100% encrypted checkout"
                    />

                    <FeatureCard
                        icon={<Tag />}
                        title="Best Prices"
                        subtitle="Price-match guarantee"
                    />
                </section>

            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

const StatCard = ({
    icon,
    value,
    title,
    subtitle,
    iconStyle,
}) => {
    return (
        <div className="flex items-center gap-4 rounded-[22px] border border-[#888] p-4 sm:p-5 lg:p-6">
            <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl [&>svg]:h-6 [&>svg]:w-6 ${iconStyle}`}
            >
                {icon}
            </div>

            <div>
                <p className="text-xl font-bold">
                    {value}
                </p>
                <p className="text-sm text-[#aaa]">
                    {title}
                </p>
                <p className="text-xs text-[#555]">
                    {subtitle}
                </p>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, subtitle }) => {
    return (
        <div className="flex items-center gap-4 rounded-2xl border border-[#888] px-4 py-4 sm:px-6 sm:py-5">
            <div className="text-[#c6ff00] [&>svg]:h-6 [&>svg]:w-6">
                {icon}
            </div>

            <div>
                <p className="text-sm font-bold">
                    {title}
                </p>
                <p className="text-xs text-[#666]">
                    {subtitle}
                </p>
            </div>
        </div>
    );
};

export default Home;