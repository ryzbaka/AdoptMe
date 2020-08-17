## React Tools Setup
* `npm i -D prettier`
* then add the following to your script property of package.json:
`"format":"prettier \"src/**/*.{js, html}\" --write"`
* now if you type npm run format it will format all .js and .html files in /src
* if you want it to run every time you save then add .prettierrc to your directory
  and enable format on save and from prettier config on your VS Code.
* While prettier is purely concerned with spaces,tabs,etc, ESLint is concerned with style like check ECMAScript
  or accessibility friendliness
* `npm i -D eslint eslint-config-prettier`
* then add this to scripts;
`"lint": "eslint \"src/**/*.{js,jsx}\" --quiet"`
* add .eslintrc.json as shown
* `npm install -D parcel-bundler`
* npm install i -D parcel bundler
*     "dev": "parcel src/index.html"
* npm i react react-dom
* import React from "react";
* import { render } from "react-dom";
* import { Pet } from "/Pet.js";
* and un the Pet .js file:
  import React from "react";
  export const Pet = () =>{
    return React.createElement(
      ...
    )
  }
* JSX needs React to be imported but eslint might raise a problem since REact is never used in the Code
* to configure eslint type npm 
install -D babel-eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react

* npm i -D eslint-plugin-react-hooks

* npm install @reach/router