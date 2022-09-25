import Restaurant from '../Restaurant/Restaurant';
import CategoryProduct from './CategoryProduct';

export default interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  district: string;
  vegan: boolean;
  vegetarian: boolean;
  kosher: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  categoryProduct: CategoryProduct;
  restaurant: Restaurant;
}
