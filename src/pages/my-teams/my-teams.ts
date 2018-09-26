import{Component} from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import{TournamentsPage} from '../tournaments/tournaments';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';
import { TeamHomePage } from '../team-home/team-home';

@Component({
    selector : 'page-my-teams',
    templateUrl : 'my-teams.html'
})
export class MyTeamsPage{
    
	public favorites = [
		{
			team : {id:6182, name:'Fodddo', coach:'Michael'},
			tournamentId: '3dd50aaf-6b03-4497-b074-d81703f07ee8',
			tournamentName : 'wooo'
		},
		{
			team : {id:805, name:'Bddddar', coach:'George'},
			tournamentId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
			tournamentName : 'hoo'
		}
	];

    constructor(
    	private nav:NavController, 
    	private eliteApi : EliteApiProvider,
    	private loadingCtrl : LoadingController){
        
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