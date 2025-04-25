import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.model';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone:false,
})
export class PerfilPage implements OnInit {
  user: User | undefined;

  constructor(private userService: UserService,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    const emailLogueado = localStorage.getItem('userEmail');

    this.userService.getUsers().subscribe(users => {
      this.user = users.find(u => u.email === emailLogueado);
    });
  }

  volver() {
    this.navCtrl.navigateForward("/tabs");
  }
}
