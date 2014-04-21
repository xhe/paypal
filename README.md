This is a demo for using NodeJS as backend api service and Backbone/jQueryMobile/requireJS as frontend solution for web application development.
<br/><br/>
Backend Solution:<br/>
<br/>1. NodeJS is only providing api rest api, while it is using static middle ware to enable access to static files under public/ directory
<br/>2. Actual business logic is in the service/ directory, which is called by the routes under routes/ directory
<br/>3. Funcitons are spreaded into userService, transaction service, currency service and fileCache service;
<br/>4. Exchange rate is retrieved and saved under cache/ directory, and it is refreshed every 10 minutes;
<br/>5. Simple log in function is provided, we are now allowing multiple user to use this web application simultaneously. In order to differentiate their data, I provided simple login service and use session to save username. This can effectively differentiate data for each user.
<br/><br/>
Frontend:<br/>
<br/>1. Backbone is used to provide MVC solution;
<br/>2. jQuery mobile is used to provide mobile effect;
<br/>3. requireJS is used to manage javascript libs
<br/><br/>
In sum, following features are added as enhencements from basic requirements:
<br/>1. Simple login page is added, as this is only demo, we only require userName, once you login, your username will be shown on each page. And you can easily track YOUR OWN transaction histories;
<br/>2. FileCache is used to cache exchange rate, and it will only be refreshed every 10 mins to reduce the bandwidth use and improve respond speed
<br/><br/>
Real demo can be accessed here:
<br/>
http://192.210.149.101:3000/