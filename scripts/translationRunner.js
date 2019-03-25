const manageTranslations = require('react-intl-translations-manager').default;
const shell = require('shelljs');

// es2015 import
// import manageTranslations from 'react-intl-translations-manager';

const transDir = 'build/messages';

// rename generated .ts files to .json
shell.exec(
  'node_modules/.bin/renamer --find ".ts" --replace ".json" "' +
    transDir +
    '/**"',
  { silent: true },
);

manageTranslations({
  messagesDirectory: './' + transDir,
  translationsDirectory: './src/translates',
  languages: ['en', 'cs'],
});
