import "../public/css/bootstrap.min.css";
import "../public/css/fontawesome.min.css";
import "../public/css/animate.min.css";
import "../public/css/flaticon.css";
import "../public/css/remixicon.css";
import "../public/css/fontello.css";
import "../node_modules/react-modal-video/css/modal-video.min.css";
import "react-image-lightbox/style.css";
import "../public/css/style.css";
import "../public/css/responsive.css";
import "../public/css/rtl.css";
import "../public/css/nucleo/nucleo.css";
import "../public/css/app.css";
import "../public/css/globals.css";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Loader from "../components/Shared/Loader";
import GoTop from "../components/Shared/GoTop";
import { SessionProvider } from "next-auth/react";
import { getProductDataFromServer } from "../helper/products";
import { getShopsFromMongo } from "../helper/shops";
export const DataContext = React.createContext([]);

//prime react
import "../public/css/primereact/primeicons.css";
import "../public/css/primereact/mira-theme.css";
import "../public/css/primereact/primereact.min.css";
import { ResultContextProvider } from "../context/ResultContextProvider";
const MyApp = (props) => {
    const { Component, pageProps } = props;
    // Preloader
    const [loading, setLoading] = useState(true);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loyaltyUser, setLoyaltyUser] = useState({
        loyalty: 0,
        phone: "",
        fullname: "",
    });
    const [loyaltyRate, setLoyaltyRate] = useState({
        loyalty_conversion_rate: 0,
        reedem_conversion_rate: 0,
    });
    const [shops, setShops] = useState([]);
    useEffect(() => {
        // Anything in here is fired on component mount.
        getProductDataFromServer()
            .then((responseData) => {
                if (!!responseData.brands) {
                    setBrands(responseData.brands);
                }
                if (!!responseData.categories) {
                    setCategories(responseData.categories);
                }
                if (!!responseData.products) {
                    setProducts(responseData.products);
                }

                getShopsFromMongo().then((shops) => {
                    setShops(shops);
                });
            })
            .finally(() => {
                setLoading(false);
            });

        return () => {
            // Anything in here is fired on component unmount.
            // if (this.timerHandle) {
            //   clearTimeout(this.timerHandle);
            //   this.timerHandle = 0;
            // }
        };
    }, []);

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta
                    name="description"
                    content="Cloud 9 Smoke Shop is located on 2933 beach street, Forth Worth, TX, 76111. Cloud 9 Smoke Shop is a
                                       small business where we thrive to provide our customers the best deal and price for any smoke and
                                       vape products with verity of selection available in FTW area."
                />
                <meta
                    name="keywords"
                    content="
                        buymesmokes.com
                        Cloud 9 Smoke shop
                        cloud 9
                        The Best Vape & Smoke Shop in FTW
                        No fake products and services. The customer is king, your needs are our inspiration
                        Welcome to Cloud9, a vape & smoke shop for everyone
                        We offer premium quality products
                        We offer wide assortment of premium quality products
                    "
                />
                <meta
                    name="author"
                    content="Cloud 9 Smoke Shop - The Best Vape & Smoke Shop in FTW"
                />
                <meta
                    property="og:title"
                    content="The Best Vape & Smoke Shop in FTW"
                />
                <meta
                    property="og:description"
                    content="Cloud 9 Smoke Shop is located on 2933 beach street, Forth Worth, TX, 76111. Cloud 9 Smoke Shop is a
                                       small business where we thrive to provide our customers the best deal and price for any smoke and
                                       vape products with verity of selection available in FTW area."
                />
                <meta
                    property="og:image"
                    content="images/squeakyklin1.png"
                ></meta>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/images/favicon/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/images/favicon/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/images/favicon/favicon-16x16.png"
                />
                <link rel="manifest" href="/images/favicon/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/images/favicon/safari-pinned-tab.svg"
                    color="#404b53"
                />
                <meta name="msapplication-TileColor" content="#2b5797" />
                <meta name="theme-color" content="#404b53"></meta>
                <title>Cloud9 - Smoke Shop</title>
            </Head>
            <SessionProvider session={pageProps.session}>
                {/* Preloader */}
                <Loader loading={loading} />
                {!loading && (
                    <DataContext.Provider
                        value={{
                            brands: brands,
                            categories: categories,
                            products: products,
                            loyaltyUser: loyaltyUser,
                            setLoyaltyUser: setLoyaltyUser,
                            loyaltyRate: loyaltyRate,
                            setLoyaltyRate: setLoyaltyRate,
                            shops: shops,
                        }}
                    >
                        <ResultContextProvider>
                            <Component {...pageProps} />
                        </ResultContextProvider>
                    </DataContext.Provider>
                )}
                {/* Go Top Button */}
                <GoTop scrollStepInPx="50" delayInMs="16.66" />
            </SessionProvider>
        </>
    );
};

export default MyApp;
