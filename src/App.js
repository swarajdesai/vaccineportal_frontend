
import './App.css';
import SignInOutContainer from './components/login_logout/loginLogoutContainer';
import {Route , BrowserRouter , Switch} from 'react-router-dom'
import { Login } from '@mui/icons-material';
import NavBar from './components/navbar';
// import { Switch } from '@mui/material';
import Alert from '@mui/material/Alert';
import React, { useState } from 'react';


function App() {
  const [alertData,setAlertData]=useState({"alertDisplay":"visible","text":"this is text","severity":"error"})
  const setAlert=(display,text,sevr)=>{
    setAlertData({"alertDisplay":display,"text":text,"severity":sevr});
    setTimeout(() => {
      setAlertData({"alertDisplay":"hidden","text":text,"severity":sevr});
  }, 3000);
  }
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Alert severity={alertData.severity} style={{marginTop:"60px",justifyContent:"center",visibility:alertData.alertDisplay}}>
          {alertData.text}
        </Alert>
        {/* <Alert severity="warning" style={{marginTop:"60px",visibility:"hidden"}}>
          Hiii
        </Alert> */}
       
        <Switch>
        {/* <Routes> */}
      <Route exact path="/">
      <SignInOutContainer setAlert={setAlert}/>
      </Route>
      <Route exact path="/login">
      <Login />
      </Route>
      {/* </Routes> */}
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
