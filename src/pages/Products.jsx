import { Search, ChevronDown, X } from "lucide-react";
import Navbar from '../components/Navbar';
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { MyStore } from "../context/MyContext";
import ProductCard from "../components/ProductCard";
import Footer from './../components/Footer';

const Products = () => {
    const { products, setProducts, fetchProducts } = useContext(MyStore);
    const [serachParams] = useSearchParams();
    const [filterOptions, setFilterOptions] = useState({
        search: "",
        category: serachParams.get('category')?.toLowerCase() || "all",
        sortBy: "featured"
    });

    let filteredProducts = products.filter(product => {
        if (filterOptions.category.toLowerCase() === "all") {
            return true;
        }
        return product.category === filterOptions.category.toLowerCase();
    });

    if (filterOptions.sortBy === "low-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (filterOptions.sortBy === "high-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (filterOptions.sortBy === "rating") {
        filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    if (filterOptions.search) {
        filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(filterOptions.search)
        );
    }

    const clearFilters = () => {
        setFilterOptions({
            search: "",
            category: "all",
            sortBy: "featured"
        });
    };

    return (
        <main className="min-h-screen bg-[#090a09] text-white">
            <Navbar />

            <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-7 px-4 mt-6 mb-15 sm:gap-8 sm:px-6 sm:mt-8 lg:gap-10 lg:mt-10">

                {/* Page Heading */}
                <section>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        All Products
                    </h1>

                    <p className="mt-2 text-sm text-[#777] sm:text-base">
                        20 products found
                    </p>
                </section>

                {/* Search & Filters */}
                <section className="flex flex-col gap-3 rounded-[20px] border border-[#aaa] p-3 sm:p-4 lg:flex-row lg:items-center">

                    {/* Search */}
                    <div className="relative w-full lg:flex-1">
                        <Search
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]"
                        />

                        <input
                            onChange={(e) =>
                                setFilterOptions({
                                    ...filterOptions,
                                    search: e.target.value
                                })
                            }
                            value={filterOptions.search}
                            type="text"
                            placeholder="Search products..."
                            className="h-[50px] w-full rounded-[16px] border border-[#333] bg-[#1c1d1c] pl-12 pr-5 text-sm text-white outline-none placeholder:text-[#666] transition focus:border-[#c6ff00] sm:h-[54px] sm:rounded-[18px]"
                        />
                    </div>

                    {/* Select Filters */}
                    <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">

                        {/* Category */}
                        <div className="relative w-full sm:flex-1 lg:w-auto lg:flex-none">
                            <select
                                onChange={(e) =>
                                    setFilterOptions({
                                        ...filterOptions,
                                        category: e.target.value
                                    })
                                }
                                value={filterOptions.category}
                                className="h-[50px] w-full appearance-none rounded-[16px] border border-[#333] bg-[#1c1d1c] px-5 pr-12 text-sm font-medium text-white outline-none transition focus:border-[#c6ff00] sm:h-[54px] sm:rounded-[18px] lg:min-w-[190px]"
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
                        <div className="relative w-full sm:flex-1 lg:w-auto lg:flex-none">
                            <select
                                onChange={(e) =>
                                    setFilterOptions({
                                        ...filterOptions,
                                        sortBy: e.target.value
                                    })
                                }
                                value={filterOptions.sortBy}
                                className="h-[50px] w-full appearance-none rounded-[16px] border border-[#333] bg-[#1c1d1c] px-5 pr-12 text-sm font-medium text-white outline-none transition focus:border-[#c6ff00] sm:h-[54px] sm:rounded-[18px] lg:min-w-[210px]"
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

                    </div>

                    {/* Clear Button */}
                    {(filterOptions.search ||
                        filterOptions.category !== "all" ||
                        filterOptions.sortBy !== "featured") && (

                            <button
                                onClick={clearFilters}
                                type="button"
                                className="flex h-[50px] w-full cursor-pointer items-center justify-center gap-2 rounded-[16px] border border-red-500/30 bg-red-500/10 px-5 text-sm font-medium text-red-400 transition hover:bg-red-500/20 sm:h-[54px] sm:w-auto sm:rounded-[18px]"
                            >
                                <X size={16} />
                                Clear
                            </button>
                        )}

                </section>

                {/* Product Grid */}
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">

                    {filteredProducts.length === 0 ? (

                        <div className="col-span-full flex min-h-[250px] flex-col items-center justify-center rounded-[20px] border border-dashed border-[#333] bg-[#101110] px-5 text-center sm:min-h-[300px]">

                            <h2 className="text-lg font-semibold text-white sm:text-xl">
                                No products found
                            </h2>

                            <p className="mt-2 text-sm text-[#666]">
                                Try adjusting your search or filters.
                            </p>

                        </div>

                    ) : (

                        filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))

                    )}

                </section>

            </div>

            <Footer />
        </main>
    );
};

export default Products;