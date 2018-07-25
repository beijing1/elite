import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EliteApiProvider {

  private currentTourney : any = {};
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

  getTournaments(id) : Observable<any>{  	
		return this.http.get(`${this.baseUrl}/ionic.json`)
		.map(res => {
			return this.currentTourney = res.json()['tournaments-data'][id]
		});
  }

  getCurrentTourney() {
    return this.currentTourney;
  }
}
