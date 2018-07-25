import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import {TeamHomePage} from '../team-home/team-home';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  public tournament:any = {};
    
  public teams:any;
  
  constructor(
    public navCtrl: NavController, 
    public eliteApi : EliteApiProvider,
    private loadingCtrl : LoadingController,
    public navParams: NavParams) {
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
        this.teams  = data.teams;
        loader.dismiss();
      })
    });   
  }

  itemTapped(e, team){
      this.navCtrl.push(TeamHomePage, team);
  }

  goHome(){
      this.navCtrl.popToRoot();
  }
}
