import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
    Zap,
    Mail,
    LockKeyhole,
    Eye,
    EyeOff,
    ArrowRight,
} from "lucide-react";
import { MyStore } from "../context/MyContext";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { users } = useContext(MyStore);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    const handleLogin = (data) => {
        let user = users.find(u => u.email === data.email);
        if (user) {
            if (user.password === data.password) {
                console.log('True');
                navigate('/home');
                
            }
        }

    }


    return (
        <main className="min-h-screen bg-[#090a09] text-white flex overflow-hidden">
            {/* ================= LEFT SECTION ================= */}
            <section className="relative w-1/2 min-h-screen border-r border-white/60 px-14 py-14 flex flex-col">

                {/* Subtle green background glow */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_45%,rgba(190,255,0,0.08),transparent_35%)]" />

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#c6ff00] flex items-center justify-center">
                        <Zap
                            size={25}
                            className="text-black fill-black"
                            strokeWidth={3}
                        />
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight">
                        Sky<span className="text-[#c6ff00]">Mart</span>
                    </h1>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex-1 flex flex-col justify-center -mt-10">
                    <p className="text-[#c6ff00] text-base font-bold tracking-wider mb-7">
                        WELCOME BACK
                    </p>

                    <h2 className="text-[54px] leading-[1.25] font-bold tracking-tight">
                        Shop the future.
                        <br />
                        <span className="text-[#c6ff00]">Today.</span>
                    </h2>

                    <p className="mt-8 text-[#777] text-lg leading-8 max-w-[480px]">
                        Thousands of products, lightning-fast delivery, and
                        <br />
                        prices that make your wallet happy.
                    </p>

                    {/* Stats */}
                    <div className="mt-14 grid grid-cols-3 gap-4 max-w-[780px]">
                        <StatCard value="20K+" label="Products" />
                        <StatCard value="50K+" label="Users" />
                        <StatCard value="4.9★" label="Rating" />
                    </div>
                </div>
            </section>

            {/* ================= RIGHT SECTION ================= */}
            <section className="w-1/2 min-h-screen flex items-center justify-center px-8">
                <div className="w-full max-w-[525px] rounded-[28px] border border-[#292929] bg-[#101110] px-10 py-11 shadow-[0_30px_60px_rgba(0,0,0,0.45)]">

                    {/* Heading */}
                    <h2 className="text-[32px] font-bold leading-tight">Sign in</h2>

                    <p className="text-[#777] mt-2 mb-10 text-base">
                        Enter your credentials to continue
                    </p>

                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
                        {/* Email */}
                        <div className="relative">
                            <Mail
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]"
                            />

                            <input
                                {...register('email', {
                                    required: "Name is required",
                                    pattern: {
                                        value: /^\S.*$/,
                                        message: "Blank spaces is not allowed",
                                    },
                                })}
                                type="email"
                                placeholder="Email address"
                                className="w-full h-[58px] rounded-2xl border border-[#373737] bg-[#1c1d1c] pl-12 pr-4 text-white placeholder:text-[#666] outline-none transition focus:border-[#c6ff00]"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <LockKeyhole
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]"
                            />

                            <input
                                {...register('password', {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be atleast 6 characters"
                                    }
                                })}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full h-[58px] rounded-2xl border border-[#373737] bg-[#1c1d1c] pl-12 pr-12 text-white placeholder:text-[#666] outline-none transition focus:border-[#c6ff00]"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="group w-full h-[62px] rounded-2xl bg-[#c6ff00] text-black font-bold text-lg flex items-center justify-center gap-3 transition hover:bg-[#b5eb00] active:scale-[0.99]"
                        >
                            Sign in
                            <ArrowRight
                                size={21}
                                strokeWidth={2.5}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </button>
                    </form>

                    {/* Create Account */}
                    <p className="text-center text-[#666] mt-8">
                        Don't have an account?{" "}
                        <button onClick={() => { navigate('/register') }} className="text-[#c6ff00] font-bold hover:underline">
                            Create one
                        </button>
                    </p>
                </div>
            </section>
        </main>
    );
};

const StatCard = ({ value, label }) => {
    return (
        <div className="h-[95px] rounded-[20px] border border-[#cfcfcf] bg-[#101110]/80 flex flex-col items-center justify-center">
            <p className="text-[#c6ff00] text-2xl font-bold">{value}</p>
            <p className="text-[#777] text-sm mt-1">{label}</p>
        </div>
    );
};

export default Login;