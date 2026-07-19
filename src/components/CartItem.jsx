import { Minus, Plus, Trash2 } from "lucide-react";
import { useContext } from "react";
import { MyStore } from './../context/MyContext';

const CartItem = ({ item }) => {
    const quantity = item.quantity || 1;

    const { cart, setCart } = useContext(MyStore);

    const increaseQuantity = (item) => {
        let updatedCart = cart.map(c => c.id === item.id ? { ...item, quantity: item.quantity + 1 } : item)
        localStorage.setItem("sm_cart", JSON.stringify(updatedCart));
        setCart(updatedCart);

    };

    const decreaseQuantity = (item) => {
        let updatedCart;
        if (item.quantity === 1) {
            updatedCart = cart.filter(c => c.id !== item.id);
        }
        else {
            updatedCart = cart.map(c => c.id === item.id ? { ...item, quantity: item.quantity - 1 } : item);
        }

        localStorage.setItem("sm_cart", JSON.stringify(updatedCart));
        setCart(updatedCart);

    };

    return (
        <div className="flex w-full items-center gap-4 rounded-[18px] border border-[#aaa] bg-[#101110] p-3 text-white">

            {/* Product Image */}
            <div className="flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-[13px] bg-[#fafafa] p-2">
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-contain"
                />
            </div>

            {/* Product Information */}
            <div className="min-w-0 flex-1">

                {/* Title */}
                <h3 className="truncate text-[15px] font-medium text-[#d4d4d4]">
                    {item.title}
                </h3>

                {/* Total Price */}
                <p className="mt-1 text-[19px] font-bold leading-tight text-[#c6ff00]">
                    ${(item.price * quantity).toFixed(2)}
                </p>

                {/* Price Each */}
                <p className="mt-0.5 text-xs text-[#555]">
                    ${item.price} each
                </p>

                {/* Quantity Controls */}
                <div className="mt-3 flex items-center gap-3">
                    <button
                        onClick={() => decreaseQuantity(item)}
                        type="button"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[9px] border border-[#333] text-[#999] transition hover:border-[#c6ff00] hover:text-[#c6ff00]"
                    >
                        <Minus size={14} />
                    </button>

                    <span className="min-w-3 text-center text-sm font-semibold">
                        {quantity}
                    </span>

                    <button
                        onClick={() => increaseQuantity(item)}
                        type="button"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[9px] border border-[#333] text-[#999] transition hover:border-[#c6ff00] hover:text-[#c6ff00]"
                    >
                        <Plus size={14} />
                    </button>
                </div>
            </div>

            {/* Remove Button */}
            <button
                // onClick={removeFromCart}
                type="button"
                className="self-end pb-2 text-red-500/70 transition hover:text-red-500"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
};

export default CartItem;