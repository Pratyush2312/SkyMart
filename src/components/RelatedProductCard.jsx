import { Star, ShoppingCart, Check } from 'lucide-react'
import { useContext } from 'react';
import { MyStore } from '../context/MyContext';
import Cart from './Cart';

export const RelatedProductCard = ({ product }) => {

    const { cart, addToCart, isCartOpen, setIsCartOpen } = useContext(MyStore);
    const isInCart = (product) => {
        return cart.some((c) => c.id === product.id);
    }
    return (
        <div className="group overflow-hidden rounded-[24px] border border-[#303030] bg-[#101110]">
            {isCartOpen && <Cart />}
            {/* Image */}
            <div className="relative flex h-[220px] items-center justify-center bg-[#fafafa] p-7">

                <span className="absolute left-3 top-3 rounded-full bg-[#666] px-3 py-1 text-[10px] capitalize text-white">
                    {product.category}
                </span>

                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                />
            </div>

            {/* Information */}
            <div className="p-4">

                <p className="text-xs capitalize text-[#666]">
                    {product.category}
                </p>

                <h3 className="mt-3 line-clamp-2 min-h-[40px] text-sm font-semibold">
                    {product.title}
                </h3>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-2">
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={13}
                                className={
                                    star <= Math.round(product.rating?.rate || 0)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-[#333] text-[#555]"
                                }
                            />
                        ))}
                    </div>

                    <span className="text-[10px] text-[#666]">
                        ({product.rating?.count})
                    </span>
                </div>

                <div className="my-3 h-px bg-[#555]" />

                {/* Price */}
                <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-[#c6ff00]">
                        ${product.price}
                    </p>

                    <button
                        onClick={() => {
                            setIsCartOpen(prev => !prev);
                            addToCart(product);
                        }}
                        className="flex items-center gap-1.5 rounded-xl bg-[#c6ff00] px-3 py-2 text-xs font-semibold text-black">
                        {isInCart(product) ? <Check size={14}/> : <ShoppingCart size={14} />}
                        {isInCart(product) ? "Added to Cart" : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
};