
import { useQuery } from '@tanstack/react-query';

import { CategoryTabs } from './CategoryTabs';
import { DishCard } from './DishCard';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { fetchMenuData } from '../services/_api';
import React from 'react';
import { Link } from 'react-router-dom';

export function RestaurantMenu() {
  const { data: restaurant, isLoading, error } = useQuery({
    queryKey: ['menu'],
    queryFn: fetchMenuData,
  });

  const { totalItems } = useCart();
  const [activeCategory, setActiveCategory] = React.useState<string>('');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        Failed to load menu data
      </div>
    );
  }

  if (!restaurant) return null;

  const activeMenu = restaurant.table_menu_list.find(
    (menu) => menu.menu_category_id === activeCategory
  ) || restaurant.table_menu_list[0];

  return (
    <div className="max-w-full mx-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between p-4">
         
          <div className='flex items-center gap-2'>
          <ArrowLeft className="w-6 h-6" />
          <div>
            <h1 className="text-xl font-bold">{restaurant.restaurant_name}</h1>
            <p className="text-sm text-gray-600">{restaurant.branch_name}</p></div>
          </div>
          <div className="relative">
            <div className='flex items-center gap-2'>

        
          <Link to="/orders" className="text-sm text-gray-600">{"My Orders"}</Link>
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          </div>
        </div>

        <CategoryTabs
          categories={restaurant.table_menu_list}
          activeCategory={activeMenu.menu_category_id}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Dishes */}
      <div className="px-4">
        <h2 className="text-xl font-semibold my-4">{activeMenu.menu_category}</h2>
        <div className="space-y-4">
          {activeMenu.category_dishes.map((dish) => (
            <DishCard key={dish.dish_id} dish={dish} />
          ))}
        </div>
      </div>
    </div>
  );
}