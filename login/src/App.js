// import './App.css';
import './login.css';
import React,{useEffect, useState} from 'react'
import { Button, Form, Row, Spinner }from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
   const [values, setValues] = useState({username: "",password: ""});
  const { isValid } = true; 
  const isAuth = localStorage.getItem("auth");
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValidSubmit, setLoading] = useState(false);
  const [information, setInformation] = useState({
    blue: ["blue", null, "info message", "null"],
    red: ["red", null, "error message", "is-invalid"],
    yellow: [
      "orange",
      null,
      "warning message",
      "is-warning",
    ],
    green: ["green", null, "valid message", "null"],
  });

  const loginUser=true, isLoading=false, alertText="",showAlert=false,isLogedIn=false, userDetails={}
  let navigate = false;
  const errors = {
     uname: "invalid username",
     pass: "invalid password"
   };

  const handleChanges = (e) => {
       if(e.target.name === "username"){
        const inputEmail =  e.target.value;
        // handleChange({name: e.target.name, value: e.target.value})
        setEmail(inputEmail);
        
        setValues({ ...values, [e.target.name]: inputEmail });
      }else if(e.target.name === "password"){
        setValues({ ...values, [e.target.name]: e.target.value });
      }
    };

  const renderErrorMessage = (name) => {
    return name === errors[name] && (
      <div className='error'>{errors[name]}</div>
    );
  };

  const handleSubmit = async (e)=>{
        e.preventDefault() 
        setLoading(true)
        setIsSubmitted(true)
        // loginUser(values)
        if(isValid){
          loginUser(values);
        }else{
          // console.log("Invalid email format")
        }
  } 


  const renderForm = (
    <div className='form_container rounded bg-white'>
        <Form onSubmit={handleSubmit}>
            <div className='input-container mt-6'>
                <label htmlFor='emailaddress'>Email address</label>
                <input className='form-control' type="text" name='username' placeholder='enter email' onChange={handleChanges} value={values.username} required/>
                {renderErrorMessage("uname")}
                {/* {emailError && <div className='error'>{emailError}</div>} */}
                {/* {emailError === "Invalid email format." && <div>{emailError}</div>} */}
                  {(!isValid && !isLogedIn && isSubmitted) && <div className='error'>Invalid email format.{isLogedIn ?"true":"false"}</div>}
                  {/* {!isLogedIn&& <div className='error'>Invalid email format.{isLogedIn?"true":"false"}</div>} */}
            </div>
            <div className='input-container mt-3'>
                <label htmlFor="password" >Password</label>
                <input className='form-control' type="password" name='password' placeholder='enter password' onChange={handleChanges} value={values.password} required />
                {renderErrorMessage("pass")}
            </div>
            {/* <div className='button-container'>
                <button type='submit'>Sign In<span className='loader'></span></button>
            </div> */}
             <div className="d-flex justify-content-center">
                  <Button
                    type="submit"
                    // onClick={downloadExcel}
                    className="mt-4"
                  >
                    <span className="px-2">
                      Login
                    </span>
                        {isLoading ? <Spinner animation="border" /> : null}
                  </Button>
                </div>
        </Form>
    </div>
    
  )


  useEffect(()=>{
    if (showAlert && isLogedIn) {
        setIsSubmitted(true);
        // notify("User Login Successfully");
        localStorage.setItem("auth","Active")
        localStorage.setItem("userDetails",JSON.stringify(userDetails))
      }
      if(showAlert && !isLogedIn){
        // notify(alertText);
      }
      // if(alertText === "Invalid email format."){
      //   setEmailError(alertText)
      //   notifyError(alertText)
      // }
  },[alertText,showAlert])

  isAuth === "Active" && navigate("/v2/dashboard")

return (
  <>
    {/* <div className="app">
      <div className="login-form">
        <Row className="px-5 mb-3">
          <h3 className="title">Login to your account</h3>
        </Row>
        {isSubmitted && isValid && isLogedIn ? (
          navigate("/v2/dashboard")
        ) : (
          renderForm
        )}
      </div>
    </div> */}

    <div>
      <div className="wrapper">
        <div className="container main">
          <div className="row">
            <div className="col-md-6 side-image">
              {/* Replaced <Image> with <img>, as <Image> is not a standard HTML tag */}
              <img src="images/white.png" alt="Side Image" />
              <div className="text">
                <p>
                  Join the community of developers <i>- ludiflex</i>
                </p>
              </div>
            </div>
            <div className="col-md-6 right">
              <div className="input-box">
                <header>Create account</header>
                <div className="input-field">
                  <input
                    type="text"
                    className="input"
                    id="email"
                    required
                    autoComplete="off"
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    className="input"
                    id="pass"
                    required
                  />
                  <label htmlFor="pass">Password</label>
                </div>
                <div className="input-field">
                  <input type="submit" className="submit" value="Sign Up" />
                </div>
                <div className="signin">
                  <span>
                    Already have an account? <a href="#">Log in here</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

}

export default App;
