const path = require("path");

module.exports = {
    images: {
        domains: ["i.ibb.co"],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    trailingSlash: true,
    i18n: {
        locales: ["en", "ar"],
        defaultLocale: "en",
    },
};
