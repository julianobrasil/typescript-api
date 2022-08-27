import {Category} from './category';
import {Tag} from './tag';

import {Category} from './category';
import {Tag} from './tag';

export class Pet {
  /** @format int64 */
  id?: number;
  category?: Category;

  /** @example doggie */
  name: string;
  photoUrls: string[];
  tags?: Tag[];

  /** pet status in the store */
  status?: "available" | "pending" | "sold";
}