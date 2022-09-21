
class AuthenticationService {
//   authenticateUser(userName, pwd) {
//     //make api call for auth
//     console.log('auth call', userName, pwd);
//     return axios.post('http://localhost:8080/api/signin', {
//       userName: userName,
//       password: pwd,
//     });
//   }
  // getBasicAuthToken(userName, password) {
  //   return 'Basic ' + window.btoa(userName + ':' + password);
  // }
  
  storeUserDetails(roles, jwt) {
    // console.log('add user');
    //since user has logged in : now for every request to the backend : add req auth interceptor
    // this.setupRequestInterceptor(jwt);
    //user has logged in successfully : so add it's details under session storage
    localStorage.setItem('auth_token', jwt);
    localStorage.setItem("auth_roles",roles);
  }
  removeUserDetails() {
    console.log('rem user');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_roles');
  }
  isUserLoggedIn() {
    
    return localStorage.getItem('auth_token') === null ? false : true;
  }
  isAdminUser(){
    return this.isUserLoggedIn() && JSON.parse(localStorage.getItem('auth_roles')).includes("ROLE_ADMIN") ? true : false;
  }
  isNormalUser(){
    return this.isUserLoggedIn() && JSON.parse(localStorage.getItem('auth_roles')).includes("ROLE_USER") ? true : false;
  }
  getHeaders(){
    let auth_token=localStorage.getItem('auth_token') === null ? "":localStorage.getItem('auth_token')
   return {
        "Authorization":`Bearer ${auth_token}`,
        "Content-Type": "application/json",
      }
  }
//   getUserName() {
//     return sessionStorage.getItem('user_dtls');
//   }

  //set up axios request interceptor for JWT
//   setupRequestInterceptor(jwt) {
//     //  const basicAuth = 'Basic ' + window.btoa(userName + ':' + password);

//     axios.interceptors.request.use((config) => {
//       if (this.isUserLoggedIn()) {
//         //adding the authorization header to config
//         config.headers.authorization = 'Bearer ' + jwt;
//       }
//       //return config
//       return config;
//     });
//   }
}
//export it's instance , so that it's methods can be called from components
export default new AuthenticationService();
