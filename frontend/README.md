# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



.register-container {
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #4CAF50, #2E7D32); /* Green gradient */
  background-image: url('https://img.freepik.com/premium-photo/spring-nature-concept_52701-112.jpg?w=2000'); /* Nature background */
  background-size: cover;
  background-position: center;
}

/* .register-form{
    max-width: 350px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
    text-align: left;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    margin-top: 50px;
    
    
} */

.register-form {
  width: 350px;
  padding: 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.9); /* White box with transparency */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  backdrop-filter: blur(5px);
}



h2 {
  color: #2E7D32;
  font-size: 24px;
  margin-bottom: 15px;
}


.register-form h2{
    text-align: center;
}

 .register-form label{
    margin-top: 10px;
} 

.register-form span {
    font-weight: bold;
   
  }

  /* .register-form input, .register-form select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  } */

  input, select {
    width: 90%;
    padding: 12px;
    margin: 8px 0;
    border: 1px solid #A5D6A7;
    border-radius: 5px;
    background: #E8F5E9;
    font-size: 16px;
    outline: none;
}

  .register-form button {
    width: 100%;
    padding: 10px;
    margin-top: 15px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .register-form button:hover {
    background-color: #218838;
  }

   {
                    !isAuthenticated ?(<>
                        <Link to="/Login">Login</Link>
                        <Link to="/Register">Register </Link>
                        </>
                    ):(
                        <>
                        {role === "admin" && <Link to="/Admin">Admin</Link>}

                        <button onClick={handleLogOut} className="logout-btn">Logout</button>

                        </>
                    )
   }