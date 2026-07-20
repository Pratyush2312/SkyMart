import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useContext } from 'react'
import {
    Zap,
    ShoppingCart,
    LogOut,
    Menu,
    X
} from 'lucide-react'
import { MyStore } from '../context/MyContext'


const Navbar = () => {

    const navigate = useNavigate();
    const { setIsCartOpen } = useContext(MyStore);
    const user = JSON.parse(localStorage.getItem("sm_session"));
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("sm_session");
        navigate('/');
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    return (
        <nav className="relative z-40 mx-auto max-w-[1280px] px-4 py-5 sm:px-6">

            {/* Main Navbar */}
            <div className="flex items-center justify-between">

                {/* Logo */}
                <div
                    onClick={() => navigate('/home')}
                    className="flex cursor-pointer items-center gap-2"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c6ff00]">
                        <Zap
                            size={19}
                            className="fill-black text-black"
                        />
                    </div>

                    <h1 className="text-xl font-bold">
                        Sky
                        <span className="text-[#c6ff00]">
                            Mart
                        </span>
                    </h1>
                </div>


                {/* Desktop Navigation */}
                <div className="hidden gap-8 text-sm text-[#777] md:flex">

                    <NavLink
                        to='/home'
                        className={({ isActive }) =>
                            isActive
                                ? "text-[#c6ff00]"
                                : "transition hover:text-white"
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to='/products'
                        className={({ isActive }) =>
                            isActive
                                ? "text-[#c6ff00]"
                                : "transition hover:text-white"
                        }
                    >
                        Shop
                    </NavLink>

                    <NavLink
                        to='/about'
                        className={({ isActive }) =>
                            isActive
                                ? "text-[#c6ff00]"
                                : "transition hover:text-white"
                        }
                    >
                        About
                    </NavLink>

                </div>


                {/* Desktop User Actions */}
                <div className="hidden items-center gap-2 md:flex">

                    {/* User */}
                    <div className="flex items-center gap-2 rounded-xl border border-[#292929] bg-[#121312] px-3 py-2">

                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#c6ff00] text-xs font-bold text-black">
                            {user.name.charAt(0)}
                        </div>

                        <span className="text-sm text-[#bbb]">
                            {user.name}
                        </span>

                    </div>


                    {/* Cart */}
                    <button
                        onClick={() => {
                            setIsCartOpen(prev => !prev)
                        }}
                        className="cursor-pointer rounded-xl border border-[#292929] p-2.5 text-[#777] transition hover:text-white"
                    >
                        <ShoppingCart size={18} />
                    </button>


                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer rounded-xl border border-[#292929] p-2.5 text-[#777] transition hover:border-[#7A2428] hover:bg-[#3A1517] hover:text-red-500"
                    >
                        <LogOut size={18} />
                    </button>

                </div>


                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[#292929] text-[#bbb] transition hover:text-white md:hidden"
                >
                    {isMenuOpen
                        ? <X size={21} />
                        : <Menu size={21} />
                    }
                </button>

            </div>


            {/* Mobile Menu */}
            {isMenuOpen && (

                <div className="absolute left-4 right-4 top-[75px] rounded-[20px] border border-[#292929] bg-[#101110] p-4 shadow-2xl md:hidden">

                    {/* User */}
                    <div className="mb-4 flex items-center gap-3 rounded-xl border border-[#292929] bg-[#121312] p-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#c6ff00] text-sm font-bold text-black">
                            P
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-white">
                                Pratyush
                            </p>

                            <p className="text-xs text-[#666]">
                                Welcome back
                            </p>
                        </div>

                    </div>


                    {/* Navigation Links */}
                    <div className="flex flex-col gap-1">

                        <NavLink
                            to='/home'
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                `rounded-xl px-4 py-3 text-sm transition ${isActive
                                    ? "bg-[#c6ff00]/10 text-[#c6ff00]"
                                    : "text-[#888] hover:bg-[#191a19] hover:text-white"
                                }`
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to='/products'
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                `rounded-xl px-4 py-3 text-sm transition ${isActive
                                    ? "bg-[#c6ff00]/10 text-[#c6ff00]"
                                    : "text-[#888] hover:bg-[#191a19] hover:text-white"
                                }`
                            }
                        >
                            Shop
                        </NavLink>

                        <NavLink
                            to='/about'
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                `rounded-xl px-4 py-3 text-sm transition ${isActive
                                    ? "bg-[#c6ff00]/10 text-[#c6ff00]"
                                    : "text-[#888] hover:bg-[#191a19] hover:text-white"
                                }`
                            }
                        >
                            About
                        </NavLink>

                    </div>


                    {/* Divider */}
                    <div className="my-3 h-px bg-[#292929]" />


                    {/* Mobile Actions */}
                    <div className="flex gap-2">

                        {/* Cart */}
                        <button
                            onClick={() => {
                                setIsCartOpen(true);
                                setIsMenuOpen(false);
                            }}
                            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#292929] px-4 py-3 text-sm text-[#aaa] transition hover:text-white"
                        >
                            <ShoppingCart size={17} />
                            Cart
                        </button>


                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#7A2428]/50 px-4 py-3 text-sm text-red-400 transition hover:bg-[#3A1517]"
                        >
                            <LogOut size={17} />
                            Logout
                        </button>

                    </div>

                </div>

            )}

        </nav>
    )
}

export default Navbar