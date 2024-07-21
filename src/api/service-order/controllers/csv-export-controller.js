const { Readable } = require('stream');

function flattenObject(obj, prefix = '') {
  if (obj === null || typeof obj !== 'object') {
    return { [prefix]: obj };
  }
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
}

function jsonToCSV(items) {
  if (items.length === 0) return '';

  const flattenedItems = items.map(item => flattenObject(item.attributes || {}));

  const allKeys = [...new Set(flattenedItems.flatMap(Object.keys))];
  const header = allKeys.join(',') + '\n';

  const rows = flattenedItems.map(item =>
    allKeys.map(key => {
      const value = item[key];
      if (value === null || value === undefined) return '';
      if (typeof value === 'string') return `"${value.replace(/"/g, '""')}"`;
      if (typeof value === 'object') return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
      return value;
    }).join(',')
  ).join('\n');

  return header + rows;
}

module.exports = {
  async exportToCSV(ctx) {
    try {
      const entries = await strapi.entityService.findMany('api::service-order.service-order', {
        populate: {
          user: {
            populate: ['*']
          },
          personalInformation: {
            populate: ['*']
          },
          requestInformation: {
            populate: ['*']
          },
          attachedFile: {
            populate: ['*']
          }
        },
      });

      if (!entries || entries.length === 0) {
        ctx.body = { error: 'No service orders found' };
        ctx.status = 404;
        return;
      }

      const csv = jsonToCSV(entries);

      ctx.set('Content-Type', 'text/csv');
      ctx.set('Content-Disposition', `attachment; filename=service-requests-${Date.now()}.csv`);

      const stream = Readable.from(csv);
      ctx.body = stream;
    } catch (error) {
      console.error('CSV Export Error:', error);
      ctx.body = { error: error.message };
      ctx.status = 500;
    }
  },
};
