import{Component} from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import{TournamentsPage} from '../tournaments/tournaments';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';
import { TeamHomePage } from '../team-home/team-home';
import { UserSettings } from '../../providers/user-settings/user-settings';

@Component({
    selector : 'page-my-teams',
    templateUrl : 'my-teams.html'
})
export class MyTeamsPage{
    
	public favorites = [];

    constructor(
    	private nav:NavController, 
    	private eliteApi : EliteApiProvider,
    	private userSettings : UserSettings,
    	private loadingCtrl : LoadingController){
    }
    
    ionViewDidEnter(){
    	this.favorites = this.userSettings.getFavorites()
    }

    favoriteTapped(e, i){
		let loader = this.loadingCtrl.create({
	      content : 'Please wait ... '
	    });  

	    loader.present().then(()=>{
	      this.eliteApi.getTournaments(i.tournamentId)
	      .subscribe(data =>{
	        this.nav.push(TeamHomePage, i.team);
	        loader.dismiss();
	      })
	    });   
    }

    goToTournament(){
        this.nav.push(TournamentsPage); 
    }
}