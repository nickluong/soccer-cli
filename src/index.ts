import * as fs from 'fs';
import LeagueScores from './league-scores';

const league: LeagueScores = new LeagueScores();

// Takes file path as argument, creates a new LeagueScores object
// and calls handleNewMatch() for each line in the file.
// handleNewMatch() is responsible for parsing, calculating, and printing the top 3 teams after each matchday.
export const readStream = (givenFilePath?: string): void => {
      const args = process.argv?.slice(2);
      if (!args && !givenFilePath) {
        console.error("Please provide a file path");
        return;
      }
      try {
      const filePath = givenFilePath ? givenFilePath : args[0];
      const fileContents = fs.readFileSync(filePath, 'utf8');
      fileContents.split(/\r?\n/).forEach(line =>  {
        league.handleNewMatch(`${line}`);
      });
    } catch (err) {
        console.error(err);
    }
};

console.log(readStream());
