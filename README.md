# BSC test frontend application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:9000](http://localhost:9000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm test:e2e`

Launches [Cypress](https://docs.cypress.io/) test runner with end-to-end test.

### `npm run build`

Builds the app for production to the `build` folder.


### Translations

All messages are stored in `src/messages.ts` file.

You can extract all translations to json files by running `npm run extract-intl`.

This builds the app, extracts messages and stores them into .json files in `src/translates/en.json` and `src/translates/cs.json` respectively.
While default language is set to **English** `en`, you need to translate messages in `cs.json` file.


### `npm run deploy -- --remote "github_origin_name"`

you can override `PUBLIC_ENV`, which is used as React router basename. 

Deploy app to github pages.

