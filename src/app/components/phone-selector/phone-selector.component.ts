import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-phone-selector',
  templateUrl: './phone-selector.component.html',
  styleUrls: ['./phone-selector.component.scss'],
})
export class PhoneSelectorComponent implements OnInit {

  @Output() modelSelected = new EventEmitter<any|null>();
  @Output() hideOverlay = new EventEmitter<boolean|null>();

   model = [
     {name: 'Samsung', img: '../../assets/phone-cover/samsung/A5-2017.png', cost: '60'},
     {name: 'Realme', img: '../../assets/phone-cover/vivo/V5.png', cost: '60'},
     {name: 'vivo', img: '../../assets/phone-cover/vivo/V5.png', cost: '60'},
     {name: 'oppo', img: '../../assets/phone-cover/vivo/V5.png', cost: '60'}
    ];
  selectedModel = null;


  constructor() { }

  ngOnInit() {
    this.hideOverlay.emit(false);
    this.onChangeModel();
  }

  onChangeModel() {
    this.modelSelected.emit(this.selectedModel ? this.selectedModel : null);
  }

  onHide() {
    this.hideOverlay.emit(true);
  }

}
