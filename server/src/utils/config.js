// External modules
require("dotenv").config();

let DATABASE;

if (process.env.NODE_ENV === "test") {
    DATABASE = process.env.TEST_DATABASE_URL;
} else {
    DATABASE = process.env.DATABASE_URL;
}

module.exports = {
    DATABASE_URL: DATABASE,
    PORT: process.env.PORT || 3000,
    SECRET: process.env.SECRET,
};
