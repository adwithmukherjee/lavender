import api from "@sls-framework";
import HealthController from "./HealthController";

export default new HealthController();
export const handler = api(new HealthController());
