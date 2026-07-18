import {React, useContext, useState} from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { MyStore } from './../context/MyContext';
import { nanoid } from "nanoid";
import{
    Zap,
    UserRound,
    Mail,
    LockKeyhole,
    Eye,
    ArrowRight,
} from "lucide-react";

const Register = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const { users, setUsers } = useContext(MyStore);

    const [formData, setFormData] = useState({})

    const formSubmit = (data) => {
        if (users.find(user => user.email === data.email)) {
            alert("User already registered");
            return;
        }
        let id = nanoid(7);
        let updatedFormData = { ...data, id };
        let updatedData = [...users, updatedFormData];
        setFormData(updatedFormData);
        setUsers(updatedData);
        localStorage.setItem('sm_users', JSON.stringify(updatedData));
        localStorage.setItem('sm_session', JSON.stringify(updatedFormData));
    }

    const [showPassword, setShowPassword] = useState(false);

    const password = watch("password");

    return (
        <main className="min-h-screen bg-[#090a09] text-white flex flex-col items-center justify-center">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-9">
                <div className="w-11 h-11 rounded-xl bg-[#c6ff00] flex items-center justify-center">
                    <Zap
                        size={23}
                        className="text-black fill-black"
                        strokeWidth={3}
                    />
                </div>

                <h1 className="text-2xl font-bold tracking-tight">
                    Sky<span className="text-[#c6ff00]">Mart</span>
                </h1>
            </div>

            {/* Signup Card */}
            <div className="w-full max-w-[520px] rounded-[28px] border border-[#292929] bg-[#101110] px-10 py-10 shadow-[0_30px_60px_rgba(0,0,0,0.45)]">

                {/* Heading */}
                <h2 className="text-[32px] font-bold leading-tight">
                    Create account
                </h2>

                <p className="text-[#777] mt-2 mb-10 text-base">
                    Join SkyMart and start shopping
                </p>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit(formSubmit)}>

                    {/* Full Name */}
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
                            className="w-full h-[58px] rounded-2xl border border-[#373737] bg-[#1c1d1c] pl-12 pr-4 text-white placeholder:text-[#666] outline-none transition focus:border-[#c6ff00]"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
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
                            className="w-full h-[58px] rounded-2xl border border-[#373737] bg-[#1c1d1c] pl-12 pr-4 text-white placeholder:text-[#666] outline-none transition focus:border-[#c6ff00]"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
                                    message:"Password must be atleast 6 characters"
                                }
                            })}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password (min 6 chars)"
                            className="w-full h-[58px] rounded-2xl border border-[#373737] bg-[#1c1d1c] pl-12 pr-12 text-white placeholder:text-[#666] outline-none transition focus:border-[#c6ff00]"
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition"
                        >
                            <Eye size={20} />
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <LockKeyhole
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]"
                        />

                        <input
                            {...register('confirmPassword', {
                                required: "Confirm your password",
                                validate:(value)=> value===password||"Password doesn't match"
                            })}
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            className="w-full h-[58px] rounded-2xl border border-[#373737] bg-[#1c1d1c] pl-12 pr-4 text-white placeholder:text-[#666] outline-none transition focus:border-[#c6ff00]"
                        />
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* Create Account Button */}
                    <button
                        type="submit"
                        className="group w-full h-[62px] rounded-2xl bg-[#c6ff00] text-black font-bold text-lg flex items-center justify-center gap-3 transition hover:bg-[#b5eb00] active:scale-[0.99]"
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
                <p className="text-center text-[#666] mt-8">
                    Already have an account?{" "}
                    <button onClick={() => { navigate('/login') }} className="text-[#c6ff00] font-bold hover:underline">
                        Sign in
                    </button>
                </p>
            </div>
        </main>
    );
};

export default Register;