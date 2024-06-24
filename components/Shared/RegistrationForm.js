import React ,{Component} from "react";
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    Container,
  } from "reactstrap";
import { signIn } from 'next-auth/react'
import axios from "axios";
import baseUrl from '../../utils/baseUrl'

export default class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fullname: '',
          email: '',
          phone: '',
          dob: '',
          password: '',
          validate: {
            emailState: '',
          },
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange = (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
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
            validate.emailState = 'has-success';
        } else {
            validate.emailState = 'has-danger';
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
        const res = await axios.post(
            `/api/register`, {
                fullname: this.state.fullname,
                email: this.state.email,
                dob: this.state.dob,
                phone: this.state.phone,
                password: this.state.password
            },
            {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            }
        ).then(async () => {
            await loginUser();
        })
        .catch((error) => {
            console.error(error);
        });       
    }

    render() {
        const { fullname, phone, dob, email, password } = this.state;
        return (
            <>   
                <div className="header bg-gradient-info py-7 py-lg-7">
                    <Container>
                        <div className="header-body text-center">
                            <Row className="justify-content-center">
                                <Col lg="5" md="6">
                                    <h1 className="text-white">Welcome!</h1>
                                    <p className="text-lead text-light">
                                        Create new account to enroll in our loyalty program
                                        <br/>
                                        {/* We are proud introduced a loyalty program where our customers can benefit
                                                    with the reward points, they earn after their every purchase. We ensure that every dollar you
                                                    spent gives you a point which can be redeemed on your next purchase. (Customer must collect
                                                    100 points before they can redeem their points) */}
                                    </p>          
                                </Col>
                            </Row>
                        </div>
                    </Container>
                    <div className="separator separator-bottom separator-skew zindex-100">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                        >
                        <polygon
                            className="fill-default"
                            points="2560 0 2560 100 0 100"
                        />
                        </svg>
                    </div>
                 </div>
                <Container className="mt--1 pb-5">
                    <Row className="justify-content-center">
                    <Col lg="6" md="8">
                        <Card className="bg-secondary shadow border-0">
                            {/* <CardHeader className="bg-transparent pb-5">
                                <div className="text-muted text-center mt-2 mb-4">
                                <small>Sign up with</small>
                                </div>
                                <div className="text-center">
                                <Button
                                    className="btn-neutral btn-icon mr-4"
                                    color="default"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <span className="btn-inner--icon">
                                    <img
                                        alt="..."
                                        src={require("assets/img/icons/common/github.svg")}
                                    />
                                    </span>
                                    <span className="btn-inner--text">Github</span>
                                </Button>
                                <Button
                                    className="btn-neutral btn-icon"
                                    color="default"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <span className="btn-inner--icon">
                                    <img
                                        alt="..."
                                        src={require("assets/img/icons/common/google.svg")}
                                    />
                                    </span>
                                    <span className="btn-inner--text">Google</span>
                                </Button>
                                </div>
                            </CardHeader> */}
                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                <small>Create Account and Enroll to our Loyalty Program</small>
                                </div>
                                <Form role="register-form" onSubmit={(e) => this.submitForm(e)}>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative mb-3">
                                        <InputGroupText>
                                        <i className="ni ni-hat-3" />
                                        </InputGroupText>
                                    <Input 
                                        placeholder="Full Name" 
                                        name="fullname"
                                        type="text" 
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative mb-3">
                                        <InputGroupText>
                                        <i className="ni ni-mobile-button" />
                                        </InputGroupText>
                                    <Input 
                                        placeholder="Phone" 
                                        name="phone"
                                        type="text" 
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative mb-3">
                                        <InputGroupText>
                                        <i className="ni ni-calendar-grid-58" />
                                        </InputGroupText>
                                    <Input 
                                        placeholder="DOB" 
                                        name="dob"
                                        type="text" 
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative mb-3">
                                        <InputGroupText>
                                        <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    <Input
                                        placeholder="Email"
                                        name="email"
                                        type="email"
                                        autoComplete="new-email"
                                        valid={this.state.validate.emailState === "has-success"}
                                        invalid={this.state.validate.emailState === "has-danger"}
                                        value={email}
                                        onChange={(e) => {
                                            this.validateEmail(e);
                                            this.handleChange(e);
                                        }}
                                    />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupText>
                                        <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    <Input
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                    </InputGroup>
                                </FormGroup>
                                <div className="text-muted font-italic">
                                    <small>
                                    password strength:{" "}
                                    <span className="text-success font-weight-700">strong</span>
                                    </small>
                                </div>
                                <Row className="my-4">
                                    <Col xs="12">
                                    <div className="custom-control custom-control-alternative custom-checkbox">
                                        <input
                                        className="custom-control-input"
                                        id="customCheckRegister"
                                        type="checkbox"
                                        />
                                        <label
                                        className="custom-control-label"
                                        htmlFor="customCheckRegister"
                                        >
                                        <span className="text-muted">
                                            I agree with the{" "}
                                            <a href="#pablo" onClick={(e) => this.handleChange(e)}>
                                                Privacy Policy
                                            </a>
                                        </span>
                                        </label>
                                    </div>
                                    </Col>
                                </Row>
                                <div className="text-center">
                                    <Button className="mt-4" color="primary">
                                        Create account
                                    </Button>
                                </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    </Row>
                </Container>
            </>
        );
    }
}