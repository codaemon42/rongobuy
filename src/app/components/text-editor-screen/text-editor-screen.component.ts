/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

export interface textEditor {
  confirm: boolean;
  text: string;
  styleParams: {
    color: string;
    font: {
      size: number;
      weight: number;
    };
    transform: {
      text: string;
      scale: number;
      rotate: number;
    };
    margin: {
      top: number;
      left: number;
    };
    zIndex: number;
    position: string;
  };
};

@Component({
  selector: 'app-text-editor-screen',
  templateUrl: './text-editor-screen.component.html',
  styleUrls: ['./text-editor-screen.component.scss'],
})
export class TextEditorScreenComponent implements OnInit {
  @Input() text;
  @Input() styleParams;

  textEditor: textEditor;
  title = 'Edit Text';


  // styleParams = {
  //   color: '#333',
  //   font: {
  //     size: 12,
  //     weight: 400,
  //   },
  //   transform: {
  //     text: 'capitalize',
  //     scale: 1,
  //     rotate: 0
  //   }
  // };

  constructor( private modalCtrl: ModalController ) { }

  ngOnInit() {
    console.log('styleParams : ', this.styleParams);
  }

  confirmPreview(confirm) {
    this.textEditor = {
      confirm,
      text: this.text,
      styleParams: this.styleParams
    };
    this.modalCtrl.dismiss({
      confirm,
      text : this.text,
      styleParams: this.styleParams
      });
  }

  fontSize(event) {
    console.log(event);
    this.styleParams.font.size = event.detail.value;
  }

  fontWeight(event) {
    console.log(event);
    this.styleParams.font.weight = event.detail.value;
  }

  scale(event) {
    console.log(event);
    this.styleParams.transform.scale = event.detail.value/10;
    console.log(event/10);
  }

  rotate(event) {
    console.log(event);
    this.styleParams.transform.rotate = event.detail.value;
  }

}
