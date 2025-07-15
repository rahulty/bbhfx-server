/**
 * `delivery-populate` middleware
 */

import type { Core } from "@strapi/strapi";

const populate = {
  claimed_deliveries: {
    populate: {
      users_permissions_user: {
        fields: ["username", "email"],
        // filters decreases performance, and increases response time
        filters: {
          confirmed: { $eq: true },
          blocked: { $eq: false },
        },
      },
    },
    fields: ["documentId", "type", "notes"],
  },
};
// prettier-ignore
const fields = ['documentId', 'title', 'description', 
  'startPickupDateTime', 'endPickupDateTime',
  'size','reqRiders'];
const withUserFields = ["fromAddress", "toAddress"];

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info("In delivery-populate middleware.");
    ctx.query.populate = populate;
    ctx.query.fields = ctx.state.user ? [...fields, ...withUserFields] : fields;
    ctx.query.sort = "publishedAt:desc";

    await next();
  };
};
