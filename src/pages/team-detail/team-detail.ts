import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { MyTeamsPage } from '../my-teams/my-teams';
import { GamePage } from '../game/game';
import { EliteApiProvider} from '../../providers/elite-api/elite-api';
import { UserSettings } from '../../providers/user-settings/user-settings';

import * as _ from 'lodash';
import moment from 'moment';

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  private allGames : any[];
  public team:any = {};
  public games: any[];
  public tourneyData : any = {};
  private teamStanding : any = {};
  private dateFilter:string;
  private useFilter:boolean;
  private isFollowing:boolean;

  constructor(
    public navCtrl: NavController, 
    private alterCtrl: AlertController,
    private userSettings : UserSettings,
    private toastCtrl : ToastController,
    public eliteApi : EliteApiProvider, 
    public navParams: NavParams) {      
  }

  toggleFollow(){
     if(this.isFollowing){
       let confirm = this.alterCtrl.create({
         title : 'Unfollow',
         message : 'Are you sure to unfollow?',
         buttons : [{
           text : 'Yes',
           handler : () => {
             this.isFollowing = false;
             this.userSettings.unfavoriteTeam(this.team);             
             this.toastCtrl.create({
               message : 'You have unfollowed ' + this.team.name,
               duration : 3000,
               position : 'bottom'
             }).present();
           }
         },{
           text : 'No'
         }]
       });
       confirm.present();
     }else{
       this.isFollowing = true;
       this.userSettings.favoriteTeam(this.team, this.tourneyData.tournament.id, this.tourneyData.tournament.name);
     }
  }

  refreshAll(e){
    this.eliteApi.refreshCurrentTourney().subscribe(()=>{
      e.complete();
      this.ionViewDidLoad();
    });
  }

  goHome(){
      this.navCtrl.push(MyTeamsPage);
      this.navCtrl.parent.parent.popToRoot();
  }

  ionViewLoaded(){
    console.log('ionViewLoaded TeamDetailPage'); 
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad TeamDetailPage');

    this.team = this.navParams.data;
    this.tourneyData = this.eliteApi.getCurrentTourney();

    this.games = _.chain(this.tourneyData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map(g => {
                      let isTeam1 = (g.team1Id === this.team.id);
                      let opponentName = isTeam1 ? g.team2 : g.team1;
                      let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                      return {
                          gameId: g.id,
                          opponent: opponentName,
                          time: Date.parse(g.time),
                          location: g.location,
                          locationUrl: g.locationUrl,
                          scoreDisplay: scoreDisplay,
                          homeAway: (isTeam1 ? "vs." : "at")
                      };
                  })
                  .value();
    this.allGames = this.games;
    this.teamStanding = _.find(this.tourneyData.standings, {'teamId' : this.team.id});
    this.userSettings.isFavoriteTeam(this.team.id.toString()).then(v => this.isFollowing = v);
  }

  loadAll() {
    console.log('userFilter', this.useFilter);
    this.useFilter = false;
    this.dateChanged();
  }

  dateChanged() {
    if(this.useFilter){
      this.games = _.filter(this.allGames, g=> moment(g.time).isSame(this.dateFilter, 'day'));
    }else{
      this.games = this.allGames;
    }    
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
        if (team1Score && team2Score) {
            var teamScore = (isTeam1 ? team1Score : team2Score);
            var opponentScore = (isTeam1 ? team2Score : team1Score);
            var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
            return winIndicator + teamScore + "-" + opponentScore;
        }
        else {
            return "";
        }
  }
  
  getScoreBadge(g) {
    return g.scoreDisplay ? g.scoreDisplay[0] : '';
  }

  showColor(g) {
    var color = this.getScoreBadge(g) === 'W' ? '' : 'danger';
    return color;
  }

  gameClicked($event, game){
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }
}