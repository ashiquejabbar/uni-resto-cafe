export interface Restaurant {
  restaurant_id: string;
  restaurant_name: string;
  restaurant_image: string;
  table_id: string;
  table_name: string;
  branch_name: string;
  nexturl: string;
  table_menu_list: TableMenuItem[];
}

export interface TableMenuItem {
  menu_category: string;
  menu_category_id: string;
  menu_category_image: string;
  nexturl: string;
  category_dishes: Dish[];
}

export interface Dish {
  dish_id: string;
  dish_name: string;
  dish_price: number;
  dish_image: string;
  dish_currency: string;
  dish_calories: number;
  dish_description: string;
  dish_Availability: boolean;
  dish_Type: number;
  nexturl: string;
  addonCat?: AddonCategory[];
}

export interface AddonCategory {
  addon_category: string;
  addon_category_id: string;
  addon_selection: number;
  nexturl: string;
  addons: Addon[];
}

export interface Addon {
  dish_id: string;
  dish_name: string;
  dish_price: number;
  dish_image: string;
  dish_currency: string;
  dish_calories: number;
  dish_description: string;
  dish_Availability: boolean;
  dish_Type: number;
}