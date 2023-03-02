const fs = require('fs');
const path = require('path');

const singleLineCommentRegex = /(^#.*\n)/gm;
const stripComments = string => {
    return string.replace(singleLineCommentRegex, '');
};

/**
 * Normal `require` doesn't know what to do with .graphql files, so this helper function
 * simply imports their contents as a string.
 * @see https://github.com/apollographql/apollo-server/issues/1175#issuecomment-397257339.
 *
 * @param   {String} filepath - A relative path to a .graphql file to read.
 * @returns {String} - The contents of the file as a string.
 */
const requireGraphQL = filePath => {
  const absolutePath = path.resolve(__dirname, filePath);
  return stripComments(fs.readFileSync(absolutePath, { encoding: 'utf8' }));
};

const getSchemaTypes = requireGraphQL('./getSchemaTypes.graphql');
const getStoreConfigData = requireGraphQL('./getStoreConfigData.graphql');
const getAvailableStoresConfigData = requireGraphQL('./getAvailableStoresConfigData.graphql');

module.exports = {
  // getMediaUrl,
  getStoreConfigData,
  getAvailableStoresConfigData,
  getSchemaTypes
};