import React,{useEffect, useState} from 'react';
import './App.css';
import Config from './config'

function App() {
  const [isSignedIn , setIsSignedIn] = useState(false)
  
  useEffect(()=>{
    window.gapi.load('auth2',()=>{
      window.gapi.auth2.init({
        client_id:Config.oAuthId
      }).then(()=>{
        window.gapi.signin2.render('my-signin', {
          'scope': 'profile email',
              'width': 250,
              'height': 50,
              'longtitle': false,
              'theme': 'light',
              'onsuccess': onSuccess,
              
        })
      })
    })
  },[])
  return (
    <>
    <div>hi</div>
    <div id='my-signin' />
    <div onClick={onSignOut}>sign out</div>
    </>
  );
}

const onSuccess=(googleUser) =>{
  var profile = googleUser.getBasicProfile();
  const token = googleUser.getAuthResponse().id_token
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  console.log('token:', token)
}

const onSignOut =() => {
  console.log('signed out!')
  window.gapi.auth2.getAuthInstance().then((googleAuth)=>{
    googleAuth.signOut()
  })
}

export default App;
