import _ from 'lodash';

const getComparisonData = (file1Data, file2Data) => {
  const file1keys = Object.keys(file1Data);
  const file2keys = Object.keys(file2Data);
  const uniqueKeys = _.sortBy(_.union(file1keys, file2keys));
  return uniqueKeys.reduce((result, key) => {
    if (_.isObject(file1Data[key]) && _.isObject(file2Data[key])) {
      const children = getComparisonData(file1Data[key], file2Data[key]);
      result.push({ key, status: 'node', children });
    } else if (!_.has(file1Data, key)) {
      result.push({ key, value: file2Data[key], status: 'added' });
    } else if (!_.has(file2Data, key)) {
      result.push({ key, value: file1Data[key], status: 'deleted' });
    } else if (_.isEqual(file1Data[key], file2Data[key])) {
      result.push({ key, value: file1Data[key], status: 'unchanged' });
    } else {
      result.push({
        key, oldValue: file1Data[key], newValue: file2Data[key], status: 'updated',
      });
    }
    return result;
  }, []);
};

export default getComparisonData;
