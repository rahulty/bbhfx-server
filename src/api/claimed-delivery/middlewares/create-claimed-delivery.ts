/**
 * `create-claimed-delivery` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info("In create-claimed-delivery middleware.");
    const userDocumentId = ctx.state.user?.documentId;

    if (userDocumentId && ctx.request.body.data.delivery) {
      const claimedDelivery = await strapi.db
        .query("api::claimed-delivery.claimed-delivery")
        .findOne({
          where: {
            users_permissions_user: { documentId: userDocumentId },
            delivery: { documentId: ctx.request.body.data.delivery },
          },
        });
      if (!claimedDelivery) {
        ctx.request.body.data = {
          ...ctx.request.body.data,
          users_permissions_user: userDocumentId,
        };
        await next();
      } else {
        ctx.throw(
          403,
          "You are not allowed to create a claimed delivery for the same delivery multiple times."
        );
      }
    } else {
      ctx.throw(
        403,
        "You are not allowed to create a claimed delivery without a user or without delivery."
      );
    }
  };
};
