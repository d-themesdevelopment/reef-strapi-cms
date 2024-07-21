module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/service-order/export-csv',
      handler: 'csv-export.exportToCSV',
      config: {
        policies: [],
      },
    },
  ],
};
