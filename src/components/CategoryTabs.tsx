import { useRef } from 'react';
import { TableMenuItem } from '../types/menu';
import { cn } from '../lib/utils';

interface CategoryTabsProps {
  categories: TableMenuItem[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-auto gap-4 py-4 px-4 no-scrollbar"
    >
      {categories.map((category) => (
        <button
          key={category.menu_category_id}
          onClick={() => onCategoryChange(category.menu_category_id)}
          className={cn(
            "relative whitespace-nowrap px-2 py-2 text-base transition-colors",
            activeCategory === category.menu_category_id
              ? "text-red-600 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-red-600"
              : "text-gray-600 hover:text-gray-800"
          )}
        >
          {category.menu_category}
        </button>
      ))}
    </div>
  );
}