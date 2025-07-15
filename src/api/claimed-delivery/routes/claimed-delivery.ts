/**
 * claimed-delivery router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::claimed-delivery.claimed-delivery",
  {
    config: {
      create: {
        middlewares: ["api::claimed-delivery.create-claimed-delivery"],
      },
      find: {
        middlewares: ["api::claimed-delivery.cdelivery-populate"],
      },
    },
  }
);
