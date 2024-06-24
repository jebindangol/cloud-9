import React, { Component } from "react";
import Link from "../../utils/ActiveLink";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Router from "next/router";
const MySwal = withReactContent(Swal);


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      validate: {
        emailState: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  errorContent = (errorMsg) => {
    MySwal.fire({
      title: "Error!",
      text: "Login Failed! " + errorMsg,
      icon: "error",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: true,
    });
  };

  handleChange = (event) => {
    
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  };

  validateEmail(e) {
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const { validate } = this.state;

    if (emailRex.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }

    this.setState({ validate });
  }

  submitForm = async (e) => {
    
    e.preventDefault();
    await signIn("credentials", {
      email: this.state.email,
      password: this.state.password,
      callbackUrl: "/home",
      redirect: false
    }).then((res) => {
        if (res.ok) {
          Router.replace("/home")
        } else {
          this.errorContent(res.error);
        }
      })
      .catch((err) => {
        this.errorContent(err);

      });
    
  };
  render() {
    
    const { email, password } = this.state;
    return (
      <>
        <div className="login-area ptb-100">
          <div className="container">
            <div className="login-form">
              <h2>Welcome! Login Here</h2>
              <p>
                Please Login Or Create New Account To Enroll Loyalty Program
              </p>
             
              <form role="form"  onSubmit={(e) => this.submitForm(e) } >
              
                <div className="form-group" >
                  <label >User Name or Email Address *</label>
                  <input 
                    name="email"
                    type="email"
                    className="form-control"
                    autoComplete="new-email"
                    placeholder="Email address"
                    // valid={this.state.validate.emailState === "has-success"}
                    // invalid={this.state.validate.emailState === "has-danger"}
                    value={email}
                    onChange={(e) => {
                      this.validateEmail(e);
                      this.handleChange(e);
                    }}
                    required
                  />
                </div>
                
                

                <div className="form-group">
                  <label>Password</label>
                  <input
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => this.handleChange(e)}
                    required
                  />
                </div>

                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-6 col-sm-6 remember-me-wrap">
                    <p>
                      <input
                        name="checkbox"
                        type="checkbox"
                        id="customCheckLogin"
                      />
                      <label htmlFor="customCheckLogin">Remember me</label>
                    </p>
                  </div>
                  
                 

                  {/* <div className="col-lg-6 col-md-6 col-sm-6 lost-your-password-wrap">
                    <Link href="/forgot-password">
                      <a className="lost-your-password">
                        Lost your password?
                      </a>
                    </Link>
                  </div> */}
                </div>

                <button className="default-btn">
                  Login Now
                </button>
                
                <div className="account-text">
                  <span>
                    Don’t have an account! Wanna Enroll In Our Loyalty Program?{" "}
                    <br />
                    Please contact{" "}
                    <a href="tel:+1 (817) 4206102">(817) 420 6102</a>
                    <Link legacyBehavior href="/registration">
                      <a
                        style={{
                          padding: "0px 20px",
                          color: "#8898aa",
                          fontWeight: "bold",
                        }}
                      >
                        Create Account
                      </a>
                    </Link>
                  </span>
                </div>
               
              </form>
              
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LoginForm;
