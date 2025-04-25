import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { ContactData } from '../../interfaces/contact.model';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone:false
})
export class ContactoPage implements OnInit {

  contactData!: ContactData;

  constructor(private contactoService: ContactService) {}

  ngOnInit() {
    this.contactoService.getContactData().subscribe((data) => {
      this.contactData = data;
    });
  }

  callPhone() {
    window.open(`tel:${this.contactData.phone}`, '_system');
  }

  openWhatsApp() {
    const number = this.contactData.whatsapp.replace('+', '');
    window.open(`https://wa.me/${number}`, '_system');
  }

  openMap() {
    const { lat, lng, label } = this.contactData.location;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}(${encodeURIComponent(label)})`;
    window.open(url, '_system');
  }
}
