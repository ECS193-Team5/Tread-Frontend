# Tread-Frontend


## Installation


```
git clone https://github.com/ECS193-Team5/Tread-Frontend.git
```


Navigate to the project folder and install the required dependencies;


```
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.



## Technologies

The frontend is written in React, HTML, JS, and CSS. 

It has many dependencies, but the most notable imported modules are:



1. qrcode - This builds the qrcodes for the profile and league settings pages.
2. Firbase -  This handles the push notifications - both for reading the device tokens and for handling when the web receives a push notification.
3. axios - This handles sending the backend requests.
4. chart.js - This chart making program is used in the statistics page to make nice visuals.
5. react-apple-signin-auth - This is a necessary dependency to allow Sign in with Apple.
6. react-router-dom -  This module is used to set up the page routing. In src/App.js, each url is set up to go to a specific React component defined in src/pages.


## Organization

The three relevant top-level directories are /public, /src and /tests. 

**/public:** This folder includes the .well-known file. This is used for Deep Linking - the feature where mobile will redirect you to the Tread App if you have it. It also includes the favicon - which determines the logo when the Tread App is deployed.

**src/assets** : This stores all the commonly reused images, like the trophies and Tread logo.

**src/components**: The components folder is further subdivided into folders - each folder representing one of the pages. There is a Shared Folder for components used across pages. One component is one file - no exceptions. 

**src/css : **The folder holds all the CSS. It is also subdivided into folders that reflect the original page structure

**src/helpers :** This folder stores a set of helper functions, for doing things like manipulating DateTime objects, changes in CSS, or pulling from Cloudinary.** **

**src/pages : **The base components that make up the app. Each &lt;Route> Link goes to one of the React components listed here. The pages organization is reflected in the /compenents and /css directories as well.

**src/routes : **All of the requests to the backend are stored here. By separating the axios requests into their own folder, it was easier to import the same request into multiple pages. This folder is organized to mirror the Backend organization.

**tests**: This includes the complete testing suite. It is subdivided into integration tests, unit tests, and e2e tests. 


## **Testing**

The frontend has three types of testing: end-to-end, integration, and unit. Each one has its own code coverage report. Generating the coverage report makes the tests take longer to run, but when finishing a feature, the coverage report should be generated to make sure that no lines have been missed.


### **End-to-End**


```
npm run e2e_test
npm run e2e_test_coverage
```



### Integration


```
npm run integration_test
npm run integration_test_coverage
```



### Unit


```
npm run unit_test
npm run unit_test_coverage
```
