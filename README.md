<h1>Project Achievement 3 - myCinemovieApp (React)</h1>
<h5>Start 08.01.2022</h5>

<h2>Objective</h2>
<p>Using React, build the client-side for an application called myFlix based on its existing server-side code (REST API and database).</p>



### Tools used
- React / Redux / React Bootstrap
- Node.js

### Desktop views

<img width="200" alt="Pasted Graphic" src="https://user-images.githubusercontent.com/78739948/173243910-ee14d899-e509-4322-a70d-887fca83b851.png"><img width="200" alt="Pasted Graphic 1" src="https://user-images.githubusercontent.com/78739948/173243920-e4f18ce7-149c-4e30-b93b-7c0ea8e097fd.png"><img width="200" alt="Pasted Graphic 2" src="https://user-images.githubusercontent.com/78739948/173243923-c3b3b737-881d-476b-a1da-d96ae4f75547.png"><img width="200" alt="Pasted Graphic 3" src="https://user-images.githubusercontent.com/78739948/173243925-1e1a5d36-e8ae-494a-968b-1b7ff33382c6.png"><img width="200" alt="Pasted Graphic 4" src="https://user-images.githubusercontent.com/78739948/173243932-014106c8-c6e0-4b8c-afb9-622589c1382e.png"><img width="200" alt="Pasted Graphic 12" src="https://user-images.githubusercontent.com/78739948/173243943-4acd0c33-e6d4-402f-91c6-cff7d0d55d73.png"><img width="200" alt="Pasted Graphic 13" src="https://user-images.githubusercontent.com/78739948/173243948-173762b9-775b-4065-973c-a738f1a4665d.png">






### Mobile views

<img width="100" alt="myCineMovieApp" src="https://user-images.githubusercontent.com/78739948/173243760-25655e6c-46fb-4421-b24c-503a25c613e5.png"><img width="100" alt="The Godfather" src="https://user-images.githubusercontent.com/78739948/173243766-c2e0bf6b-1a21-4d0c-8790-966dc90be9be.png"><img width="100" alt="Coppola" src="https://user-images.githubusercontent.com/78739948/173243772-071c61d1-ad6c-48b2-8b1f-a523e0abee06.png"><img width="100" alt="myCineMovieApp" src="https://user-images.githubusercontent.com/78739948/173243777-8efb38dc-af8a-49f9-9e2d-4d249c0c51bd.png"><img width="100" alt="myCineMovieApp" src="https://user-images.githubusercontent.com/78739948/173243779-48e98217-bce5-4751-9f02-68c180275014.png"><img width="100" alt="myCineMovieApp" src="https://user-images.githubusercontent.com/78739948/173243783-2e49f246-3ecb-4190-9e58-e7d95b106d1e.png"><img width="100" alt="Registration" src="https://user-images.githubusercontent.com/78739948/173243787-50eabbe7-0bff-4b25-8450-ba3c67880cfa.png">
  


<h2>Context</h2>
<p>Client-side development hasn’t always been so prominent. In the past, pages would be generated on the server-side and sent to the browser, resulting in a poor user experience. Thanks to modern browsers and libraries such as React, the client-side of an application is today considered to be just as important as the server-side. As a student of full-stack development, you need to be skilled in both the server-side and client-side.
In the previous Achievement, you built the server-side for a movie application called myFlix. The API and database that you built meet the information needs of myFlix users. Now, you need to create the interface they will use when making requests to, and receiving responses from, the server-side. The client-side of your myFlix application will include several interface views built using the React library that will handle data through the previously-defined REST API endpoints.
The code you write impacts both your users and your fellow developers. As you work through this Achievement, you’ll need to consider, among other things, the readability and maintenance of your codebase, and the design and usability of your application.
By the end of the Achievement, you’ll have a complete web application (client-side and server-side) built using full-stack JavaScript technologies, which you can showcase in your portfolio. This project will demonstrate your mastery of full-stack JavaScript development. The complete tech stack you’ll master is known as the MERN (MongoDB, Express, React, and Node.js) stack.</p>

<h2>The 5 W’s</h2>
<ol>
<li>Who—The users of your myFlix application. They will be movie enthusiasts who enjoy reading information about different movies.</li>
<li>What—A single-page, responsive application with routing, rich interactions, several interface views, and a polished user experience. The client-side developed in this Achievement will support the existing server-side from Achievement 2 by facilitating user requests and rendering the response from the server-side via a number of different interface views.</li>
<li>When—myFlix users will be able to use it whenever they want to read information about different movies or update their user information​—​for instance, their list of “Favorite Movies.”</li>
<li>Where—The application will be hosted online. The myFlix application itself is responsive and can therefore be used anywhere and on any device, giving all users the same experience.</li>
<li>Why—Movie enthusiasts like to be able to access information about different movies, directors, and genres, whenever they want to. Having the ability to save lists of favorite movies will ensure users always have access to the films they want to watch or recommend to their peers.</li>
</ol>

<h2>Design Criteria</h2>
<h3>User Stories</h3>
<ul>
<li>As a user, I want to be able to access information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.</li>
<li>As a user, I want to be able to create a profile so I can save data about my favorite movies.</li>
</ul>

<h3>Features & Requirements</h3>
<p>The feature requirements below were extracted from the user stories listed above. ​Your project will only be approved if the following “essential” feature requirements are implemented in your Achievement project​.
</p>
<h4>Essential Views and Features</h4>



