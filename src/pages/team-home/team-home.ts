import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamDetailPage} from '../team-detail/team-detail';
import { StandingsPage}  from '../standings/standings';
import { MyTeamsPage } from '../my-teams/my-teams';

@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {

  private team:any = {};    
  private teamDetailTab = TeamDetailPage;
  private standingsTab = StandingsPage;
    
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.team = this.navParams.data;
  }

  goHome(){
      //this.navCtrl.push(MyTeamsPage);
      this.navCtrl.popToRoot();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamHomePage');
  }
}
