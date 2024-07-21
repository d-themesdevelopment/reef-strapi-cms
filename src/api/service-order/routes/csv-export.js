module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/service-order/export-csv',
      handler: 'csv-export.exportToCSV',
      config: {
        policies: [],
        auth: ['api::service-order.read'], // always must be an obj - and must require auth 
      },
    },
  ],
};
