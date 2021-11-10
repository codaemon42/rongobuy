import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-phone-display',
  templateUrl: './phone-display.component.html',
  styleUrls: ['./phone-display.component.scss'],
})
export class PhoneDisplayComponent implements OnInit {
  @Output() selectedBackground = new EventEmitter<any>();
  @Input() categoryImages;
  @Input() backgroundImage;

  constructor() { }

  ngOnInit() {}

  onClickProduct(index) {
    console.log('category index', index);
    this.selectedBackground.emit(index);
  }

}
