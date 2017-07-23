const ProblemModel = require('../models/problemModel');

const getProblems = function() {
    return new Promise((resolve, reject) => {
        ProblemModel.find({}, (err, problems) => {
            if (err) {
                reject(err);
            } else {
                resolve(problems);
            }
        });
    });
};

const getProblem = function (id) {
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({ id: id }, (err, problem) => {
            if (err) {
                reject(err);
            } else {
                resolve(problem);
            }
        });
    })
};

const addProblem = function (newProblem) {
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({ name: newProblem.name }, (err, data) => {
            if (data) {
                reject('Problem name already exists');
            } else {
                ProblemModel.count({}, (err, num) => {
                    newProblem.id = num + 1;
                    let mongoProblem = new ProblemModel(newProblem);
                    mongoProblem.save();
                    resolve(mongoProblem);
                })
            }
        })
    })
};

module.exports = {
    getProblems,
    getProblem,
    addProblem
};