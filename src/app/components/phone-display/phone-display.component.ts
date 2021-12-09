import { PhoneCoverService } from 'src/app/services/phone-cover/phone-cover.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-phone-display',
  templateUrl: './phone-display.component.html',
  styleUrls: ['./phone-display.component.scss'],
})
export class PhoneDisplayComponent implements OnInit {
  @Output() selectedBackground = new EventEmitter<any>();
  @Output() loadMoreCover = new EventEmitter<IonInfiniteScroll>();
  @Input() categoryImages;
  @Input() backgroundImage;
  @Input() productName;

  constructor(
    private phoneCoverService: PhoneCoverService
  ) { }

  ngOnInit() {}

  onClickProduct(index) {
    console.log('category index', index);
    this.phoneCoverService.addSelectedPhoneCover(this.categoryImages[index]);
    this.selectedBackground.emit(index);
  }

  loadData(event) {
    this.loadMoreCover.emit(event);
  }


}
