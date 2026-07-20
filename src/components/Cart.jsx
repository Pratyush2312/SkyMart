import {
    ShoppingBag,
    PackageOpen,
    X,
    ArrowRight,
} from "lucide-react";

import { useContext } from "react";
import { MyStore } from "../context/MyContext";
import CartItem from "./CartItem";
import toast from "react-hot-toast";
const Cart = () => {
    const { setIsCartOpen, cart, setCart } = useContext(MyStore);

    const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    const clearCart = () => {
        localStorage.setItem("sm_cart", JSON.stringify([]));
        setCart([]);
    }

    const handleCheckOut = () => {
        localStorage.setItem("sm_cart", JSON.stringify([]));
        setCart([]);
        toast.success("Order Placed!(Demo)")
    }

    return (
        <>
            {/* Overlay */}
            <div
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 z-40 bg-black/60"
            ></div>

            {/* Cart Drawer */}
            <aside className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-[400px] flex-col border-l border-[#292929] bg-[#101110] text-white shadow-2xl">

                {/* ==================== HEADER ==================== */}
                <div className="flex h-[88px] shrink-0 items-center justify-between border-b border-[#555] px-6">

                    <div className="flex items-center gap-3">
                        <ShoppingBag
                            size={23}
                            strokeWidth={2}
                            className="text-[#c6ff00]"
                        />

                        <h2 className="text-xl font-bold">
                            Cart
                        </h2>

                        {/* Cart Count */}
                        {cart.length > 0 && (
                            <span className="rounded-full bg-[#263500] px-3 py-1 text-xs font-semibold text-[#c6ff00]">
                                {cart.length} {cart.length === 1 ? "item" : "items"}
                            </span>
                        )}
                    </div>

                    {/* Close */}
                    <button
                        onClick={() => setIsCartOpen(false)}
                        type="button"
                        className="cursor-pointer text-[#777] transition hover:text-white"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* ==================== EMPTY CART ==================== */}

                {cart.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center px-6 pb-16">

                        <div className="flex flex-col items-center text-center">

                            {/* Icon */}
                            <div className="flex h-[90px] w-[90px] items-center justify-center rounded-[26px] border border-[#333] bg-[#1b1b1b]">
                                <PackageOpen
                                    size={42}
                                    strokeWidth={1.6}
                                    className="text-[#555]"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="mt-6 text-xl font-semibold text-[#ddd]">
                                Cart is empty
                            </h3>

                            {/* Subtitle */}
                            <p className="mt-2 text-sm text-[#666]">
                                Go shop something cool!
                            </p>

                            {/* Browse Products */}
                            <button
                                onClick={() => setIsCartOpen(false)}
                                type="button"
                                className="mt-7 cursor-pointer rounded-[16px] bg-[#c6ff00] px-7 py-3 text-sm font-bold text-black transition hover:bg-[#b5eb00] active:scale-[0.98]"
                            >
                                Browse Products
                            </button>

                        </div>
                    </div>
                ) : (
                    <>

                        {/* ==================== CART ITEMS ==================== */}

                        <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
                            {cart.map((item) => (

                                <CartItem
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </div>


                        {/* ==================== CART FOOTER ==================== */}

                        <div className="shrink-0 border-t border-[#555] bg-[#101110] px-6 py-5">

                            {/* Total */}
                            <div className="flex items-center justify-between">
                                <span className="text-base text-[#999]">
                                    Total
                                </span>

                                <span className="text-2xl font-bold text-white">
                                    ${total.toFixed(2)}
                                </span>
                            </div>

                            {/* Checkout */}
                            <button
                                onClick={handleCheckOut}
                                type="button"
                                className="mt-5 flex h-[54px] w-full cursor-pointer items-center justify-center gap-3 rounded-[17px] bg-[#c6ff00] text-base font-bold text-black transition hover:bg-[#b5eb00] active:scale-[0.99]"
                            >
                                Checkout
                                <ArrowRight size={19} />
                            </button>

                            {/* Clear Cart */}
                            <button
                                onClick={clearCart}
                                type="button"
                                className="mt-4 w-full cursor-pointer text-center text-xs text-[#666] transition hover:text-red-400"
                            >
                                Clear cart
                            </button>

                        </div>
                    </>
                )}
            </aside>
        </>
    );
};

export default Cart;