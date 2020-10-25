import React from 'react';
import { Button, Form } from 'react-bootstrap';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
firebase.initializeApp(firebaseConfig)

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success:false
    });
    const [newUserInfo, setNewUserInfo] = useState({
        // name:'',
        // email: '',
        // password:''
    });





    // console.log(newUser)
    const handleBlur = (e) => {
        // const newUserInformation = {...newUserInfo};
        //     newUserInformation[e.target.name] = e.target.value;
        //     setNewUser(newUserInformation);
        //    console.log(newUserInformation)
        let fieldValid = true;

        if (e.target.name === 'email') {
            // const passLength = e.target.value.length > 6;
            const fieldValid = /\S+@\S+\.\S+/.test(e.target.value)

        }
        if (e.target.name === 'password') {

            fieldValid = /\d/.test(e.target.value) && e.target.value.length > 6;
  
        }
        if (fieldValid) {
            const userInfo = { ...user };
            userInfo[e.target.name] = e.target.value;
            setUser(userInfo)
        }
    }

    const handleSubmit = (e) => {


        // this code is for crating new user 
        if ( newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res =>{
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo)
                updateUserName(user.name)
                console.log(res.user)
            })
            .catch(function(error) {
                var errorMessage = error.message;
                console.log(errorMessage)
                const newUserInfo = {...user};
                newUserInfo.error = errorMessage;
                newUserInfo.success = false;
                setUser(newUserInfo)

                // ...
              });
        }

        //this code is for login who has an account
        if(!newUser && user.password && user.email){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res =>{
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo)
            })
            .catch(function(error) {
                // Handle Errors here.
               var errorMessage = error.message;
                const newUserInfo = {...user};
                newUserInfo.error = errorMessage;
                newUserInfo.success = false;
                setUser(newUserInfo)
              });
        }

        e.preventDefault();
    }


    var provider = new firebase.auth.GoogleAuthProvider();
    const signInWithGoogle = ()=>{
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }

    const updateUserName = name =>{
        var user = firebase.auth().currentUser;

user.updateProfile({
  displayName: name,
}).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
});
    }
    return (
        <div>
            <h2>name: {user.name}</h2>
            <h2>email: {user.email}</h2>
            <h2>password: {user.password}</h2>
            <h1 className="my-4 text-center">{newUser ? "Sign up form" : "Login"}</h1>
            <Form onSubmit={handleSubmit}>
                {newUser && <Form.Group controlId="formBasicEmail">
                    <Form.Control name="name" type="text" placeholder="Enter Name" onBlur={handleBlur} required />
                </Form.Group>}

                <Form.Group controlId="formBasicEmail">
                    <Form.Control name="email" type="email" placeholder="Enter email" onBlur={handleBlur} required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">

                    <Form.Control name="password" type="password" placeholder="Password" onBlur={handleBlur} required />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="New user" onChange={() => setNewUser(!newUser)} />
                </Form.Group>

                {newUser ? <Button variant="primary py-2" type="submit">
                    Create New Account
  </Button> : <Button variant="primary py-2" type="submit">Login</Button>}
   {user.error && <p style={{color:"red"}}> {user.error}</p>}
   {user.success && <p style={{color:"green"}}>Account {newUser ?"Created": "Login"} Successfully</p>}
            </Form>
            <Button onClick={signInWithGoogle} className="btn-danger my-4">SignIn with google</Button>
        </div>
    );
};

export default Login;






