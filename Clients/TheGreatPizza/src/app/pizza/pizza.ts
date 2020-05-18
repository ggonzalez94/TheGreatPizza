import { Topping } from '../toppings/topping';

export interface Pizza {
  id: number;
  name: string;
  description?: string;
  toppings?: Topping[];
}
