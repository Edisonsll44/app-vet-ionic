import { Component, OnInit } from '@angular/core';
import { Faq } from '../interfaces/faq.model';
import { FaqService } from '../services/faq.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
  standalone: false,
})
export class FaqsPage implements OnInit {
  faqs: Faq[] = [];

  constructor(private faqService: FaqService,
              private navCtrl: NavController) {}


  ngOnInit() {
    this.faqService.getFaqs().subscribe(data => {
      this.faqs = data;
    });
  }

  volverInicio() {
    this.navCtrl.navigateForward('/tabs');
  }
}