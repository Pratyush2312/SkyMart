import {
  Box,
  Users,
  Star,
  Truck,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from './../components/Footer';

const About = () => {
  const navigate = useNavigate();
  const stats = [
    {
      icon: Box,
      value: "20K+",
      label: "Products",
    },
    {
      icon: Users,
      value: "50K+",
      label: "Happy Customers",
    },
    {
      icon: Star,
      value: "4.9",
      label: "Avg. Rating",
    },
    {
      icon: Truck,
      value: "99%",
      label: "On-time Delivery",
    },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: "Trust",
      description:
        "Every product is verified for quality and authenticity before listing.",
    },
    {
      icon: Truck,
      title: "Speed",
      description:
        "We obsess over delivery times so your orders arrive when promised.",
    },
    {
      icon: HeartHandshake,
      title: "Community",
      description:
        "Built around real customer feedback, not just business metrics.",
    },
    {
      icon: Star,
      title: "Quality",
      description:
        "We curate the best — no filler, no junk, just great products.",
    },
  ];

  

  return (
    <main className="min-h-screen bg-[#090a09] text-white">
      <Navbar/>
      <div className="mx-auto w-full max-w-[1100px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">

        {/* Hero */}
        <section className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#c6ff00] text-black sm:h-20 sm:w-20">
            <Zap
              size={36}
              strokeWidth={3}
              fill="currentColor"
              className="sm:h-10 sm:w-10"
            />
          </div>

          <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl">
            About{" "}
            <span className="text-[#c6ff00]">
              SkyMart
            </span>
          </h1>

          <p className="mt-5 max-w-[650px] text-sm leading-7 text-[#777] sm:text-base">
            SkyMart is a next-generation e-commerce platform built to make
            online shopping fast, fair, and enjoyable — for everyone.
          </p>
        </section>

        {/* Stats */}
        <section className="mt-14 grid grid-cols-2 gap-4 lg:mt-20 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex min-h-[140px] flex-col items-center justify-center rounded-[18px] border border-[#777] bg-[#101110] px-4 text-center transition hover:border-[#c6ff00]"
            >
              <Icon
                size={23}
                strokeWidth={2}
                className="text-[#c6ff00]"
              />

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                {value}
              </h2>

              <p className="mt-1 text-xs text-[#777] sm:text-sm">
                {label}
              </p>
            </div>
          ))}
        </section>

        {/* Our Story */}
        <section className="mt-14 rounded-[24px] border border-[#888] bg-[#101110] p-6 sm:p-8 lg:mt-16 lg:p-10">
          <h2 className="text-2xl font-bold">
            Our Story
          </h2>

          <div className="mt-5 space-y-5 text-sm leading-7 text-[#999]">
            <p>
              SkyMart started in 2022 as a small side project — two engineers
              tired of bloated, slow e-commerce experiences. We asked
              ourselves: what if shopping online was actually{" "}
              <span className="italic text-white">
                enjoyable?
              </span>
            </p>

            <p>
              Three years later, SkyMart serves over 50,000 customers across
              the country. We stock electronics, fashion, jewelry, and everyday
              essentials — all at prices that don't require a second mortgage.
            </p>

            <p>
              We're still the same team at heart: obsessed with speed,
              transparency, and making you feel good about every purchase you
              make here.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mt-14 lg:mt-16">
          <h2 className="text-center text-2xl font-bold">
            What We Stand For
          </h2>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-start gap-5 rounded-[18px] border border-[#777] bg-[#101110] p-6 transition hover:border-[#c6ff00]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#c6ff00]/10">
                  <Icon
                    size={22}
                    className="text-[#c6ff00]"
                  />
                </div>

                <div>
                  <h3 className="text-base font-bold sm:text-lg">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#777]">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14 rounded-[24px] border border-[#c6ff00]/20 bg-[#101110] px-5 py-10 text-center sm:px-10 lg:mt-16">
          <h2 className="text-2xl font-bold">
            Ready to shop?
          </h2>

          <p className="mt-3 text-sm text-[#777]">
            Explore thousands of products at unbeatable prices.
          </p>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="mt-7 inline-flex cursor-pointer items-center gap-3 rounded-xl bg-[#c6ff00] px-7 py-3 font-semibold text-black transition hover:bg-[#b5eb00] active:scale-95"
          >
            Browse Products
            <ArrowRight size={18} />
          </button>
        </section>

      </div>
      <Footer/>
    </main>
  );
};

export default About;