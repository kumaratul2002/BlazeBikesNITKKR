import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/actions/userActions";
import { Grid, Typography, Button, TextField } from "@mui/material";
import Spinner from "../components/Spinner";
import {message} from 'antd'
import logo from "../assets/Logo2.jpg"
import loginimage from "../assets/LB.png"
function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

 
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
        username: values.username,
        password: values.password,
        cpassword:values.cpassword
      };
      if(!formData.username||!formData.password||!formData.cpassword){
        message.error('All fields are required')
      }
      else if(formData.password!=formData.cpassword){
        message.error('Password and confirm password do not match.')
      }
      else if(formData.password.length<8){
        message.error('Password length should be at least 8')
      }
    
      else {
        
        console.log(formData);
        dispatch(userRegister(formData))
        // Dispatch user login action or perform further actions here
      }
  };

  return (
    <div style={{  backgroundColor: "#806a6a" }}>
      {loading && <Spinner />}

      <Grid
        container
        style={{ minHeight: "100vh", padding: "50px", backgroundColor: "#806a6a" }}
      >
        <Grid
          container
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid xs={12} sm={12} md={6} lg={6}>
            <img
              src={loginimage}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="Background"
            />
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={6} style={{ backgroundColor: "white" }}>
          <Grid container item justifyContent="flex-end"
          alignItems="center" sx={{ marginBottom:'15px' }}>
    <img src={logo} style={{width:'12%',marginTop:'3%',marginRight:'5%' }}></img>
  </Grid>
            <Grid
              style={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">User Registration</Typography>
              <Typography variant="body1">
                Hey, enter your details to register your account !!
              </Typography>
              <br />
              <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                required
                id="standard-required"
                label="Username"
                variant="standard"
                value={values.username}
                onChange={handleChange("username")}
                sx={{ m: 1, width: "25ch" }}
              />
              <br />
              
              <TextField
                type="password"
                id="standard-password-input"
                autoComplete="current-password"
                label="Password"
                variant="standard"
                value={values.password}
                required
                onChange={handleChange("password")}
                sx={{ m: 1, width: "25ch" }}
              />
                
                <br />
                <TextField
                type="password"
                id="standard-password-input"
                autoComplete="current-password"
                label="Confirm Password"
                variant="standard"
                value={values.cpassword}
                required
                onChange={handleChange("cpassword")}
                sx={{ m: 1, width: "25ch" }}
              />
                
                <br />
              <Button
               type ="submit"
                variant="contained"
                sx={{ m: 1, width: "30ch" }}
                
              >
                Register
              </Button>
              
              </form>
              <br />
              <Typography>Already have a account? <Link to="/login">Login Here</Link></Typography>
            
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
