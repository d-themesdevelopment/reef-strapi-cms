module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/service-order/export-csv',
      handler: 'csv-export.exportToCSV',
      config: {
        policies: [],
        auth: true, // Set to true if you want to require authentication
      },
    },
  ],
};