<h5>Main View</h5>
<li>Returns a list of ALL movies to the user (each listed item with an image, title, and
description)
</li>
<li>Sorting and filtering</li>
<li>Ability to select a movie for more details</li>
</ul>

<h5>Single movie view</h5>
<ul>
<li>Returns data (description, genre, director, image) about a single movie to the user</li>
<li>Allows users to add a movie to their list of favorites</li>
</ul>

<h5>Login view</h5>
<ul>
<li>Allows users to log in with a username and password
</li>
</ul>

<h5>Registration view</h5>
<ul>
<li>Allows new users to register (username, password, email, birthday)</li>
</ul>

<h5>Genre view</h5>
<ul>
<li>Returns data about a genre, with a name and description</li>
<li>Displays example movies</li>
</ul>

<h5>Director view</h5>
<ul>
<li>Returns data about a director (name, bio, birth year, death year)</li>
<li>Displays example movies</li>
</ul>

<h5>Profile view</h5>
<ul>
<li>Allows users to update their user info (username, password, email, date of birth)</li>
<li>Allows existing users to deregister</li>
<li>Displays favorite movies</li>
<li>Allows users to remove a movie from their list of favorites</li>
</ul>

<h4>Optional Views and Features</h4>
<h5>Single movie view and all movies views</h5>
<ul>
<li>Allow users to see which actors star in which movies</li>
<li>Allow users to view more information about different movies, such as the release date
and the movie rating</li>
</ul>

<h5>Actors view</h5>
<ul>
<li>Allows users to view information about different actors</li>
</ul>
<h5>Profile view, single movie view, and all movies view</h5>
<ul>
<li>Allow users to create a “To Watch” list in addition to their “Favorite Movies” list
</li>
</ul>

<h3>Wireframes</h3>
<p>You can download wireframes for each of the views for your project here: <a href="https://images.careerfoundry.com/public/courses/fullstack-immersion/A3/A3_myflix_wireframes.zip">​myFlix wireframe pack</a></p>

<h2>Technical Requirements</h2>

<ul>
<li>The application must be a single-page application (SPA)</li>
<li>The application must use state routing to navigate between views and share URLs</li>
<li>The application must give users the option to filter movies</li>
<li>The application must give users the option to sort movies</li>
<li>The application must initially use Parcel as its build tool</li>
<li>The application must be written using the React library and in ES2015+</li>
<li>The application must be written with React Redux (hence respecting the Flux pattern)</li>
<li>The application must use Bootstrap as a UI library for styling and responsiveness</li>
<li>The application must contain a mix of class components and function components</li>
<li>The application may be hosted online</li>
</ul>

### What challenges did I face, what did I learn?

... from installing React

- in 2021 React 18 introduced a new root API, namely ReactDOM.createRoot. It is no longer necessary to pass the container into the render. This means that one needs to replace render with createRoot. For more information, click here https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html

... from installing Parcel

- Project setup: in the package.json the entry point may not be "main", because main is used as the output file of the build. Instead define the source code for the library as follows:

```bash
"source": "src/index.html"
```

Use index.html as entry point for build process: parcel src/index.html

- Parcel: the command parcel src/index.html threw an error, saying

```bash
@parcel/package-manager: Could not find module "@parcel/transformer-sass" satisfying 2.0.0-rc.0
```

the solution was to remove the @oarcel/transformer-sass:^2.4.1 from the package.json, deleting node-modules and package-lock.json file and then run npm install. As a result the version 2.0.0-rc.0 was installed and added as a dependencies.

- Parcel build process threw error, which was solved by adding type="module" to script tag in index.html
- add to package.json

```bash
"start": "parcel", // parcel watch + dev server
"watch": "parcel watch", // parcel build + automatic reload
"build": "parcel build"
```

- There is a new version of react-router-dom (6.3.0) which differs significantly from the version used by CF (v.5.3.0). I had to downgrade to the older version in order to be able to follow the directions provided by CF for routing between the views.

- React Redux has some pitfalls when loading data from an API (in this case, waiting for the user and movies state to be successfully set before setting the favorite movies state). Therefore, try using Redux toolkit (RTK) to fix this!

- Avoid passing down props to more than one compnent, bad practice! (props drilling) --> Use state managment! (e.g., Redux)

## How to install and run the project ...

### ... as a developer, who wants to work with the project

1. Clone or download repository ...

```bash
git clone https://github.com/sulfidate/myCinemovieApp-Client.git
```

2. Run parcel to build

```bash
parcel src/index.html
```

## Technical Requirements (according to project brief)

- SPA application built using React
- Navigate between views using react-router-dom
- Use Parcel as build tool
- Use react-bootstrap for UI
- Use React Redux for state management (respecting the Flux pattern)
- Use both class and function components
- Use axios to connect to API (providing user and movie information)

## Development Process of the Client-Side for the Application

### Create React components for each view

- Main View routes to all sub views using react-router-dom
- Create functional component for each sub view // distinct functionality in view
- Use bootstrap Card component to create Movie card for each movie

### Connect to database via axios

- Get data on movies and users from API using axios library

### Use Redux for state management

- User & movie data is accessed and modified from different components --> Use redux to mangage state in one place (store)
- Same for favorite movies --> Has to be loaded once both user and movie data states are successfully set
