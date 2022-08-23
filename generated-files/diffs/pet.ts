export interface Pet { // >>>>>>> changed to "import {Category} from './category';"
  /** @format int64 */ // >>>>>>> changed to "import {Tag} from './tag';"
  id?: number;
  category?: Category; // >>>>>>> changed to "export interface Pet {"
 // >>>>>>> changed to "  /** @format int64 */"
  /** @example doggie */ // >>>>>>> changed to "  id?: number;"
  name: string; // >>>>>>> changed to "  category?: Category;"
  photoUrls: string[];
  tags?: Tag[]; // >>>>>>> changed to "  /** @example doggie */"
 // >>>>>>> changed to "  name: string;"
  /** pet status in the store */ // >>>>>>> changed to "  photoUrls: string[];"
  status?: "available" | "pending" | "sold"; // >>>>>>> changed to "  tags?: Tag[];"
}
// >>>>>>> changed to "  /** pet status in the store */"
// >>>>>>> changed to "  status?: "available" | "pending" | "sold";"
// >>>>>>> changed to "}"