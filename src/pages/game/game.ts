import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../team-home/team-home';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';
declare var window: any;

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  private game: any = {};

  constructor(
    private nav: NavController,
    private navParams: NavParams,
    private eliteApi: EliteApiProvider) { }

  ionViewDidLoad(){
    this.game = this.navParams.data;
    this.game.gameTime = Date.parse(this.game.time);
  }

  teamTapped(teamId){
    let tourneyData = this.eliteApi.getCurrentTourney();
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.nav.push(TeamHomePage, team); 
  }

  goToDirections(){
    let tourneyData = this.eliteApi.getCurrentTourney();
    let location = tourneyData.locations[this.game.locationId];
    window.location = `geo:${location.latitude},${location.longitude};u=35;`;
  }

  goToMap(){
    //this.nav.push(MapPage, this.game);
  }

  isWinner(score1, score2){
    return Number(score1) > Number(score2);
  }
}
