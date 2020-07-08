import { StaffService } from "./StaffServices";
import { AuthService } from "./AuthServices";

const authService = new AuthService();
const staffService = new StaffService({
  authService,
  //@ts-ignore
  baseURL: app.env.API_HOST,
  //@ts-ignore
  apiPort: app.env.API_PORT,
  //@ts-ignore
  apiVerson: app.env.API_VER,
});
export { staffService };
