// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for User viewing their appointments
  app.get("/user", function(req, res) {
    db.Table.findAll({
      where: {
        id: req.body.id
      }
    }).then(function(results) {
      res.json(results);
    });
  });

    // GET route for Trainer to see all appointments
  app.get("/trainer", function(req, res) {
    db.Table.findAll({
      where: {
        id: req.body.id
      }
    }).then(function(results) {
      res.json(results);
    });
  });

  // POST route for saving a new todo
  app.post("/newUser", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Table.create({
      name: req.body.name,
      type: req.body.type,
      gym: req.body.gym,
      zipcode: req.body.zipcode
    }).then(function(results) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(results);
    })
    .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  // app.delete("/api/todos/:id", function(req, res) {
  //   // We just have to specify which todo we want to destroy with "where"
  //   db.Table.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(results) {
  //     res.json(results);
  //   });

  // });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/setappointment", function(req, res) {

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Table.update({
      month: req.body.month,
      day: req.body.day,
      time: req.body.time,
      am_pm: req.body.am_pm
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(results) {
      res.json(results);
    })
    .catch(function(err) {
      res.json(err);
    });
  });
};