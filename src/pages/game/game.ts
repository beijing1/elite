import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../team-home/team-home';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  private game:any = {};

  constructor(
  	public nav: NavController, 
  	private eliteApi: EliteApiProvider, 
  	public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    this.game = this.navParams.data;
  }

  teamTapped(teamId){
    let tourneyData = this.eliteApi.getCurrentTourney();
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.nav.push(TeamHomePage, team);
  }

  goHome(){
      this.nav.popToRoot();
  }
}
