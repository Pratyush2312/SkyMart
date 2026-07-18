import { Search, ChevronDown } from "lucide-react";
import Navbar from '../components/Navbar';
import { useContext, useEffect } from "react";
import { MyStore } from "../context/MyContext";
import ProductCard from "../components/ProductCard";
import Footer from './../components/Footer';

const Products = () => {

    const { products, setProducts, fetchProducts } = useContext(MyStore);

   

    return (
        <main className="min-h-screen bg-[#090a09] text-white">
            <Navbar />
            <div className="mx-auto flex flex-col gap-10 w-full max-w-[1280px] mt-10 mb-15">

                {/* Page Heading */}
                <section>
                    <h1 className="text-4xl font-bold tracking-tight">
                        All Products
                    </h1>

                    <p className="mt-2 text-base text-[#777]">
                        20 products found
                    </p>
                </section>

                {/* Search & Filters */}
                <section className="flex items-center gap-3 rounded-[20px] border border-[#aaa] p-4">

                    {/* Search */}
                    <div className="relative flex-1">
                        <Search
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]"
                        />

                        <input
                            type="text"
                            placeholder="Search products..."
                            className="h-[54px] w-full rounded-[18px] border border-[#333] bg-[#1c1d1c] pl-12 pr-5 text-sm text-white outline-none placeholder:text-[#666] transition focus:border-[#c6ff00]"
                        />
                    </div>

                    {/* Category */}
                    <div className="relative">
                        <select
                            defaultValue="all"
                            className="h-[54px] min-w-[190px] appearance-none rounded-[18px] border border-[#333] bg-[#1c1d1c] px-5 pr-12 text-sm font-medium text-white outline-none transition focus:border-[#c6ff00]"
                        >
                            <option value="all">All Categories</option>
                            <option value="electronics">Electronics</option>
                            <option value="men's clothing">Men's Clothing</option>
                            <option value="women's clothing">Women's Clothing</option>
                            <option value="jewelery">Jewelery</option>
                        </select>

                        <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#666]"
                        />
                    </div>

                    {/* Sort */}
                    <div className="relative">
                        <select
                            defaultValue="featured"
                            className="h-[54px] min-w-[210px] appearance-none rounded-[18px] border border-[#333] bg-[#1c1d1c] px-5 pr-12 text-sm font-medium text-white outline-none transition focus:border-[#c6ff00]"
                        >
                            <option value="featured">Featured</option>
                            <option value="low-high">Price: Low to High</option>
                            <option value="high-low">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                        </select>

                        <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#666]"
                        />
                    </div>
                </section>

                {/* Product Grid Goes Here */}
                <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map(product => {
                        return <ProductCard key={product.id} product={product} />
                    })}
                </section>
            </div>
            <Footer/>
        </main>
    );
};

export default Products;