
import './App.css';
import SignInOutContainer from './components/login_logout/loginLogoutContainer';
import {Route , BrowserRouter , Switch} from 'react-router-dom'

import React, {  useState } from 'react';
import Home from './components/home';
import PopAlert from './components/popAlert';
import BsNavBar from './components/bsNavBar';
import AuthenticatedRoute from './AuthenticatedRoute';
import AuthenticationService from './AuthenticationService';
import Hospitals from './components/hospitals';
import ErrorComponent from './components/errorComponent';
import MyBookings from './components/myBookings';
import MyProfile from './components/myProfile';


function App() {
  const [alertData,setAlertData]=useState({"alertDisplay":"hidden","text":"this is text","severity":"danger"})
  const setAlert=(display,text,sevr)=>{
    setAlertData({"alertDisplay":display,"text":text,"severity":sevr});
    setTimeout(() => {
      setAlertData({"alertDisplay":"hidden","text":text,"severity":sevr});
  }, 3000);
  }
  const [isLoggedIn , setIsUserLoggedIn] =useState( AuthenticationService.isUserLoggedIn());
  return (
    <div className="App">
      <BrowserRouter>
      {/* <NavBar alertData={alertData}/> */}
      {/* <Alert severity={alertData.severity} style={{marginTop:"60px",justifyContent:"center",visibility:alertData.alertDisplay}}>
          {alertData.text}
        </Alert> */}
        
       <BsNavBar isLoggedIn={isLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} />
       <PopAlert alertData={alertData} />
         
        <Switch>
        
      <Route exact path="/">
        <SignInOutContainer setAlert={setAlert} isLoggedIn={isLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn}/>
      </Route>
      
      
      <AuthenticatedRoute
            exact
            path='/myProfile'
            component={MyProfile}
            setAlert={setAlert}
      />
      <AuthenticatedRoute
            exact
            path='/home'
            component={Home}
            setAlert={setAlert}
      />
      <AuthenticatedRoute
            exact
            path='/hospitals/:id'
            component={Hospitals}
            setAlert={setAlert}
      />
      <AuthenticatedRoute
            exact
            path='/myBookings'
            component={MyBookings}
            setAlert={setAlert}
      />
      <Route component={ErrorComponent}></Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
