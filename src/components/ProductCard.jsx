import { ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { MyStore } from "../context/MyContext";
const ProductCard = ({ product }) => {

    const navigate = useNavigate();
    const { addToCart, cart } = useContext(MyStore);

    const isInCart = (product) => {
        return cart.some((c) => c.id === product.id);
    }

    return (
        <div onClick={() => { navigate(`/products/${product.id}`) }} className="group overflow-hidden rounded-[24px] border border-[#303030] bg-[#101110] transition hover:border-[#c6ff00]">
            {/* Product Image Section */}
            <div className="relative flex h-[285px] items-center justify-center bg-[#fafafa] p-8">

                {/* Category Badge */}
                <span className="absolute left-4 top-4 rounded-full bg-[#666] px-3 py-1 text-xs font-medium capitalize text-white">
                    {product.category}
                </span>

                {/* Product Image */}
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                />
            </div>

            {/* Product Details */}
            <div className="p-5">
                {/* Category */}
                <p className="mb-3 text-sm capitalize text-[#666]">
                    {product.category}
                </p>

                {/* Product Title */}
                <h3 className="line-clamp-2 min-h-[48px] text-lg font-semibold leading-6 text-white">
                    {product.title}
                </h3>

                {/* Rating */}
                <div className="mt-4 flex items-center gap-1">
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={16}
                                className={
                                    star <= Math.round(product.rating?.rate)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-[#333] text-[#555]"
                                }
                            />
                        ))}
                    </div>

                    <span className="ml-1 text-xs text-[#777]">
                        ({product.rating?.count})
                    </span>
                </div>

                {/* Divider */}
                <div className="my-4 h-px bg-[#555]" />

                {/* Price + Add Button */}
                <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-[#c6ff00]">
                        ${product.price}
                    </p>

                    <button onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product)
                    }} className="flex items-center gap-2 rounded-xl bg-[#c6ff00] px-5 py-2.5 font-semibold text-black transition hover:bg-[#b5eb00] active:scale-95">
                        <ShoppingCart size={17} />
                        {isInCart(product) ? "Added to Cart" : "Add"}
                    </button>
                    



                </div>
            </div>
        </div>
    );
};

export default ProductCard;