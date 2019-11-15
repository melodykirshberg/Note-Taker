//Dependencies we will need
// ====================================
const express = require("express");
const fs = require("fs");
const util = require("util");
const path = require("path")
// ====================================

// Express Config
// =====================================
//Tells node that we are creating an "express" server
const app = express();
//Set the server PORT
const PORT = process.env.PORT || 8000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// ======================================

app.use(express.static("public"))

app.get("/api/notes", function (req, res) {
    res.json([{
        id: 1,
        text: "Hello",
        title: "blacchchchch"
    }])
})

app.get("*", function (req, res) {
    res.redirect("/");
});

app.listen(PORT, () =>
    console.log(`App listening on PORT: ${PORT}`)
)