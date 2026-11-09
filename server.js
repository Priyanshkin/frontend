const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline' https: *; script-src 'self' 'unsafe-inline' https: *; font-src 'self' data: https: *; connect-src 'self' https: *; media-src 'self' https: *; object-src 'none'; frame-src 'self' https: *;"
    );
    next();
});

app.use(express.static(path.join(__dirname)));

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});