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

function filterFields(obj) {
  console.log('Filtering fields. Input object keys:', Object.keys(obj));

  const fieldsToExclude = [
    'message',
    'user.provider',
    'user.password',
    'user.resetPasswordToken',
    'user.confirmationToken',
    'user.confirmed',
    'user.companyName',
    'user.updatedAt',
    'user.approvedAsEmployee',
    'user.isAdmin',
    'user.approvedEmployeeRole',
    'user.extNumber',
    'user.avatar',
    'user.background',
    'user.serviceOrderRequestIDs',
    'user.employee_roles',
    'user.createdBy',
  ];

  const filteredObj = {};
  for (const [key, value] of Object.entries(obj)) {
    if (!fieldsToExclude.includes(key) &&
        !key.startsWith('user.role.') &&
        !key.startsWith('user.updatedBy.') &&
        !key.startsWith('user.createdBy.')) {
      filteredObj[key] = value;
    }
  }

  console.log('Filtered object keys:', Object.keys(filteredObj));
  return filteredObj;
}

function jsonToCSV(items) {
  if (items.length === 0) return '';

  console.log('Converting to CSV. Number of items:', items.length);
  console.log('Sample item before flattening:', JSON.stringify(items[0], null, 2));

  const flattenedItems = items.map(item => flattenObject(item));
  console.log('Sample flattened item:', JSON.stringify(flattenedItems[0], null, 2));

  const filteredItems = flattenedItems.map(item => filterFields(item));
  console.log('Sample filtered item:', JSON.stringify(filteredItems[0], null, 2));

  const allKeys = [...new Set(filteredItems.flatMap(Object.keys))];
  console.log('All keys after filtering:', allKeys);

  const header = allKeys.join(',') + '\n';

  const rows = filteredItems.map(item =>
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

async function deepPopulate(contentType) {
  const schema = strapi.getModel(contentType);
  const populate = {};

  for (const [key, value] of Object.entries(schema.attributes)) {
    if (value.type === 'relation') {
      populate[key] = { populate: '*' };
    } else if (value.type === 'component') {
      populate[key] = { populate: '*' };
    } else if (value.type === 'dynamiczone') {
      populate[key] = { populate: '*' };
    }
  }

  return populate;
}

module.exports = {
  async exportToCSV(ctx) {
    try {
      console.log('Starting CSV export');
      const populateObject = await deepPopulate('api::service-order.service-order');
      console.log('Populate object:', JSON.stringify(populateObject, null, 2));

      const entries = await strapi.entityService.findMany('api::service-order.service-order', {
        populate: populateObject,
      });

      console.log(`Fetched ${entries.length} entries`);
      console.log('Sample entry:', JSON.stringify(entries[0], null, 2));

      if (!entries || entries.length === 0) {
        console.log('No entries found');
        ctx.body = { error: 'No service orders found' };
        ctx.status = 404;
        return;
      }

      const csv = jsonToCSV(entries);
      console.log('CSV generated. First 500 characters:', csv.substring(0, 500));

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
