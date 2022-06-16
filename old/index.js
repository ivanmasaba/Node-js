const fs = require('fs/promises');
const express = require("express");
const { randomUUID } = require('crypto');

const app = express();

app.get("/outfit", (req, res) => {
    const tops = [ "balck", "white", "orange", "navy" ];
    const jeans = [ "grey", "Dark grey", "black", "navy" ];
    const shoes = [ "black", "grey", "white" ];

    res.json({ tops, jeans, shoes });

    res.send("This is working...");
})

app.post("/chat", (req, res) => {
    const id = randomUUID;
    console.log(id);
    res.sendStatus(201);
})

app.listen( 2000, () => console.log( "API server is running......" ) );