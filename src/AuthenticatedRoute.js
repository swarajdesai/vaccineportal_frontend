import { Redirect, Route } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

export default function AuthenticatedRoute(props) {
    if (AuthenticationService.isUserLoggedIn()) {
      return <Route {...props} />;
    } else {
        props.setAlert("visible","Please Login","danger");
      return <Redirect to='/' />;
    }
  }