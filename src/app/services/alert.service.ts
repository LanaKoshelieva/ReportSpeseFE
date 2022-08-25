import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService 
{

  constructor() { }

  
  async showAlert(title:string, subtitle:string, message:string, alertController:AlertController) 
  {
    const alert = await alertController.create({
      header: title,
      subHeader: subtitle,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  
}
