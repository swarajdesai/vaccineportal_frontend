import { Redirect, Route } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

export default function AuthenticatedRoute({setAlert , component:ComponentToRender , ...props}) {
   console.log("auth route ",props);
    if (AuthenticationService.isUserLoggedIn()) {
      return <Route  render={p => <ComponentToRender {...props } {...p} setAlert={setAlert} />} {...props } />;
    } else {
        setAlert("visible","Please Login","danger");
      return <Redirect to='/' />;
    }
  }