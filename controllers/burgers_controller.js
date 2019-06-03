var express = require("express");
var router = express.Router();
// import the model (burger.js) to use its database function
var burger = require("../models/burger.js");

// create route for get all burgers
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// create route for posting new burger
router.post("/api/burgers", function(req, res) {
    burger.insertOne(["burger_name", "devoured"], 
    [req.body.burger_name, req.body.devoured], 
    function(result) {
        res.json({ id: result.insertId });
    });
});

// create route for updating (devouring) burger
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            // if no rows were changed then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// delete burger from database
router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.deleteOne(condition, function(result) {
        if (result.changedRows === 0) {
            // if no rows were changed then the ID must not exist, so 404
            return res.status(404).end();
        }   else {
            res.status(200).end();
        }
    });
});

// export routes for server.js to use
module.exports = router;