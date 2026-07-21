import {
    ArrowLeft,
    ArrowRight,
    Heart,
    ShoppingCart,
    Check,
    Star,
    Truck,
    ShieldCheck,
    RotateCcw,
} from "lucide-react";
import { RelatedProductCard } from "../components/RelatedProductCard";
import { useParams, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { MyStore } from './../context/MyContext';
import axios from "axios";
import Footer from './../components/Footer';
import Navbar from './../components/Navbar';


const ProductDetails = () => {
    const { products, setIsCartOpen, cart, addToCart } = useContext(MyStore);
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id);
    const [favourite, setFavourite] = useState(false)
    const fetchProductDetails = async (id) => {
        const response = await axios(`https://fakestoreapi.com/products/${id}`)
        setProduct(response.data);

    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        setFavourite(false);
        fetchProductDetails(id);
    }, [id])

    const isInCart = (product) => {
        return cart.some((c) => c.id === product.id);
    }
    const navigate = useNavigate();

    const handleNext = (id) => {
        let newId = id + 1;
        navigate(`/products/${newId}`);
    }
    const handlePrev = (id) => {
        let newId = id - 1;
        navigate(`/products/${newId}`);
    }

    return (
        <main className="min-h-screen bg-[#090a09] text-white">
            <Navbar />
            <div className="mx-auto w-full max-w-[1280px] px-6 py-10">

                {/* Breadcrumb */}
                <div className="mb-10 flex items-center gap-3 text-sm text-[#666]">
                    <ArrowLeft size={15} onClick={() => navigate('/products')} className="cursor-pointer hover:text-white" />

                    <span onClick={() => navigate('/products')} className="cursor-pointer hover:text-white">Products</span>
                    <span>/</span>

                    <span className="capitalize">
                        {product?.category}
                    </span>

                    <span>/</span>

                    <span className="text-[#aaa]">
                        {product?.title}
                    </span>
                </div>

                {/* Product Details */}
                <section className="grid grid-cols-1 gap-16 lg:grid-cols-2">

                    {/* Product Image */}
                    <div className="flex h-[570px] items-center justify-center rounded-[28px] bg-[#fafafa] p-14">
                        <img
                            src={product?.image}
                            alt={product?.title}
                            className="h-full w-full object-contain"
                        />
                    </div>

                    {/* Product Information */}
                    <div className="flex flex-col justify-center">

                        {/* Category */}
                        <span className="mb-5 w-fit rounded-full border border-[#405400] bg-[#1b2600] px-4 py-1 text-xs font-semibold capitalize text-[#c6ff00]">
                            {product?.category}
                        </span>

                        {/* Title */}
                        <h1 className="text-4xl font-bold leading-tight">
                            {product?.title}
                        </h1>

                        {/* Rating */}
                        <div className="mt-5 flex items-center gap-3">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={18}
                                        className={
                                            star <= Math.round(product?.rating?.rate || 0)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "fill-[#333] text-[#555]"
                                        }
                                    />
                                ))}
                            </div>

                            <span className="font-semibold">
                                {product?.rating?.rate}
                            </span>

                            <span className="text-sm text-[#666]">
                                ({product?.rating?.count} reviews)
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="my-7 h-px bg-[#777]" />

                        {/* Price */}
                        <h2 className="text-4xl font-bold text-[#c6ff00]">
                            ${product?.price}
                        </h2>

                        <div className="my-7 h-px bg-[#777]" />

                        {/* Description */}
                        <p className="text-sm leading-6 text-[#999]">
                            {product?.description}
                        </p>

                        {/* Add To Cart */}
                        <div className="mt-7 flex gap-3">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsCartOpen(prev => !prev)
                                    addToCart(product)
                                }} className={`flex h-[58px] flex-1 items-center justify-center gap-3 rounded-2xl ${isInCart(product) ? 'bg-[#759600]' : 'bg-[#c6ff00]'} font-semibold text-black transition hover:bg-[#b5eb00]`}>
                                {isInCart(product) ? <Check size={17} /> : <ShoppingCart size={17} />}
                                {isInCart(product) ? "Added to Cart" : "Add"}
                            </button>

                            <button
                                onClick={() => setFavourite(prev => !prev)}
                                className={`flex h-[58px] w-[58px] items-center justify-center rounded-2xl border-2 transition
                                ${favourite
                                        ? "border-[#692424] bg-[#2F1515] text-[#F87171]"
                                        : "border-[#333] text-[#777] hover:border-[#5B1C1C] hover:text-[#F87171]"
                                    }`}
                            >
                                <Heart
                                    size={21}
                                    className={favourite ? "fill-current" : ""}
                                />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="mt-7 grid grid-cols-3 gap-3">
                            <FeatureBox
                                icon={<Truck />}
                                title="Free Delivery"
                                subtitle="On orders $50+"
                            />

                            <FeatureBox
                                icon={<ShieldCheck />}
                                title="Secure Pay"
                                subtitle="256-bit SSL"
                            />

                            <FeatureBox
                                icon={<RotateCcw />}
                                title="Easy Returns"
                                subtitle="30-day policy"
                            />
                        </div>

                        {/* Previous / Next */}
                        <div className="mt-10 flex gap-4">
                            {Number(id) > 1 && (
                                <button
                                    onClick={()=>{handlePrev(product.id)}}
                                    className={`flex items-center justify-center gap-2 rounded-2xl border border-[#444] bg-[#2A2A2A] py-4 text-lg font-semibold transition hover:bg-[#333]
                                        ${Number(id) < 20 ? "flex-1" : "w-full"}`}
                                >
                                    <ArrowLeft size={18} />
                                    Previous
                                </button>
                            )}

                            {Number(id) < 20 && (
                                <button
                                    onClick={()=>{handleNext(product.id)}}
                                    className={`flex items-center justify-center gap-2 rounded-2xl bg-[#c6ff00] py-4 text-lg font-semibold text-black transition hover:bg-[#b5eb00]
                                        ${Number(id) > 1 ? "flex-1" : "w-full"}`}
                                >
                                    Next
                                    <ArrowRight size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* Related Products */}
                <section className="mt-24 flex flex-col gap-5">
                    <h2 className="text-2xl font-bold">
                        Related Products
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                        {relatedProducts.slice(0, 5).map((item) => (
                            <RelatedProductCard

                                key={item.id}
                                product={item}
                            />
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
};


const FeatureBox = ({ icon, title, subtitle }) => {
    return (
        <div className="flex h-[90px] flex-col items-center justify-center rounded-2xl border border-[#888]">
            <div className="mb-2 text-[#c6ff00] [&>svg]:h-5 [&>svg]:w-5">
                {icon}
            </div>

            <p className="text-xs font-semibold">
                {title}
            </p>

            <p className="mt-1 text-[10px] text-[#666]">
                {subtitle}
            </p>
        </div>
    );
};

<RelatedProductCard />

export default ProductDetails;