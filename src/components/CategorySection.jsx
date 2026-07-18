import { ArrowRight } from "lucide-react";

const CategorySection = ({ categories = [] }) => {
    return (
        <section className="mt-10">
            {/* Header */}
            <div className="mb-7 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                    Shop by Category
                </h2>

                <button className="flex items-center gap-1 text-sm font-medium text-[#c6ff00] transition hover:text-[#aee000]">
                    View All
                    <ArrowRight size={15} />
                </button>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => (
                    <div
                        key={category.name}
                        className="flex h-[165px] cursor-pointer flex-col items-center justify-center rounded-[20px] bg-[#fafafa] text-black transition duration-200 hover:-translate-y-1"
                    >
                        {/* Icon */}
                        <span className="mb-4 text-4xl">
                            {category.icon}
                        </span>

                        {/* Category Name */}
                        <h3 className="text-lg font-medium">
                            {category.name}
                        </h3>

                        {/* Item Count */}
                        <p className="mt-1 text-sm text-[#888]">
                            {category.items} items
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;