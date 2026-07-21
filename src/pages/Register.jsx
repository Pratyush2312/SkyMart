import { React, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { MyStore } from './../context/MyContext';
import { nanoid } from "nanoid";
import {
    Zap,
    UserRound,
    Mail,
    LockKeyhole,
    Eye,
    ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";

const Register = () => {
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const { users, setUsers } = useContext(MyStore);

    const [formData, setFormData] = useState({});

    const formSubmit = (data) => {
        if (users.find(user => user.email === data.email)) {
            toast.error("User already registered. Please Sign in");
            return;
        }

        let id = nanoid(7);

        const { confirmPassword, ...userData } = data;

        let updatedFormData = {
            ...userData,
            id
        };

        let updatedData = [...users, updatedFormData];

        setFormData(updatedFormData);
        setUsers(updatedData);

        localStorage.setItem(
            'sm_users',
            JSON.stringify(updatedData)
        );

        localStorage.setItem(
            'sm_session',
            JSON.stringify(updatedFormData)
        );

        toast.success("User Registered");

        navigate('/home');
    };


    const password = watch("password");

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#090a09] px-4 py-8 text-white sm:px-6 sm:py-10">

            {/* Logo */}
            <div className="mb-6 flex items-center gap-3 sm:mb-8 lg:mb-9">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c6ff00] sm:h-11 sm:w-11">
                    <Zap
                        size={23}
                        className="fill-black text-black"
                        strokeWidth={3}
                    />
                </div>

                <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                    Sky
                    <span className="text-[#c6ff00]">
                        Mart
                    </span>
                </h1>

            </div>


            {/* Signup Card */}
            <div className="w-full max-w-[520px] rounded-[22px] border border-[#292929] bg-[#101110] px-5 py-7 shadow-[0_30px_60px_rgba(0,0,0,0.45)] sm:rounded-[28px] sm:px-8 sm:py-9 lg:px-10 lg:py-10">

                {/* Heading */}
                <h2 className="text-2xl font-bold leading-tight sm:text-[32px]">
                    Create account
                </h2>

                <p className="mb-7 mt-2 text-sm text-[#777] sm:mb-10 sm:text-base">
                    Join SkyMart and start shopping
                </p>


                {/* Form */}
                <form
                    className="space-y-4 sm:space-y-5"
                    onSubmit={handleSubmit(formSubmit)}
                >

                    {/* Full Name */}
                    <div>
                        <div className="relative">

                            <UserRound
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]"
                            />

                            <input
                                {...register('name', {
                                    required: "Name is required",
                                    pattern: {
                                        value: /^\S.*$/,
                                        message: "Blank spaces is not allowed",
                                    },
                                })}
                                type="text"
                                placeholder="Full name"
                                className="h-[54px] w-full rounded-2xl border border-[#373737] bg-[#1c1d1c] pl-12 pr-4 text-sm text-white placeholder:text-[#666] outline-none transition focus:border-[#c6ff00] sm:h-[58px] sm:text-base"
                            />

                        </div>

                        {errors.name && (
                            <p className="mt-1 text-xs text-red-500 sm:text-sm">
                                {errors.name.message}
                            </p>
                        )}
                    </div>


                    {/* Email */}
                    <div>
                        <div className="relative">

                            <Mail
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]"
                            />

                            <input
                                {...register('email', {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter valid email",
                                    },
                                })}
                                type="email"
                                placeholder="Email address"
                                className="h-[54px] w-full rounded-2xl border border-[#373737] bg-[#1c1d1c] pl-12 pr-4 text-sm text-white placeholder:text-[#666] outline-none transition focus:border-[#c6ff00] sm:h-[58px] sm:text-base"
                            />

                        </div>

                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500 sm:text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>


                    {/* Password */}
                    <div>
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
                                placeholder="Password (min 6 chars)"
                                className="h-[54px] w-full rounded-2xl border border-[#373737] bg-[#1c1d1c] pl-12 pr-12 text-sm text-white placeholder:text-[#666] outline-none transition focus:border-[#c6ff00] sm:h-[58px] sm:text-base"
                            />

                            <button
                                onClick={()=>{setShowPassword(prev=>!prev)}}
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666] transition hover:text-white"
                            >
                                <Eye size={20} />
                            </button>

                        </div>

                        {errors.password && (
                            <p className="mt-1 text-xs text-red-500 sm:text-sm">
                                {errors.password.message}
                            </p>
                        )}
                    </div>


                    {/* Confirm Password */}
                    <div>
                        <div className="relative">

                            <LockKeyhole
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]"
                            />

                            <input
                                {...register('confirmPassword', {
                                    required: "Confirm your password",
                                    validate: (value) =>
                                        value === password ||
                                        "Password doesn't match"
                                })}
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                className="h-[54px] w-full rounded-2xl border border-[#373737] bg-[#1c1d1c] pl-12 pr-4 text-sm text-white placeholder:text-[#666] outline-none transition focus:border-[#c6ff00] sm:h-[58px] sm:text-base"
                            />

                        </div>

                        {errors.confirmPassword && (
                            <p className="mt-1 text-xs text-red-500 sm:text-sm">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>


                    {/* Create Account Button */}
                    <button
                        type="submit"
                        className="group flex h-[56px] w-full items-center justify-center gap-3 rounded-2xl bg-[#c6ff00] text-base font-bold text-black transition hover:bg-[#b5eb00] active:scale-[0.99] sm:h-[62px] sm:text-lg"
                    >
                        Create Account

                        <ArrowRight
                            size={21}
                            strokeWidth={2.5}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </button>

                </form>

                {/* Sign In */}
                <p className="mt-6 text-center text-sm text-[#666] sm:mt-8 sm:text-base">
                    Already have an account?{" "}
                    <button
                        onClick={() => {
                            navigate('/')
                        }}
                        className="font-bold text-[#c6ff00] hover:underline"
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </main>
    );
};

export default Register;