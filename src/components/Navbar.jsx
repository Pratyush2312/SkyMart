import React from 'react'
import { NavLink } from 'react-router'
import { useNavigate } from 'react-router'
import { useContext } from 'react';
import {
    Zap,
    ShoppingCart,
    LogOut
} from 'lucide-react'
import { MyStore } from '../context/MyContext';


const Navbar = () => {

    const navigate = useNavigate();
    const { setIsCartOpen } = useContext(MyStore);

    const handleLogout = () => {
        localStorage.removeItem("sm_session");
        navigate('/');
    }

    return (
        <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-5">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c6ff00]">
                    <Zap size={19} className="fill-black text-black" />
                </div>

                <h1 className="text-xl font-bold">
                    Sky<span className="text-[#c6ff00]">Mart</span>
                </h1>
            </div>

            {/* Navigation */}
            <div className="flex gap-8 text-sm text-[#777]">
                <NavLink to='/home' className="text-[#c6ff00]">
                    Home
                </NavLink>

                <NavLink to='/products' className="transition hover:text-white">
                    Shop
                </NavLink>

                <NavLink to='/about' className="transition hover:text-white">
                    About
                </NavLink>
            </div>

            {/* User */}
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-xl border border-[#292929] bg-[#121312] px-3 py-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#c6ff00] text-xs font-bold text-black">
                        P
                    </div>

                    <span className="text-sm text-[#bbb]">Pratyush</span>
                </div>

                <button onClick={() => { setIsCartOpen(prev => !prev) }} className="rounded-xl cursor-pointer border border-[#292929] p-2.5 text-[#777] transition hover:text-white">
                    <ShoppingCart size={18} />
                </button>

                <button onClick={() => handleLogout()} className="rounded-xl cursor-pointer border border-[#292929] p-2.5 text-[#777] transition hover:text-red-500 hover:bg-[#3A1517] hover:border-[#7A2428]">
                    <LogOut size={18} />
                </button>
            </div>
        </nav>
    )
}

export default Navbar
