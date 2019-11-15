// Dependencies we will need
// ====================================
const express = require("express");
const fs = require("fs");
const util = require("util");
const path = require("path")
const uuid = require("uuid/v4");
// ====================================

// Promise Modules
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

// Express Config 
// ====================================
//Tells node that we are creating an "express" server
const app = express();
// Set the server PORT
const PORT = process.env.PORT || 8000;
// Sets up the Express app to handle data parsing (Middleware)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))
// ====================================

// Routes
// ====================================
// /
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public.index.html"));
});

// notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//api/notes
// get
app.get("/api/notes", async (req, res) => {
    const db = JSON.parse(await readFileAsync(__dirname + '/db/db.json', 'utf8'));
    return res.json(db);
});
// create new note post
app.post("/api/notes", async (req, res) => {
    try {
        const db = JSON.parse(await readFileAsync(__dirname + '/db/db.json', 'utf8'));
        const note = { ...req.body, id: uuid() };
        db.push(note);
        await writeFileAsync(__dirname + '/db/db.json', JSON.stringify(db));
        console.log(db);
        return res.json(db);
    }
    catch (err) {
        console.log(err);
    }
})
// delete
app.delete('/api/notes/:id', async (req, res) => {
    try { const db = JSON.parse(await readFileAsync(__dirname + '/db/db.json', 'utf8'));
    const id = req.params.id;
    const newdb = db.filter(note => {
        return note.id !== id;
    });
    await writeFileAsync(__dirname + '/db/db.json', JSON.stringify(newdb));
        console.log(newdb);
        return res.json(newdb)}
    catch (err) {
        console.log(err);
    }
});
//all
app.get("*", (req, res) => {
    res.redirect("/");
});
// ====================================


// Listener
// ====================================
app.listen(PORT, () =>
    console.log(`App listening on PORT: ${PORT}`)
)
// ====================================
