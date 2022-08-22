import {Category} from './category';
import {Tag} from './tag';

export interface Pet {
  /** @format int64 */
  id?: number;
  category?: Category;

  /** @example doggie */
  name: string;
  photoUrls: string[];
  tags?: Tag[];

  /** pet status in the store */
  status?: "available" | "pending" | "sold";
  obj1?: { age?: number; height?: number; weight?: number }; // >>>>>>> changed to "}"
}