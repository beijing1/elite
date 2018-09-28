import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class EliteApiProvider {

  private currentTourney : any = {};
  private tourneyData = {};

  //private baseUrl = 'http://localhost:8080/form';
  private baseUrl = 'http://localhost:8100';
  constructor(public http: Http) {
    //console.log('Hello EliteApiProvider Provider');
  }

  getData(){
  	return new Promise(resolve =>{
  		this.http.get(`${this.baseUrl}/ionic.json`)
  		.subscribe(res => 
  			resolve(res.json())
  		);
  	});
  }

  getTournaments(id, refresh:boolean=false) : Observable<any>{  	
		if(!refresh && this.tourneyData[id]){
      console.log('no need for http call, get data from cache');
      this.currentTourney = this.tourneyData[id];
      return Observable.of(this.currentTourney);
    }else{
      console.log('get data from server!!!');
      return this.http.get(`${this.baseUrl}/ionic.json`)
        .map(res => {
          return this.currentTourney = this.tourneyData[id] = res.json()['tournaments-data'][id];
        });
    }    
  }

  refreshCurrentTourney(){
    return this.getTournaments(this.currentTourney.tournament.id, true);
  }

  getCurrentTourney() {
    return this.currentTourney;
  }
}
