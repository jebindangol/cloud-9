import React, { Component } from "react";
import Link from "../../utils/ActiveLink";
import { signIn } from "next-auth/react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      password: "",
      validate: {
        emailState: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  errorContent = () => {
    MySwal.fire({
      title: "Error!",
      text: "Registration Failed!. Please try again",
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

  loginUser = async () => {
    const res = await signIn("credentials", {
      email: this.state.email,
      password: this.state.password,
      callbackUrl: `${window.location.origin}/`,
    });
  };

  submitForm = async (e) => {
    e.preventDefault();
    const res = await axios
      .post(
        "/api/register",
        {
          fullname: this.state.fullname,
          email: this.state.email,
          dob: this.state.dob,
          phone: this.state.phone,
          password: this.state.password,
          gender: this.state.gender,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async () => {
        await this.loginUser();
      })
      .catch((error) => {
        console.error(error);
        this.errorContent();
      });

  };
  render() {
    const currentDate = new Date();
    const maxDate = new Date(
      currentDate.getFullYear() - 21,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const maxDateString = maxDate.toISOString().split("T")[0];
    const { fullname, phone, dob, email, password, gender } = this.state;
    return (
      <>
        <div className="register-area ptb-100">
          <div className="container">
            <div className="register-form">
              <h2>Create Your Account</h2>
              <p>Create Account And Enroll To Our Loyalty Program</p>

              <form role="register-form" onSubmit={(e) => this.submitForm(e)}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    className="form-control"
                    placeholder="Full name"
                    onChange={(e) => this.handleChange(e)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                    name="email"
                    autoComplete="new-email"
                    valid={this.state.validate.emailState === "has-success"}
                    invalid={this.state.validate.emailState === "has-danger"}
                    value={email}
                    onChange={(e) => {
                      this.validateEmail(e);
                      this.handleChange(e);
                    }}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>DOB</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="DOB"
                    name="dob"
                    autoComplete="dob"
                    min="1900-01-01"
                    max={maxDateString}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    name="phone"
                    autoComplete="phone"
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    className="form-control"
                    name="gender"
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {/* <Form.Group controlId="formGender" style={formStyle}>
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              isInvalid={errors.gender}
              onFocus={() => setErrors({ ...errors, gender: "" })}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Control>
            {errors.gender && (
              <Form.Control.Feedback type="invalid">
                {errors.gender}
              </Form.Control.Feedback>
            )}
          </Form.Group> */}

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => this.handleChange(e)}
                    required
                  />
                </div>

                {/* <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    autoComplete="confirm-password"
                    value={password}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div> */}

                <p className="description">
                  The password should be at least eight characters long. To make
                  it stronger, use upper and lower case letters, numbers, and
                  symbols like ! ? $ % ^ & )
                </p>

                <button type="submit" className="default-btn">
                  Create Account
                </button>

                <div className="account-text">
                  <span>
                    Already have an account?{" "}
                    <Link legacyBehavior href="/signin">
                      <a>Login</a>
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

export default RegisterForm;
