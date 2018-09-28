import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import {Events} from 'ionic-angular';

@Injectable()
export class UserSettings {

  constructor(private storage: Storage, private events: Events) {
    console.log('Hello UserSettings Provider');
  }

  favoriteTeam(team, tournamentId, tournamentName){
  	let item = {team:team, tournamentId:tournamentId, tournamentName:tournamentName};
  	this.storage.set(team.id.toString(), JSON.stringify(item));
    this.events.publish('favorites:changed');
  }

  unfavoriteTeam(team){  	
  	this.storage.remove(team.id.toString());
    this.events.publish('favorites:changed');
  }

  isFavoriteTeam(teamId:string) : Promise<boolean>{
  	return this.storage.get(teamId).then(e => e);
  }

  getFavorites() : any[] {
  	var fav:any = [];
  	this.storage.forEach(data => {
  		if(data.team){
  			fav.push(data);
  		}else if(typeof data ==='string' && data.indexOf('team') != -1){
  			fav.push(JSON.parse(data));
  		}
  	});
  	return fav;
  }
}
