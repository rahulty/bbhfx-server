/**
 * delivery router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::delivery.delivery", {
  config: {
    find: {
      middlewares: ["api::delivery.delivery-populate"],
    },
  },
});
