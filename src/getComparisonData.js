import _ from 'lodash';

const getComparisonData = (data1, data2) => {
  const data1keys = Object.keys(data1);
  const data2keys = Object.keys(data2);
  const uniqueKeys = _.sortBy(_.union(data1keys, data2keys));
  return uniqueKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      const children = getComparisonData(data1[key], data2[key]);
      return { key, type: 'node', children };
    } 
    if (!_.has(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    } 
    if (!_.has(data2, key)) {
      return { key, value: data1[key], type: 'deleted' };
    } 
    if (_.isEqual(data1[key], data2[key])) {
      return { key, value: data1[key], type: 'unchanged' };
    } else {
      return { key, oldValue: data1[key], newValue: data2[key], type: 'updated' };
    }
  });
};

export default getComparisonData;
