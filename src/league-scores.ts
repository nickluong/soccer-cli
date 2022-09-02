

interface MatchResult {
    t1Name: string;
    t1Goals: number;
    t2Name: string;
    t2Goals: number;
  }

  /* LeagueScores parses the match data to calculate the league standings 
   * and returns the top 3 teams after each matchday
   */
  class LeagueScores {
    matchDay: number = 1;
    top_daily_teams = new Set<string>();
    top_teams = new Map<string, number>();
    standings = [] as string[]

     /* 
      * Takes string lines from file contents and calls parsesMarch() to convert the contents into MatchResult objects.
      * Then handles recognizing the end of matchdays, once a duplicate is found.
      * Lastly calls for calculating the top 3 teams after each matchday and printing them.
      */
    handleNewMatch(line: string) {
        const matchResult = this.parseMatch(line);
        if(this.top_daily_teams.has(matchResult.t1Name) || this.top_daily_teams.has(matchResult.t2Name)) {
          if(this.matchDay === 1) this.printTopTeams();
          this.calculateTopTeams(matchResult);
          this.matchDay++;
          this.top_daily_teams.clear();
        } else {
          this.top_daily_teams.add(matchResult.t1Name);
          this.top_daily_teams.add(matchResult.t2Name);
          this.calculateTopTeams(matchResult);
          if (this.matchDay > 1 &&(this.top_teams.size - this.top_daily_teams.size === 2)) this.printTopTeams()
        }
    }

    /*
     * Split a match data line into a consumable object detailing
     * the two teams and their goals for the given match.
     */
    parseMatch(line: string): MatchResult {
      if(line.length === 0) process.exit();
      const parsedMatch = {} as MatchResult;
      const result = line.split(',').map(s => s.trim());
      if (result.length !== 2) {
        console.error("Please fix the file format");
        process.exit();
      }

      for(let i = 0; i < result.length; i++) {
        const team = result[i].split(' ');
        const teamGoals = team.pop();
        const teamName = team.join(' ');
        if (i === 0) {
          parsedMatch.t1Name = teamName;
          parsedMatch.t1Goals = parseInt(teamGoals);
        } else if (i === 1) {
          parsedMatch.t2Name = teamName;
          parsedMatch.t2Goals = parseInt(teamGoals);
        } else break;
      }
      return parsedMatch;
    }

    // Calculates the top 3 teams after each matchday, recognizing existing teams
    // and adjusting the top_teams map accordingly
    calculateTopTeams(matchResult: MatchResult): void {
      const tieMatch = matchResult.t1Goals === matchResult.t2Goals;
      const t1Points = tieMatch ? 1 : (matchResult.t1Goals > matchResult.t2Goals ? 3 : 0);
      const t2Points = tieMatch ? 1 : (matchResult.t2Goals > matchResult.t1Goals ? 3 : 0);
      if(!this.top_teams.has(matchResult.t1Name) && !this.top_teams.has(matchResult.t2Name)) {
        this.top_teams.set(matchResult.t1Name, t1Points);
        this.top_teams.set(matchResult.t2Name, t2Points);
      }
      else{
        this.top_teams.set(matchResult.t1Name, this.top_teams.get(matchResult.t1Name) + t1Points);
        this.top_teams.set(matchResult.t2Name, this.top_teams.get(matchResult.t2Name) + t2Points);
      }
    }

    // Formats and prints the top 3 from top_teams
    printTopTeams(): void {
      console.log(`Matchday ${this.matchDay}`);
      this.standings.push(`Matchday ${this.matchDay}`);
      const topThreeArr = Array.from(this.top_teams.entries()).sort((a, b) => b[1] - a[1]).slice(0, 3).map(t => `${t[0]} ${t[1]}`);
      topThreeArr.forEach(t => {
        let num = parseInt(t.slice(t.length - 2));
        let formattedText = t.slice(0, t.length - 2)+', '+ num + (num === 1 ? ' pt' : ' pts');
        console.log(formattedText);
        this.standings.push(formattedText);
      } );
      console.log('');
    }

    // Returns the final standings, was going to use for testing
    getStandings(): string[] {
      return this.standings;
    }

  }
  
  export default LeagueScores;