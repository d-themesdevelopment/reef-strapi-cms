const { Readable } = require('stream');

function jsonToCSV(items) {
  const header = Object.keys(items[0]).join(',') + '\n';
  const rows = items.map(item => Object.values(item).join(',') + '\n');
  return header + rows.join('');
}

module.exports = {
  async exportToCSV(ctx) {
    try {
      // Fetch your data here. Adjust the query as needed.
      const entries = await strapi.entityService.findMany('api::service-order.service-order', {
        // Add any necessary query parameters
      });

      const csv = jsonToCSV(entries);

      // Set response headers for file download
      ctx.set('Content-Type', 'text/csv');
      ctx.set('Content-Disposition', 'attachment; filename=service-orders.csv');

      // Create a readable stream from the CSV string
      const stream = Readable.from(csv);

      // Stream the CSV to the response
      ctx.body = stream;
    } catch (error) {
      ctx.body = { error: error.message };
    }
  },
};
