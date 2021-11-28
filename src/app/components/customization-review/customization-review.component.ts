import { CustomOrderPage } from './../../phone-customizer/custom-order/custom-order.page';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { present } from '@ionic/core/dist/types/utils/overlays';

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

  constructor( private modalCtrl: ModalController ) { }

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
          text: this.text
      },
      cssClass: 'preview-modal'
    }).then(el=>el.present());
  }

}
