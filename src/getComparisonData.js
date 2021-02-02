import _ from 'lodash';

const getComparisonData = (file1Data, file2Data) => {
  const file1keys = Object.keys(file1Data);
  const file2keys = Object.keys(file2Data);
  const uniqueKeys = _.union(file1keys, file2keys);
  return uniqueKeys.reduce((result, key) => {
    if (!_.has(file1Data, key)) {
      result.push({ key, value: file2Data[key], status: 'added' });
    }
    if (!_.has(file2Data, key)) {
      result.push({ key, value: file1Data[key], status: 'deleted' });
    }
    if (_.has(file1Data, key) && _.has(file2Data, key)) {
      if (_.isEqual(file1Data[key], file2Data[key])) {
        result.push({ key, value: file1Data[key], status: 'unchanged' });
      }
      if (_.isObject(file1Data[key]) && _.isObject(file2Data[key])) {
        result.push({
          key, value: file1Data[key], status: 'node', children: getComparisonData(file1Data[key], file2Data[key]),
        });
      } else {
        result.push({ key, value: file1Data[key], status: 'deleted' });
        result.push({ key, value: file1Data[key], status: 'added' });
      }
    }
    return result;
  }, []);
};

export default getComparisonData;
