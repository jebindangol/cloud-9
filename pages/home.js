import React, { Component, useEffect } from "react";
import NavbarTwo from "../components/Layout/NavbarTwo";
import Banner from "../components/HomeThree/Banner";
import WeOfferSlider from "../components/Common/WeOfferSlider";
import Gallery from "../components/Common/Gallery";
import About from "../components/HomeThree/About";
import JoinNow from "../components/Common/JoinNow";
import FeedbackSlider from "../components/Common/FeedbackSlider";
import Partner from "../components/Common/Partner";
import Footer from "../components/Layout/Footer";
import CheckLoyalty from "../components/Common/CheckLoyalty";
import axios from "axios";
import Swal from "sweetalert2";

const Home = () => {
    useEffect(() => {
        getPromotionsFromServer();
    }, []);

    const showPromotionPopup = (popupImageUrl) => {
        Swal.fire({
            html: `<img src="${popupImageUrl}" />`,
        });

        // store time when the popup was last shown
        localStorage.setItem("lastSeenPopupTime", new Date().getTime().toString());
    };

    const getPromotionsFromServer = async () => {
        const res = await axios.get("/api/promotion");
        const promotionDataResponse = res.data.data;
        if (promotionDataResponse && promotionDataResponse.length > 0) {
            // Check if the user has seen the popup in the last 6 hours
            const lastSeenPopupTime = localStorage.getItem("lastSeenPopupTime");
            const currentTime = new Date().getTime();
            const sixHours = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

            if (
                !lastSeenPopupTime ||
                currentTime - parseInt(lastSeenPopupTime) > sixHours
            ) {
                showPromotionPopup(promotionDataResponse[0].img);
            }

            // logic to compare promotion data data changes here, if the promotion data changes then it will be shown immediately
            const storedPromotionData = localStorage.getItem("promotionData");
            const currentPromotionData = JSON.stringify(promotionDataResponse);
            if (storedPromotionData !== currentPromotionData) {
                showPromotionPopup(promotionDataResponse[0].img);
                localStorage.setItem("promotionData", currentPromotionData);
            }
        }
    };

    return (
        <>
            <NavbarTwo />

            <Banner />

            <CheckLoyalty />

            <WeOfferSlider />

            <JoinNow />

            <About />

            <Gallery />

            <Partner />

            <FeedbackSlider />

            <Footer />
        </>
    );
};

export default Home;
