import { Page } from './../../models/page.model';
import { PageService } from './../../services/page.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.page.html',
  styleUrls: ['./page-detail.page.scss'],
})
export class PageDetailPage implements OnInit {

  page: Page;

  title: any;

  // app-header properties
  searchData;
  isLoadingSearch = false;

  constructor(
    private router: ActivatedRoute,
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.router.params.subscribe(route=>{
      this.title = route.slug;
      console.log('title : ', route.slug);

      // load page content
      this.loadContent(route.slug);
    });

  }

  // content loading method
  loadContent(slug) {
    this.pageService.fetchPage(slug).subscribe((data)=>{
      console.log('fetch : ', data);
    });
    this.pageService.page.subscribe(data=>{
      this.page = data;
      console.log('page-detail : ',this.page);
      document.getElementById('page-content').innerHTML = this.page.content;
    });


  }

  // app header methods
  onSearch(event) {
    console.log('new event created: ', event);
    this.searchData = event;
  }

  isLoading(event) {
    console.log('is loading', event);
    this.isLoadingSearch = event;
  }

}
