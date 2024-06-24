import React, { Component } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "primereact/button";
import CheckLoyalty from "../Common/CheckLoyalty";
const ModalVideo = dynamic(() => import("react-modal-video"), {
  ssr: false,
});
const OwlCarousel = dynamic(import("react-owl-carousel3"));

const options = {
  loop: true,
  nav: false,
  dots: true,
  autoplayHoverPause: true,
  autoplay: true,
  smartSpeed: 500,
  animateOut: "slideOutDown",
  animateIn: "slideInDown",
  items: 1,
  navText: [
    "<i class='flaticon-left-chevron'></i>",
    "<i class='flaticon-right-chevron'></i>",
  ],
};

class Banner extends Component {
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
        <div className="d-flex justify-content-center w-100 mt-5">
          <Button onClick={() => this.setState({ show: !this.state.show })}>
            Check Your Loyalty Point
          </Button>
        </div>
      );
    };

    return (
      <>
        <div className="home-section">
          {this.state.display ? (
            <OwlCarousel
              className="home-slides owl-carousel owl-theme"
              {...options}
            >
              <div className="main-banner item-bg4">
                <div className="d-table">
                  <div className="d-table-cell">
                    <div className="container">
                      <div className="main-banner-content">
                        <span className="sub-title">
                          The Best Vape & Smoke Shop in FTW
                        </span>
                        <h1> FINE PRODUCTS </h1>
                      </div>
                      {renderButton()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="main-banner item-bg3">
                <div className="d-table">
                  <div className="d-table-cell">
                    <div className="container">
                      <div className="main-banner-content">
                        <span className="sub-title">
                          No fake products and services. The customer is king,
                          your needs are our inspiration
                        </span>
                        <h1> DELICATE BLEND </h1>
                      </div>
                      {renderButton()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="main-banner item-bg2">
                <div className="d-table">
                  <div className="d-table-cell">
                    <div className="container">
                      <div className="main-banner-content">
                        <span className="sub-title">
                          Welcome to Cloud9, a vape & smoke shop for everyone{" "}
                        </span>
                        <span className="sub-title">
                          {" "}
                          We offer premium quality products{" "}
                        </span>
                        <h1> PREMIUM TASTE </h1>
                      </div>
                      {renderButton()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-banner item-bg1">
                <div className="d-table">
                  <div className="d-table-cell">
                    <div className="container">
                      <div className="main-banner-content">
                        <span className="sub-title">
                          {" "}
                          We offer wide assortment of premium quality products{" "}
                        </span>
                        <h1> BEST VAPING STATION </h1>
                      </div>
                      {renderButton()}
                    </div>
                  </div>
                </div>
                <CheckLoyalty
                  show={this.state.show}
                  setShow={() => this.setState({ show: !this.state.show })}
                />
              </div>
            </OwlCarousel>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

export default Banner;
