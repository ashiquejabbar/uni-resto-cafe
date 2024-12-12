import { Dish } from '../types/menu';
import { useCart } from '../context/CartContext';
import { Plus, Minus } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
}

export function DishCard({ dish }: DishCardProps) {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(dish.dish_id);

  return (
    <div className="flex gap-4 border-b border-gray-200 py-4">
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{dish.dish_name}</h3>

        <div className='flex justify-between gap-2'>
          <p className="text-gray-600 font-semibold">
            {dish.dish_currency} {dish.dish_price}
          </p>
          
          <p className="text-sm text-gray-500 font-semibold">
            {dish.dish_calories || '0'} Calories 
          </p>
        </div>
        <p className="text-sm text-gray-500">{dish.dish_description}</p>

        <div className="flex items-center mt-2">
          <div className="flex items-center bg-green-600 rounded-full">
            <button
              onClick={() => removeFromCart(dish.dish_id)}
              disabled={quantity === 0}
              className={`p-1 rounded-full ${
                quantity === 0 ? 'text-gray-300' : 'text-white'
              }`}
            >
              <Minus size={16} />
            </button>
          
            <span className="w-8 text-center text-white">{quantity}</span>
          
            <button
              onClick={() => addToCart(dish)}
              className="p-1 rounded-full text-white"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {dish.addonCat && (
          <p className="text-sm text-red-600 mt-1">Customizations available</p>
        )}
      </div>
   
      <div className="flex flex-col items-end gap-2">
        <img
          src={dish.dish_image}
          alt={dish.dish_name}
          className="w-24 h-24 object-cover rounded-lg"
        />
      </div>
    </div>
  );
}