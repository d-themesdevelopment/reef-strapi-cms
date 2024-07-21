const { Parser } = require('json2csv');

module.exports = {
  async exportToCSV(ctx) {
    try {
      // Fetch your data here. This is an example with a 'product' content type
      const products = await strapi.services.product.find(ctx.query);

      // Define fields to export
      const fields = ['id', 'name', 'description', 'price'];

      // Create the parser
      const parser = new Parser({ fields });

      // Parse the JSON data to CSV
      const csv = parser.parse(products);

      // Set response headers for file download
      ctx.set('Content-Type', 'text/csv');
      ctx.set('Content-Disposition', 'attachment; filename=products.csv');

      // Send the CSV file
      ctx.send(csv);
    } catch (error) {
      ctx.body = { error: error.message };
    }
  },
};
