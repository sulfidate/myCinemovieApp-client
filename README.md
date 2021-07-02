<h1>Project Achievement 3 - React App (myCinemovieApp)</h1>
<h5>Start 29.06.2020</h5>

<h2>task 3.3:</h2>
1.-4. create components-folder with three components: </br>
--- main-view: has the movies array state with at least 3 movies -> renders them as MovieCard,</br>
--- movie-card: displays a basic movie summary, </br>
--- movie-view: displays further information like movie’s title, description and poster image,</br>
5. create code that let users go to the MovieView when clicking a MovieCard (master-detail pattern)
6. Add a "back"-button to MovieView to go back to MainView's original state
7. build project and test functionallity locally</br>
8. commit changes and push them to GitHub</br>
</br>

-> current directory/file structure
  myCinemovieApp-client</br>
  |--- package.json,README.md</br>
  |--- src/components/</br>
  | |--- main-view/main-view.jsx</br> 
  | |--- movie-card/movie-card.jsx</br> 
  | |--- movie-view/movie-view.jsx</br>   
  |--- dist/</br>
  | |--- index.html</br> 
  | |---- index.faa115f8.css</br> 
  | |---- index.faa115f8.css.map</br>
  | |---- index.c91888ee.js </br>
  | |---- index.c91888ee.js.map</br>
</br>


<h2>task 3.2:</h2>
-> Create a new repo "myCinemovieApp-client" to build the app with the build tools. 
  To do this, I created a new directory "-client" with a predefined structure and filled it with the relevant files:</br>

  myCinemovieApp-client</br>
  |--- package.json</br>
  |--- src/</br>
  | |---- index.html</br> 
  | |---- index.scss </br>
  | |---- index.jsx</br>
</br>
-> Installing and configuring parcel & react and build project with output of 4 hashed-name files in new dist-directory:</br>
</br>
 myCinemovieApp-client</br>
  |--- dist/</br>
  | |---- index.html</br> 
  | |---- index.faa115f8.css</br> 
  | |---- index.faa115f8.css.map</br>
  | |---- index.c91888ee.js </br>
  | |---- index.c91888ee.js.map</br>
  </br>
-> open browser on http://localhost:1234 with output "Good morning" in css: steelblue to verify correct implementing of parcel and  the filestructure.</br>

<h3>Error message on client side: -> </h3> "@parcel/package-manager: Could not find module "@parcel/transformer-sass" satisfying 2.0.0-beta.2" => this message appears because there is a different version of @parcel/transformer-sass on the clients local machine.</br>
Troubleshooting: -> To fix this, the dependence must be deleted (-> using "npm uninstall < - pkg name - >". When the user restarts the build, a new matching version of "@parcel/transformer-sass" will automatically be installed.</br>

<h2>Project Brief:</h2>

<h2>Objective</h2>
Using React, build the client-side for an application called myFlix based on its existing server-side code (REST API and database).

<h2>Context</h2>
Client-side development hasn’t always been so prominent. In the past, pages would be generated on the server-side and sent to the browser, resulting in a poor user experience. Thanks to modern browsers and libraries such as React, the client-side of an application is today considered to be just as important as the server-side. As a student of full-stack development, you need to be skilled in both the server-side and client-side.
In the previous Achievement, you built the server-side for a movie application called myFlix. The API and database that you built meet the information needs of myFlix users. Now, you need to create the interface they will use when making requests to, and receiving responses from, the server-side. The client-side of your myFlix application will include several interface views built using the React library that will handle data through the previously-defined REST API endpoints.
The code you write impacts both your users and your fellow developers. As you work through this Achievement, you’ll need to consider, among other things, the readability and maintenance of your codebase, and the design and usability of your application.
By the end of the Achievement, you’ll have a complete web application (client-side and server-side) built using full-stack JavaScript technologies, which you can showcase in your portfolio. This project will demonstrate your mastery of full-stack JavaScript development. The complete tech stack you’ll master is known as the MERN (MongoDB, Express, React, and Node.js) stack.

<h2>The 5 W’s</h2>
1. Who—The users of your myFlix application. They will be movie enthusiasts who enjoy reading information about different movies.</br>
2. What—A single-page, responsive application with routing, rich interactions, several interface views, and a polished user experience. The client-side developed in this Achievement will support the existing server-side from Achievement 2 by facilitating user requests and rendering the response from the server-side via a number of different interface views.</br>
3. When—myFlix users will be able to use it whenever they want to read information about different movies or update their user information​—​for instance, their list of “Favorite Movies.”</br>
4. Where—The application will be hosted online. The myFlix application itself is responsive and can therefore be used anywhere and on any device, giving all users the same experience.</br>
5. Why—Movie enthusiasts like to be able to access information about different movies, directors, and genres, whenever they want to. Having the ability to save lists of favorite movies will ensure users always have access to the films they want to watch or recommend to their peers.</br>
</br>
</br>
<h2>Design Criteria</h2>
</br>
<h3>User Stories</h3>
● As a user, I want to be able to access information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.</br>
● As a user, I want to be able to create a profile so I can save data about my favorite movies.</br>
</br>
<h3>Features & Requirements</h3>
The feature requirements below were extracted from the user stories listed above. </br>
​Your project will only be approved if the following “essential” feature requirements are implemented in your Achievement project​.</br>
</br>
<h4>Essential Views and Features</h4>
Main view</br>
● Returns a list of ALL movies to the user (each listed item with an image, title, and description)</br>
● Sorting and filtering</br>
● Ability to select a movie for more details</br>
Single movie view</br>
● Returns data (description, genre, director, image) about a single movie to the user</br>
● Allows users to add a movie to their list of favorites</br>
Login view</br>
● Allows users to log in with a username and password</br>
Registration view</br>
● Allows new users to register (username, password, email, birthday)</br>
Genre view</br>
● Returns data about a genre, with a name and description</br>
● Displays example movies</br>
Director view</br>
● Returns data about a director (name, bio, birth year, death year)</br>
● Displays example movies</br>
Profile view</br>
● Allows users to update their user info (username, password, email, date of birth)</br>
● Allows existing users to deregister</br>
● Displays favorite movies</br>
● Allows users to remove a movie from their list of favorites</br>
</br>
<h4>Optional Views and Features</h4>
Single movie view and all movies views</br>
● Allow users to see which actors star in which movies</br>
● Allow users to view more information about different movies, such as the release date and the movie rating</br>
Actors view</br>
● Allows users to view information about different actors Profile view, single movie view, and all movies view</br>
● Allow users to create a “To Watch” list in addition to their “Favorite Movies” list</br>
</br>
<h3>Wireframes</h3>
You can download wireframes for each of the views for your project here: ​myFlix wireframe pack </br>
</br>
<h2>Technical Requirements</h2>
● The application must be a single-page application (SPA)</br>
● The application must use state routing to navigate between views and share URLs</br>
● The application must give users the option to filter movies</br>
● The application must give users the option to sort movies</br>
● The application must initially use Parcel as its build tool</br>
● The application must be written using the React library and in ES2015+</br>
● The application must be written with React Redux (hence respecting the Flux pattern)</br>
● The application must use Bootstrap as a UI library for styling and responsiveness</br>
● The application must contain a mix of class components and function components</br>
● The application may be hosted online</br>
</br>
