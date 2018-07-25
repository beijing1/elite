var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamDetailPage } from '../team-detail/team-detail';
//@IonicPage()
var TeamsPage = /** @class */ (function () {
    function TeamsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tournament = {};
        this.teams = [
            { id: 1, name: "HC Elite" },
            { id: 2, name: "Atlanta Hawks" },
            { id: 3, name: "Log Angle Lakers" }
        ];
        this.tournament = this.navParams.data;
    }
    TeamsPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad TeamsPage');
    };
    TeamsPage.prototype.itemTapped = function (e, team) {
        this.navCtrl.push(TeamDetailPage, team);
    };
    TeamsPage = __decorate([
        Component({
            selector: 'page-teams',
            templateUrl: 'teams.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], TeamsPage);
    return TeamsPage;
}());
export { TeamsPage };
//# sourceMappingURL=teams.js.map