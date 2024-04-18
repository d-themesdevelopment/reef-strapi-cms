'use strict';

/**
 * auth-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::auth-page.auth-page');
