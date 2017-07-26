const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const ProblemService = require('../services/problemService');

// GET /api/v1/problems
router.get('/problems', function (req, res) {
    ProblemService
    .getProblems()
    .then(problems => res.json(problems));
});

// GET /api/v1/problems/:id
router.get('/problems/:id', function (req, res) {
    const id = req.params.id;
    ProblemService
    .getProblem(+id)
    .then(problem => res.json(problem));
});

// POST /api/v1/problems
router.post('/problems', jsonParser, function (req, res) {
    ProblemService
    .addProblem(req.body)
    .then(function (problem) { 
        res.json(problem);
    }, function (err) {
        res.status(400).send('Problem name already exist');
    });    
});

// DELETE /api/v1/problems/:id
router.delete('/problems/:id', function (req, res) {
    ProblemService.deleteProblem(req.params.id)
    .then(function (problems) {
        res.json(problems);
    }, function (err) {
        res.status(400).send('Cannot find problem to delete');
    });
});

module.exports = router;