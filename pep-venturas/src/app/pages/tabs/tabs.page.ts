import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone:false
})
export class TabsPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  logOut() {
    this.navController.navigateRoot('/splash');
  }
}
