import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-customization-review',
  templateUrl: './customization-review.component.html',
  styleUrls: ['./customization-review.component.scss'],
})

export class CustomizationReviewComponent implements OnInit {
  @Input() dataUrl;

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {
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
  }

}
