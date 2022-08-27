export interface ApiResponse { // >>>>>>> changed to "export class ApiResponse {"
  /** @format int32 */
  code?: number;
  type?: string;
  message?: string;
}