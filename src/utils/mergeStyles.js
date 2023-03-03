import lodash from 'lodash';

export default (...rest) => {
  return lodash.merge(...rest);
};
