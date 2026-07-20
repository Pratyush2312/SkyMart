import { Star, Zap, ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { MyStore } from './../context/MyContext';
import { useContext } from "react";
import Cart from './Cart';
const ProductShowcase = ({ topRated = [], newArrivals = [] }) => {

    
    return (
        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Top Rated */}
            <ProductPanel
                title="Top Rated"
                icon={
                    <Star
                        size={21}
                        className="fill-yellow-400 text-yellow-400"
                    />
                }
                products={topRated}
            />

            {/* New Arrivals */}
            <ProductPanel
                title="New Arrivals"
                icon={
                    <Zap
                        size={21}
                        className="fill-[#c6ff00] text-[#c6ff00]"
                    />
                }
                products={newArrivals}
            />
        </section>
    );
};

const ProductPanel = ({ title, icon, products }) => {
    const navigate = useNavigate();
    const { addToCart, isCartOpen, setIsCartOpen } = useContext(MyStore);
    return (
        <div className="rounded-[28px] bg-[#1c1c1c] p-7 text-black">
            {isCartOpen && <Cart />}
            {/* Header */}
            <div className="mb-7 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {icon}

                    <h2 className="text-[22px] font-bold text-white">
                        {title}
                    </h2>
                </div>

                <button onClick={()=>{navigate('/products')}} className="flex items-center gap-1 text-sm font-medium text-[#aee500] transition hover:text-[#8fbd00]">
                    See all
                    <ArrowRight size={15} />
                </button>
            </div>

            {/* Product List */}
            <div className="space-y-3">
                {products.slice(0, 5).map((product) => (
                    <div
                        key={product.id}
                        className="flex h-[92px] items-center justify-between rounded-[20px] border border-[#dedede] px-6"
                    >
                        {/* Product */}
                        <div className="flex items-center gap-6">
                            <div onClick={()=>{navigate(`/products/${product.id}`)}} className="flex h-12 w-12 shrink-0 items-center justify-center">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-full w-full object-contain"
                                />
                            </div>

                            <p className="text-base font-semibold text-[#aee500]">
                                ${product.price}
                            </p>
                        </div>

                        {/* Add To Cart */}
                        <button onClick={() => {
                            addToCart(product)
                            setIsCartOpen(prev=>!prev)
                        }}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4ffda] text-[#b9f000] transition hover:bg-[#eaffb7]">
                            <ShoppingBag size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductShowcase;