This is a demo for using NodeJS as backend api service and Backbone/jQueryMobile/requireJS as frontend solution for web application development.

Backend Solution:
1. NodeJS is only providing api rest api, while it is using static middle ware to enable access to static files under public/ directory
2. Actual business logic is in the service/ directory, which is called by the routes under routes/ directory
3. Funcitons are spreaded into userService, transaction service, currency service and fileCache service;
4. Exchange rate is retrieved and saved under cache/ directory, and it is refreshed every 10 minutes;
5. Simple log in function is provided, we are now allowing multiple user to use this web application simultaneously. In order to differentiate their data, I provided simple login service and use session to save username. This can effectively differentiate data for each user.

Frontend:
1. Backbone is used to provide MVC solution;
2. jQuery mobile is used to provide mobile effect;
3. requireJS is used to manage javascript libs

In sum, following features are added as enhencements from basic requirements:
1. Simple login page is added, as this is only demo, we only require userName, once you login, your username will be shown on each page. And you can easily track YOUR OWN transaction histories;
2. FileCache is used to cache exchange rate, and it will only be refreshed every 10 mins to reduce the bandwidth use and improve respond speed


Real demo can be accessed here:
http://192.210.149.101:3000/