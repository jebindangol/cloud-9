import React, { useEffect, useState, useContext } from "react";
import Link from "../../utils/ActiveLink";
import { getMenuItems } from "../../helper/menuItems";
import MenuItems from "./MenuItems";
import UserLogIn from "./UserLogIn";
import { DataContext } from "../../pages/_app";

const NavbarTwo = () => {
    const [display, setDisplay] = useState(false);
    const [collapsed, setCollapsed] = useState(true);
    const [open, setOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { categories, brands, products } = useContext(DataContext);
    const classOne = collapsed
        ? "collapse navbar-collapse"
        : "collapse navbar-collapse show";
    const classTwo = collapsed
        ? "navbar-toggler navbar-toggler-right collapsed"
        : "navbar-toggler navbar-toggler-right";

    // Navbar
    useEffect(() => {
        // Anything in here is fired on component mount.
        let elementId = document.getElementById("navbar");
        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                elementId.classList.add("is-sticky");
            } else {
                elementId.classList.remove("is-sticky");
            }
        });
        window.scrollTo(0, 0);

        return () => {
            // Anything in here is fired on component unmount.
            setIsMounted(false);
        };

    }, []);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    const handleClickOpen = () => {
        setOpen(true);
        this.setState({
            open: true,
        });
    };

    const handleClose = (event, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
            console.warn(reason);
        } else {
            setOpen(!open);
        }
    };

    const ContactAndLogin = () => (
        <div className="others-option">
            <div className="call-us">
                <div className="icon">
                    <i className="flaticon-call"></i>
                </div>
                Call Us:
                <span className="number">
                    {" "}
                    <a href="tel:+1 (817) 4206102">+1 (817) 420-6102 </a>
                </span>
            </div>
            <UserLogIn/>
        </div>
    );

    return (
        <>
            <div id="navbar" className="navbar-area navbar-style-two">
                <div className="tuam-nav">
                    <div className="container-fluid">
                        <nav className="navbar navbar-expand-md navbar-light">
                            <Link legacyBehavior href="/home">
                                <a className="navbar-brand">
                                    <img
                                        src="/images/white-logo.webp"
                                        alt="logo"
                                        width="109"
                                        height="95"
                                        className="white-logo"
                                    />

                                    {/* For mobile device */}
                                    <img
                                        src="/images/logo.webp"
                                        alt="logo"
                                        width="99"
                                        height="95"
                                        className="logo"
                                    />
                                </a>
                            </Link>

                            <button
                                onClick={toggleNavbar}
                                className={classTwo}
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="icon-bar top-bar"></span>
                                <span className="icon-bar middle-bar"></span>
                                <span className="icon-bar bottom-bar"></span>
                            </button>

                            <div
                                className={classOne}
                                id="navbarSupportedContent"
                            >
                               <div className="md:tw-hidden tw-flex"> <ContactAndLogin /></div>
                                
                                <ul className="navbar-nav">
                                    {getMenuItems(categories,brands,products).map(
                                        (menu, index) => {
                                            const depthLevel = 0;
                                            return (
                                                <MenuItems
                                                    items={menu}
                                                    key={index}
                                                    depthLevel={depthLevel}
                                                />
                                            );
                                        }
                                    )}
                                </ul>
                                <div className="tw-hidden md:tw-flex"><ContactAndLogin /></div>
                                
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavbarTwo;
