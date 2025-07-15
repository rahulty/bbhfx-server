/**
 * `cdelivery-populate` middleware
 */

import type { Core } from "@strapi/strapi";

const populate = {
  delivery: true,
  users_permissions_user: true,
};

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info("In cdelivery-populate middleware.");

    ctx.query.populate = populate;

    await next();
  };
};
