const KNN = require('ml-knn');
const csv = require('csvtojson');
const prompt = require('prompt');
let knn;
const csvFilePath = 'mos.csv'; // Data
const names = ['Lost%/10', 'Jitter/100', 'RTT/100', 'CodecType', 'type']; // For header

let seperationSize; // To seperate training and test data

let data = [], X = [], y = [];

let ranks = {};

let trainingSetX = [], trainingSetY = [], testSetX = [], testSetY = [];

csv({noheader: true, headers: names})
    .fromFile(csvFilePath)
    .on('json', (jsonObj) => {
        data.push(jsonObj); // Push each object to data Array
    })
    .on('done', (error) => {
        seperationSize = 0.7 * data.length;
        data = shuffleArray(data);
        dressData();
    });

function dressData() {

    let types = new Set(); // To gather UNIQUE classes

    data.forEach((row) => {
        types.add(row.type);
    });

    typesArray = [...types]; // To save the different types of classes.

    data.forEach((row) => {
        let rowArray, typeNumber;

        rowArray = Object.keys(row).map(key => parseFloat(row[key])).slice(0, 4);

        typeNumber = typesArray.indexOf(row.type); // Convert type(String) to type(Number)
	ranks[typeNumber] = row.type;

        X.push(rowArray);
        y.push(typeNumber);
    });

    trainingSetX = X.slice(0, seperationSize);
    trainingSetY = y.slice(0, seperationSize);
    testSetX = X.slice(seperationSize);
    testSetY = y.slice(seperationSize);

    train();
}

function train() {
    knn = new KNN(trainingSetX, trainingSetY, {k: 7});
    test();
}

function test() {
    const result = knn.predict(testSetX);
    const testSetLength = testSetX.length;
    const predictionError = error(result, testSetY);
    console.log(`Test Set Size = ${testSetLength} and number of Misclassifications = ${predictionError}`);
    predict();
}

function error(predicted, expected) {
    let misclassifications = 0;
    for (var index = 0; index < predicted.length; index++) {
        if (predicted[index] !== expected[index]) {
            misclassifications++;
        }
    }
    return misclassifications;
}

function predict() {
    let temp = [];
    prompt.start();
    
    prompt.get(['Lost%/10', 'Jitter/100', 'RTT/100', 'CodecType'], function (err, result) {
        if (!err) {
            for (var key in result) {
                temp.push(parseFloat(result[key]));
            }
            console.log(`With ${temp} -- type =  ${ranks[ knn.predict(temp) ]}`);
	    predict();
        }
    });
}

/**
 * https://stackoverflow.com/a/12646864
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
