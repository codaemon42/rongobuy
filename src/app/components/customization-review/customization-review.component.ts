import { ToastService } from './../../services/controllers/toast.service';
import { AccountService } from './../../account/account.service';
import { CustomOrderPage } from './../../phone-customizer/custom-order/custom-order.page';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { present } from '@ionic/core/dist/types/utils/overlays';
import { AccountPage } from 'src/app/account/account.page';

@Component({
  selector: 'app-customization-review',
  templateUrl: './customization-review.component.html',
  styleUrls: ['./customization-review.component.scss'],
})

export class CustomizationReviewComponent implements OnInit {
  @Input() dataUrl;
  @Input() mainImage;
  @Input() backgroundImage;
  @Input() logoImage;
  @Input() text;
  @Input() phoneModel;

  constructor(
    private modalCtrl: ModalController,
    private accountService: AccountService,
    private nav: NavController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    console.log(
        this.mainImage, this.backgroundImage,
        this.logoImage ,
        this.text,
    );
    const start = 'data:image/svg+xml;charset=utf-8'.length;

    const preview = this.dataUrl.slice(start+1 , this.dataUrl.length);
    //this.img.nativeElement.style.background = '#333';
    document.getElementById('preview').innerHTML = preview;
  }

  confirmPreview(confirm) {
    this.modalCtrl.dismiss({
      confirm,
      buy: false
    });
  }

  onPurchase() {
    if( this.accountService.isLoggedIn() ) {
      this.modalCtrl.dismiss({
        confirm,
        buy: true
      });
      this.modalCtrl.create({
        component: CustomOrderPage,
        componentProps: {
            mainImage: this.mainImage,
            backgroundImage: this.backgroundImage,
            logoImage: this.logoImage,
            text: this.text,
            phoneModel: this.phoneModel
        },
        cssClass: 'preview-modal'
      }).then(el=>el.present());
    } else {
      this.modalForLogin().then(loggedIn=>{
        if(loggedIn){
          // do something
                this.modalCtrl.create({
                component: CustomOrderPage,
                componentProps: {
                    mainImage: this.mainImage,
                    backgroundImage: this.backgroundImage,
                    logoImage: this.logoImage,
                    text: this.text,
                    phoneModel: this.phoneModel
                },
                cssClass: 'preview-modal'
              }).then(el=>el.present());
        }
      });
      // this.toastService.toast('Please login to order Customized Design', 'danger', 2000);
      // this.nav.navigateForward('/tabs/account');
    }

  }

  async modalForLogin() {
    const modal = await this.modalCtrl.create({
        component: AccountPage,
        componentProps: {
          isFromCustom: true
        },
        keyboardClose: false,
        swipeToClose: false,
        backdropDismiss: false,
        cssClass: 'login-modal'
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);

    return new Promise(resolve => {
      resolve(data['loggedIn']);
    });
  }

}
