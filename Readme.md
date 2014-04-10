Purpose
=======
Provide reusable services and directives for Smarty Streets address completion and validation.

Build
=====

System requirements
-------------------

1.  Install npm

1.  Install bower

1.  Install grunt

1.  Install protractor for e2e tests

npm install protractor
webdriver-manager update --standalone

Pull dependencies
-----------------

```
npm install
bower install
```

Run tests and package
---------------------

```
grunt
```

Run e2e tests
-------------
1.  Start the webdriver server
```
webdriver-manager start
```

1.  Build the project
```
grunt default
```

1.  Start the dev server
```
grunt connect:dev
```
1.  Run the tests
```
grunt protractor:test
```

Distribution
------------

smarty-streets.min.js

Publish to bower
----------------
TODO

TODO
====
* .gitignore
* karma
    * server tests
    * controller tests
    * directive testing?
    * code coverage
* protractor
* readme
* jslint config
* bower
* CI