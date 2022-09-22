import React, { useState } from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {NavLink, useHistory} from 'react-router-dom'
import AuthenticationService from '../../AuthenticationService';

const Login=(props)=>{

    const paperStyle={padding :20,height:'65vh',width:300, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const inpStyle ={margin:'5px 0'}
    const history = useHistory();

    const [formData , setFormData]=useState({"email":"","password":""});
    const handleChange = (event) =>{
        setFormData({...formData,[event.target.name]:event.target.value});
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:9595/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      }),
    });
    const json = await response.json();
    if (response.ok) {
        props.setAlert("visible",json.message,"success");
        AuthenticationService.storeUserDetails(json.roles , json.jwt);
        props.setIsUserLoggedIn(true);
        history.push('/home');
    } else {
        console.log("err",JSON.stringify(json));
        props.setIsUserLoggedIn(false);
        props.setAlert("visible",json.message,"danger");
    }
    }
    return(
        <Grid>
            <Paper  style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                <TextField style={inpStyle} onChange={handleChange} name ="email" label='Email' placeholder='Enter Email' type="email" fullWidth required/>
                <TextField style={inpStyle} onChange={handleChange} name="password" label='Password' placeholder='Enter password' type='password' fullWidth required/>
                
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                </form>
                <Typography component={"span"}>
                     <NavLink to="/login" >
                        Forgot password ?
                     </NavLink>
                </Typography>
                
            </Paper>
        </Grid>
    )
}

export default Login