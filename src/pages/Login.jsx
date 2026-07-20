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
import toast from "react-hot-toast";

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
                toast.success("Signed In");
                const { password, ...modifiedUser } = user;
                localStorage.setItem("sm_session", JSON.stringify(modifiedUser));
                navigate('/home');
            }
            return;
        }
        toast.error("Please register")
    }


    return (
        <main className="min-h-screen bg-[#090a09] text-white flex flex-col overflow-hidden lg:flex-row">

            {/* ================= LEFT SECTION ================= */}
            <section className="relative w-full border-b border-white/60 px-5 py-6 flex flex-col sm:px-8 sm:py-8 lg:w-1/2 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-14 lg:py-14">

                {/* Subtle green background glow */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_45%,rgba(190,255,0,0.08),transparent_35%)]" />

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#c6ff00] flex items-center justify-center sm:w-12 sm:h-12 sm:rounded-2xl">
                        <Zap
                            size={22}
                            className="text-black fill-black sm:w-[25px] sm:h-[25px]"
                            strokeWidth={3}
                        />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Sky<span className="text-[#c6ff00]">Mart</span>
                    </h1>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 mt-10 flex flex-col sm:mt-14 lg:mt-[-40px] lg:flex-1 lg:justify-center">

                    <p className="text-[#c6ff00] text-xs font-bold tracking-wider mb-4 sm:text-sm lg:text-base lg:mb-7">
                        WELCOME BACK
                    </p>

                    <h2 className="text-3xl leading-[1.2] font-bold tracking-tight sm:text-4xl lg:text-[54px] lg:leading-[1.25]">
                        Shop the future.
                        <br />
                        <span className="text-[#c6ff00]">Today.</span>
                    </h2>

                    <p className="mt-4 text-[#777] text-sm leading-6 max-w-[480px] sm:text-base lg:mt-8 lg:text-lg lg:leading-8">
                        Thousands of products, lightning-fast delivery, and
                        <br className="hidden lg:block" />
                        prices that make your wallet happy.
                    </p>

                    {/* Stats */}
                    <div className="mt-7 grid grid-cols-3 gap-2 max-w-[780px] sm:gap-4 lg:mt-14">
                        <StatCard value="20K+" label="Products" />
                        <StatCard value="50K+" label="Users" />
                        <StatCard value="4.9★" label="Rating" />
                    </div>

                </div>
            </section>


            {/* ================= RIGHT SECTION ================= */}
            <section className="w-full flex flex-1 items-center justify-center px-4 py-8 sm:px-8 sm:py-12 lg:w-1/2 lg:min-h-screen lg:py-8">

                <div className="w-full max-w-[525px] rounded-[22px] border border-[#292929] bg-[#101110] px-5 py-7 shadow-[0_30px_60px_rgba(0,0,0,0.45)] sm:rounded-[28px] sm:px-8 sm:py-9 lg:px-10 lg:py-11">

                    {/* Heading */}
                    <h2 className="text-2xl font-bold leading-tight sm:text-[32px]">
                        Sign in
                    </h2>

                    <p className="text-[#777] mt-2 mb-7 text-sm sm:mb-10 sm:text-base">
                        Enter your credentials to continue
                    </p>


                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="space-y-4 sm:space-y-5"
                    >

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
                                className="w-full h-[54px] rounded-2xl border border-[#373737] bg-[#1c1d1c] pl-12 pr-4 text-sm text-white placeholder:text-[#666] outline-none transition focus:border-[#c6ff00] sm:h-[58px] sm:text-base"
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
                                className="w-full h-[54px] rounded-2xl border border-[#373737] bg-[#1c1d1c] pl-12 pr-12 text-sm text-white placeholder:text-[#666] outline-none transition focus:border-[#c6ff00] sm:h-[58px] sm:text-base"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition"
                            >
                                {showPassword
                                    ? <EyeOff size={20} />
                                    : <Eye size={20} />
                                }
                            </button>
                        </div>


                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="group w-full h-[56px] rounded-2xl bg-[#c6ff00] text-black font-bold text-base flex items-center justify-center gap-3 transition hover:bg-[#b5eb00] active:scale-[0.99] sm:h-[62px] sm:text-lg"
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
                    <p className="text-center text-[#666] mt-6 text-sm sm:mt-8 sm:text-base">
                        Don't have an account?{" "}

                        <button
                            onClick={() => {
                                navigate('/register')
                            }}
                            className="text-[#c6ff00] font-bold hover:underline"
                        >
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
        <div className="h-[75px] rounded-[14px] border border-[#cfcfcf] bg-[#101110]/80 flex flex-col items-center justify-center sm:h-[85px] sm:rounded-[18px] lg:h-[95px] lg:rounded-[20px]">

            <p className="text-[#c6ff00] text-lg font-bold sm:text-xl lg:text-2xl">
                {value}
            </p>

            <p className="text-[#777] text-[11px] mt-1 sm:text-xs lg:text-sm">
                {label}
            </p>

        </div>
    );
};

export default Login;