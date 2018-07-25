import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamsPage } from '../teams/teams';
import { EliteApiProvider} from '../../providers/elite-api/elite-api';

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  private tournaments: any;
    
  constructor(
    private navCtrl: NavController, 
    private eliteApi : EliteApiProvider,
    private loadingCtrl : LoadingController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {

    let loader = this.loadingCtrl.create({
      content : 'Please wait ... '
      //spinner : 'dots'
    });

    loader.present().then(()=>{
      this.eliteApi.getData().then(
        data => {
          this.tournaments = data['tournaments'];
          loader.dismiss();
        }
      )
    });    
  }

  itemTapped(e, t){
      this.navCtrl.push(TeamsPage, t);
  }
}
