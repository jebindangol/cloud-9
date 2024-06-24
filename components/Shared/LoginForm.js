import React ,{Component} from "react";
import {
    Button,
    Card,
    CardHeader,
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
import Link from '../../utils/ActiveLink';
import { signIn } from 'next-auth/react'

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
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

    submitForm = async (e) => {
        e.preventDefault();
        const res = await signIn('credentials', {
            email: this.state.email,
            password: this.state.password,
            callbackUrl: `${window.location.origin}/`
        })
    }

    render() {
        const { email, password} = this.state;
        return (
            <>   
                <div className="header bg-gradient-info py-7 py-lg-7">
                    <Container>
                        <div className="header-body text-center">
                            <Row className="justify-content-center">
                                <Col lg="5" md="6">
                                    <h1 className="text-white">Welcome!</h1>
                                    <p className="text-lead text-light">
                                        Please login or create new account to enroll in our loyalty program
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
                        <Col lg="5" md="7">
                            <Card className="bg-secondary shadow border-0">
                                <CardHeader className="bg-transparent pb-5">
                                    <div className="text-muted text-center mt-2 mb-3">
                                        <small>View Your Loyalty Reward Points</small>
                                    </div>
                                    <Form role="loyalty">
                                        <FormGroup className="mb-3">
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupText>
                                                <i className="ni ni-mobile-button" />
                                                </InputGroupText>
                                                <Input placeholder="Phone" type="text" />
                                            </InputGroup>
                                        </FormGroup>
                                    </Form>
                                    <div className="text-center">
                                            <Button className="btn-primary my-4" color="primary" type="button">
                                                View Reward Point
                                            </Button>
                                    </div>
                                </CardHeader>
                                <CardBody className="px-lg-5 py-lg-5">
                                    <div className="text-center text-muted mb-4">
                                        <small>Sign in with credentials</small>
                                    </div>
                                    <Form role="form" onSubmit={(e) => this.submitForm(e)}>
                                        <FormGroup className="mb-3">
                                            <InputGroup className="input-group-alternative">
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
                                        <div className="custom-control custom-control-alternative custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id=" customCheckLogin"
                                                type="checkbox"
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor=" customCheckLogin"
                                            >
                                            <span className="text-muted">Remember me</span>
                                            </label>
                                        </div>
                                        <div className="text-center">
                                            <Button className="btn-primary my-4" color="primary">
                                                Sign In
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                            <Row className="mt-3">
                                <Col xs="6">
                                    {/* <a
                                    className="text-dark"
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    >
                                    <small>Forgot password?</small>
                                    </a> */}
                                </Col>
                                <Col className="text-right" xs="6">
                                    <Link href="/auth/registration">
                                        <a className="text-info">
                                            <small>Enroll Loyalty Program?</small>
                                        </a>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}