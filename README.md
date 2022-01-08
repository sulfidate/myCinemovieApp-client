<h1>Project Achievement 3 - myMovieApp (React)</h1>
<h5>Start 08.01.2022</h5>

<h1>project myMovieApp</h1>
<h2>Objective</h2>
<p>Using React, build the client-side for an application called myFlix based on its existing server-side code (REST API and database).</p>

<h2>Progress</h2>

<ul>
<li>Task 3.1:
<p>In this task, i've decided which library or framework i want to use to build my movie application.</p>
</li>
<li>Task 3.2:
<p>In this task, i've used build tools to build my movie application. In particular, i've set up my app-client directory with the relevant files and dependencies and use parcel to complete the necessary build operations for my project.</p>
</li><li>Task 3.3:
<p></p>
</li><li>Task 3.4:
<p></p>
</li><li>Task 3.5:
<p></p>
</li><li>Task 3.6:
<p></p>
</li>
<li>Task 3.7:
<p></p>
</li><li>Task 3.8:
<p></p>
</li>
</ul>

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
<ul>
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
