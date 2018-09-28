import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import {TeamHomePage} from '../team-home/team-home';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';
import * as _ from 'lodash';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  private tournament:any = {};
  private allTeams = [];  
  private teams:any;
  private allTeamDivisions;
  public queryText:string;

  constructor(
    private navCtrl: NavController, 
    private eliteApi : EliteApiProvider,
    private loadingCtrl : LoadingController,
    private navParams: NavParams) {
      this.tournament = this.navParams.data;
  }

  ionViewDidLoad() {

    let loader = this.loadingCtrl.create({
      content : 'Please wait ... '
    });

    this.eliteApi.getTournaments(this.navParams.data.id).subscribe(data =>{
      this.teams  = data.teams;
    })

    loader.present().then(()=>{
      this.eliteApi.getTournaments(this.navParams.data.id)
      .subscribe(data =>{        
        this.allTeamDivisions =  _.chain(data.teams)
                                  .groupBy('division')
                                  .toPairs()
                                  .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
                                  .value();
        this.teams  = this.allTeamDivisions;                                  
        loader.dismiss();
      })
    });   
  }

  updateTeams(){
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if(teams.length){
        filteredTeams.push({divisionName:td.divisionName, divisioinTeams : teams});
      }
    });

    this.teams = filteredTeams;
  }

  itemTapped(e, team){
      this.navCtrl.push(TeamHomePage, team);
  }

  goHome(){
      this.navCtrl.popToRoot();
  }
}
