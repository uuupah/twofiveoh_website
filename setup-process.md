```
# new project
ng new twofiveoh
# ng install via https://www.freecodecamp.org/news/how-to-add-bootstrap-css-framework-to-an-angular-application/
# install boostrap libs
npm install bootstrap bootstrap-icons
# add styles and scripts to angular.json
# (add this to both build and test)
...
"styles": [
  "node_modules/bootstrap/scss/bootstrap.scss",
  "node_modules/bootstrap-icons/font/bootstrap-icons.css",
  "src/styles.scss"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
...
# add ng bootstrap
npm install @ng-bootstrap/ng-bootstrap
# add ng module to app.module.ts
...
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
...
imports: [
  BrowserModule,
  NgbModule,
  AppRoutingModule,
],
...
```