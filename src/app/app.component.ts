import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeamsPage, TeamHomePage, TournamentsPage} from '../pages/pages';
import { UserSettings } from '../providers/user-settings/user-settings';
import { EliteApiProvider } from '../providers/elite-api/elite-api';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  favoriteTeams : any[];
  myroot = MyTeamsPage; 

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    private events : Events,
    private eliteApi : EliteApiProvider,
    private userSettings : UserSettings,
    private loadingCtrl : LoadingController,
    public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  ionViewDidEnter(){
    //this.refreshFavorites();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refreshFavorites();
      this.events.subscribe('favorites:changed', () => this.refreshFavorites());
    });
  }
    
  goToTeam(f){
    let loader = this.loadingCtrl.create({
      content : 'Please wait ... ',
      dismissOnPageChange : true
    });

    loader.present().then(()=>{
      this.eliteApi.getTournaments(f.tournamentId)
      .subscribe(data =>{
        this.nav.push(TeamHomePage, f.team);
        loader.dismiss();
      })
    });  
  }

  refreshFavorites(){
    this.favoriteTeams = this.userSettings.getFavorites();
    console.log('favoriteTeams.length', this.favoriteTeams.length);
  }

  goHome(){
      this.nav.push(MyTeamsPage);
  }
    
  goToTournaments(){
      this.nav.push(TournamentsPage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
