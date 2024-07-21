module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/service-order/export-csv',
      handler: 'csv-export.exportToCSV',
      config: {
        policies: [],
        auth: false, // always must be an obj - and must require auth
      },
    },
  ],
};
