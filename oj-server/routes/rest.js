const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const nodeRestClient = require('node-rest-client').Client;
const restClient = new nodeRestClient();

const EXECUTOR_SERVER_URL = 'http://localhost:5000/build_and_run';

// registering remote methods
restClient.registerMethod('build_and_run', EXECUTOR_SERVER_URL, 'POST');

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

// build and run
router.post('/build_and_run', jsonParser, function (req, res) {
    const userCodes = req.body.userCodes;
    const lang = req.body.lang;
    console.log(lang + ' ' + userCodes);
    // res.json({'text': 'hello from nodejs'});
    restClient.methods.build_and_run(
        {
            data: {
                code: userCodes,
                lang: lang
            },
            headers: {
                'Content-Type': 'application/json'
            }
        },
        (data, response) => {
            console.log('receive response from executor server: ');
            // expected output:  build: xx, run: xx
            const text = `Build output: ${data['build']}  Execute output: ${data['run']}`;
            console.log('text is ...', text);
            data['text'] = text;
            res.json(data);
        }
    );
});

module.exports = router;