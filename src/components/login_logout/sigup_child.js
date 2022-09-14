import React, { useState } from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
const Signup = (props) => {
  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const marginTop = { marginTop: 5 };
  const inpStyle = { marginBottom: "5px" };
  // const [isInvalidForm,setIsInvalidForm]=useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    phoneNo: "",
    gender: "F",
    confPass: "",
  });

  const validators = {
    name: /^[a-zA-Z]+$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password: /^[a-zA-Z0-9!@#$]{8,}$/,
    age: /^[1-9][0-9]$/,
    gender: /^F|M$/,
    phoneNo: /^[1-9]([0-9]{9})$/,
    confPass: new RegExp(formData.password),
  };
  const validatorMessage = {
    name: "Please Enter valid Name",
    email: "Enter valid Email",
    password: "Enter password with minimum 8 length a-z A-Z 0-9 !@#$",
    age: "Enter age between 1-99",
    phoneNo: "Please Enter valid 10 digit Phone number",
    confPass: "Both Passwords should match",
    gender: "Please Select Gender",
  };
  const [validationStatus, setValidationStatus] = useState({
    name: [false, ""],
    email: [false, ""],
    password: [false, ""],
    age: [false, ""],
    gender: [true, "validd"],
    phoneNo: [false, ""],
    confPass: [false, ""],
  });

  const handleChange = (event) => {
    console.log(event);
    setValidationStatus({
      ...validationStatus,
      [event.target.name]: [false, ""],
    });
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (!validators[event.target.name].test(event.target.value)) {
      setValidationStatus({
        ...validationStatus,
        [event.target.name]: [true, validatorMessage[event.target.name]],
      });
    }
    if (
      (event.target.name === "age" || event.target.name === "phoneNo") &&
      event.target.value[0] === "0"
    )
      event.target.value = event.target.value.substr(1);

    // updateFormValidity();
    // console.log(  validationStatus,formData)
  };

  const handleSubmit = (e) => {
    let temp = validationStatus;
    let isValid = true;
    for (var key in validators) {
      if (!validators[key].test(formData[key])) {
        temp = { ...temp, [key]: [true, validatorMessage[key]] };
        isValid = false;
      }
    }
    setValidationStatus(temp);
    e.preventDefault();
    if (!isValid) {
      console.log("returned");
      return false;
    } else {
      register();
    }
  };

  const register = async (event) => {
    

    const response = await fetch("http://localhost:9595/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        gender: formData.gender,
        age: parseInt(formData.age),
        phoneNumber: formData.phoneNo,
        roles:["ROLE_USER"]
      }),
    });
    const json = await response.json();
    if (response.ok) {
        props.setAlert("visible",json.message,"success");
    } else {
        console.log("err",JSON.stringify(json));
      props.setAlert("visible",json.message,"error");
    }
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Sign Up</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            helperText={validationStatus.name[1]}
            error={validationStatus.name[0]}
            onChange={handleChange}
            style={inpStyle}
            fullWidth
            label="Name"
            placeholder="Enter your name"
            name="name"
          />
          <TextField
            style={inpStyle}
            onChange={handleChange}
            helperText={validationStatus.email[1]}
            error={validationStatus.email[0]}
            name="email"
            fullWidth
            label="Email"
            placeholder="Enter your email"
          />
          <FormControl component="fieldset" style={marginTop}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              defaultValue="F"
              onChange={handleChange}
              name="gender"
              style={{ display: "initial" }}
            >
              <FormControlLabel value="F" control={<Radio />} label="Female" />
              <FormControlLabel value="M" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          <TextField
            style={inpStyle}
            helperText={validationStatus.age[1]}
            error={validationStatus.age[0]}
            onChange={handleChange}
            name="age"
            fullWidth
            label="Age"
            placeholder="Enter your age"
          />

          <TextField
            style={inpStyle}
            helperText={validationStatus.phoneNo[1]}
            error={validationStatus.phoneNo[0]}
            onChange={handleChange}
            name="phoneNo"
            fullWidth
            label="Phone Number"
            placeholder="Enter your phone number"
          />
          <TextField
            helperText={validationStatus.password[1]}
            error={validationStatus.password[0]}
            onChange={handleChange}
            style={inpStyle}
            name="password"
            fullWidth
            label="Password"
            placeholder="Enter your password"
          />

          <TextField
            helperText={validationStatus.confPass[1]}
            error={validationStatus.confPass[0]}
            onChange={handleChange}
            style={inpStyle}
            name="confPass"
            fullWidth
            label="Confirm Password"
            placeholder="Confirm your password"
          />
          <Button type="submit" variant="contained" color="primary">
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signup;
