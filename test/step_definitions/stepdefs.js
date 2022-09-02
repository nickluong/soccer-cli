const assert = require('assert');
const { Given, When, Then } = require('cucumber');

let app = require('../../../src/index.ts');

const sample_input = 
["San Jose Earthquakes 3, Santa Cruz Slugs 3",
"Capitola Seahorses 1, Aptos FC 0",
"Felton Lumberjacks 2, Monterey United 0",
"Felton Lumberjacks 1, Aptos FC 2",
"Santa Cruz Slugs 0, Capitola Seahorses 0",
"Monterey United 4, San Jose Earthquakes 2",
"Santa Cruz Slugs 2, Aptos FC 3",
"San Jose Earthquakes 1, Felton Lumberjacks 4",
"Monterey United 1, Capitola Seahorses 0",
"Aptos FC 2, Monterey United 0",
"Capitola Seahorses 5, San Jose Earthquakes 5",
"Santa Cruz Slugs 1, Felton Lumberjacks 1"]

const sample_output = ["Matchday 1",
"Capitola Seahorses, 3 pts",
"Felton Lumberjacks, 3 pts",
"San Jose Earthquakes, 1 pt",
"Matchday 2",
"Capitola Seahorses, 4 pts",
"Aptos FC, 3 pts",
"Felton Lumberjacks, 3 pts",
"Matchday 3",
"Aptos FC, 6 pts",
"Felton Lumberjacks, 6 pts",
"Monterey United, 6 pts",
"Matchday 4",
"Aptos FC, 9 pts",
"Felton Lumberjacks, 7 pts",
"Monterey United, 6 pts"]

Given('I have a list of games', function () {
    this.games = sample_input;
})
When('I run the program', function () {
    this.output = app.readStream(this.games);
});
Then('I should get the correct output', function () {
    assert.deepEqual(this.output, sample_output);
});

