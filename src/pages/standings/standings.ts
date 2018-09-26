import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApiProvider} from '../../providers/elite-api/elite-api';
import * as _ from 'lodash';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {

  private allStandings:any =[];	
  private team:any = {};
  private standings:any[];

  constructor(public navCtrl: NavController, 
	public eliteApi : EliteApiProvider, 
  	public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StandingsPage');
    this.team = this.navParams.data;    
    var tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;
    this.allStandings = _.chain(this.standings)
    					.groupBy('division')
    					.toPairs()
    					.map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
    					.value();
  }

}
