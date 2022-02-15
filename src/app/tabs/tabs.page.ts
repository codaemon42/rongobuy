import { HomepageService } from './../services/homepage/homepage.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserverService } from '../services/breakpoint.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  showTabTitle = true;
  desktop = false;
  constructor(
    private brkPointObs: BreakpointObserverService
  ) { }
  ngOnInit() {
    this.getSize();
  }

  getSize() {
    this.brkPointObs.size.subscribe(data=>{
      console.log('size : ', data);
      if( data === 'xl' || data === 'lg' ) {
        this.desktop = true;
      } else {
        this.desktop  = false;
      }
    });
  }

}
