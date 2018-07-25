import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyTeamsPage } from '../my-teams/my-teams';
import { GamePage } from '../game/game';
import { EliteApiProvider} from '../../providers/elite-api/elite-api';
import * as _ from 'lodash';

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  public team:any = {};
  public games: any[];
  public tourneyData : any;

  constructor(
    public navCtrl: NavController, 
    public eliteApi : EliteApiProvider, 
    public navParams: NavParams) {      
  }

  goHome(){
      this.navCtrl.push(MyTeamsPage);
      this.navCtrl.parent.parent.popToRoot();
  }

  ionViewLoaded(){
    console.log('ionViewLoaded TeamDetailPage'); 
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad TeamDetailPage');

    this.team = this.navParams.data;
    this.tourneyData = this.eliteApi.getCurrentTourney();

    this.games = _.chain(this.tourneyData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map(g => {
                      let isTeam1 = (g.team1Id === this.team.id);
                      let opponentName = isTeam1 ? g.team2 : g.team1;
                      let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                      return {
                          gameId: g.id,
                          opponent: opponentName,
                          time: Date.parse(g.time),
                          location: g.location,
                          locationUrl: g.locationUrl,
                          scoreDisplay: scoreDisplay,
                          homeAway: (isTeam1 ? "vs." : "at")
                      };
                  })
                  .value();
                  
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
        if (team1Score && team2Score) {
            var teamScore = (isTeam1 ? team1Score : team2Score);
            var opponentScore = (isTeam1 ? team2Score : team1Score);
            var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
            return winIndicator + teamScore + "-" + opponentScore;
        }
        else {
            return "";
        }
    }
  
  gameClicked($event, game){
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

}