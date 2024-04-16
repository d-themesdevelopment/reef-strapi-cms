'use strict';

/**
 * media-center service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::media-center.media-center');
