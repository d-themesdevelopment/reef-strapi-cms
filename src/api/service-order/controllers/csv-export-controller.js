const { Readable } = require('stream');

function flattenObject(obj, prefix = '') {
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

  const flattenedItems = items.map(item => flattenObject(item.attributes));

  const header = Object.keys(flattenedItems[0]).join(',') + '\n';
  const rows = flattenedItems.map(item =>
    Object.values(item).map(value =>
      value === null ? '' :
      typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` :
      typeof value === 'object' ? `"${JSON.stringify(value).replace(/"/g, '""')}"` :
      value
    ).join(',')
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
