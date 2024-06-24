import React, { Component } from "react";
import Link from "next/link";
import UserLogIn from "../components/Layout/UserLogIn";
import { Button } from "primereact/button";
import CheckLoyalty from "../components/Common/CheckLoyalty";

class Index extends Component {
    _isMounted = false;
    state = {
        display: false,
        isOpen: false,
        show: false,
    };

    componentDidMount() {
        this._isMounted = true;
        this.setState({ display: true });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    openModal = () => {
        this.setState({ isOpen: true });
    };

    render() {
        const renderButton = () => {
            return (
                <div className="d-flex justify-content-center w-100 my-5">
                    <Button
                        onClick={() =>
                            this.setState({ show: !this.state.show })
                        }
                    >
                        Check Your Loyalty Point
                    </Button>
                </div>
            );
        };

        return (
            <div className=" tw-h-screen tw-overflow-y-scroll">
                <video
                    autoPlay
                    loop
                    muted
                    className="tw-fixed tw-top-0 tw-left-0 inset-0 tw-w-full md:tw-h-screen tw-h-[900px]  tw-object-cover tw-opacity-90"
                >
                    <source src="./smoke.mp4" type="video/mp4" />
                </video>

                {/* .tuam-nav .navbar .others-option .sign-in */}
                <div className="tw-absolute md:tw-top-8 md:tw-right-8 tw-top-4 tw-right-4 tw-z-10">
                    <div className="tuam-nav">
                        <div
                            className="navbar"
                            style={{
                                backgroundColor: "transparent",
                                boxShadow: "none",
                            }}
                        >
                            <div
                                className="others-option"
                                style={{ border: "none" }}
                            >
                                <UserLogIn />
                            </div>
                        </div>
                    </div>
            
                </div>

                <div className=" tw-flex tw-flex-col tw-absolute md:tw-top-0 tw-top-8 tw-left-0 tw-w-full tw-h-screen  tw-justify-center tw-items-center ">
                    <div className="tw-flex md:tw-mt-0 tw-mt-[180px] md:tw-flex-row tw-flex-col md:tw-gap-[150px] tw-gap-8 tw-justify-center tw-items-center">
                        <Link href="/home">
                            <div
                                style={{
                                    backgroundImage: `url("/images/white-logo.webp")`,
                                    backgroundSize: "contain",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }}
                                className="tw-h-[300px] tw-w-[300px] tw-rounded-sm md:hover:tw-scale-110 tw-transition-all tw-duration-1000 tw-cursor-pointer hover:tw-bg-current tw-contrast- md:tw-mt-0 tw-mt-4"
                            >
                                {/* <h1 className="text-white tw-text-[30px] tw-pb-2 tw-font-bold">Cloud9</h1> */}
                            </div>
                        </Link>

                        <Link href="https://hempysemporium.com">
                            <div
                                style={{
                                    backgroundImage: `url("/hempislogo.png")`,
                                    backgroundSize: "contain",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }}
                                className="tw-h-[300px] tw-w-[300px] tw-rounded-sm md:hover:tw-scale-110 tw-transition-all tw-duration-1000 tw-cursor-pointer hover:tw-bg-current tw-contrast- md:tw-mt-0 tw-mt-4"
                            ></div>
                        </Link>
                    </div>

                    <div>{renderButton()}</div>
                </div>

                <CheckLoyalty
                    show={this.state.show}
                    setShow={() => this.setState({ show: !this.state.show })}
                />
            </div>

    );
  }
}

export default Index;
