const { getPossibleTypes } = require('./graphQl');
const fs = require('fs');

getPossibleTypes().then(possibleTypes => {
  fs.writeFile('./possibleTypes.json', JSON.stringify(possibleTypes), err => {
    if (err) {
      console.error('Error writing possibleTypes.json', err);
    } else {
      console.log('Fragment types successfully extracted!');
    }
  });
});