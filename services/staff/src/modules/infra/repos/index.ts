import { StaffRepo } from "./StaffRepo";
import models from "../../../shared/infra/repos/sequelize/models";

const staffRepo = new StaffRepo(models);

export { staffRepo };
