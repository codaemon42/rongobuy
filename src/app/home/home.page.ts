import { ColorsService } from './../services/colors/colors.service';
import { Subscription } from 'rxjs';
import { Category } from './../models/category.model';
import { HomepageService } from './../services/homepage/homepage.service';
import { Device } from '@ionic-native/device/ngx';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserverService } from '../services/breakpoint.service';
import { IonSlides, Platform, LoadingController } from '@ionic/angular';
import { Homepage } from '../models/homepage.model';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable curly */
/* eslint-disable object-shorthand */
/* eslint-disable max-len */

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild('categorySlide') categorySlide: IonSlides;
  skeleton = [1,2,3,4];
  logo = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/52384618_403447716890410_7519901944706498560_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4vf2J_gHjV4AX9Iw4WH&_nc_ht=scontent.fdac22-1.fna&oh=cc8086e722ec06839a2993d3ac1852a3&oe=6180485F';
  image = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/243141730_1930955927087406_8439625270110780804_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=666b5a&_nc_ohc=zAXTa3xu9zgAX-Mzz2d&_nc_ht=scontent.fdac22-1.fna&oh=4c6324ea350ce5d6bdcb6adc428527bd&oe=617ED4F1';
  pImage = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/p960x960/196212923_938037606764749_8713735566665562108_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=7cDGYr4RfeUAX-XeiRq&_nc_ht=scontent.fdac22-1.fna&oh=6736547cb51ace26d76ca4d70c7a05f2&oe=618033C6';
  slideOpts;
  emergencyCatSlider;
  catSlider;
  catSlider2;

  emergencyInfo;
  searchData;
  isLoadingSearch = false;
  colors: any[];
  mobileView = true;
  showSearch = false;

  phoneCategories: Category[];
  homepage: Homepage[] = [];
  homepageSub: Subscription;

  sliderEl: Homepage = null;
  sliderEl2: Homepage = null;
  banner: Homepage = null;
  banner2: Homepage = null;
  banner3: Homepage = null;

  bannerBg = {
    positionX: 0,
    positionY: 0
  };

  constructor(
    private device: Device,
    private platform: Platform,
    private brkPointService: BreakpointObserverService,
    private homepageService: HomepageService,
    private colorsService: ColorsService,
    private inAppBrowser: InAppBrowser,
    private loadingCtrl: LoadingController
  ) {

   }


  ngOnInit() {
    this.platform.ready().then(res=>{
      console.log('Device UUID is: ' + this.device);
    });

    this.setColors();
    this.setHomePage();
    this.sizeController();

    this.bannerBgAnimator();

    this.setSliderOptions();
    // extra static
    this.emergencyInfo = [
      {
        id: '1',
        name: 'Customized Design',
        slug: 'delivery-charge',
        description: 'This is my page',
        link: this.pImage,
        type: 'below-header'
      },
      {
        id: '1',
        name: '7 days return',
        slug: 'delivery-charge',
        description: 'This is my page',
        link: this.pImage,
        type: 'below-header'
      },
      {
        id: '1',
        name: '15 days Refund',
        slug: 'delivery-charge',
        description: 'This is my page',
        link: this.pImage,
        type: 'below-header'
      },
      {
        id: '1',
        name: 'Secure Payment',
        slug: 'delivery-charge',
        description: 'This is my page',
        link: this.pImage,
        type: 'below-header'
      }
    ];
  }

  bannerBgAnimator() {
    setInterval(()=>{
      this.bannerBg.positionX +=0.15;
    },10);
  }

  sliderNavigate(i) {
    console.log('selected slider : ', i);
    console.log('type : ', this.sliderEl[i].type);
    console.log('type : ', this.sliderEl[i].itemSlug);
  }

  onSearch(event) {
    console.log('new event created: ', event);
    this.searchData = event;
  }

  isLoading(event) {
    console.log('is loading', event);
    this.isLoadingSearch = event;
  }


  catSliderLoaded(event) {
    console.log('catslide : ', event);
  }

  //fb page
  openAppUrl(app: string, name: string, id?: string) {
    this.loadingCtrl.create({
      message: 'Opening Chat',
      duration: 3000
    }).then(el=>el.present());
    switch (app) {
        case 'facebook':
            this.launchApp(
              'fb://', 'com.facebook.orca',
              'http://m.me/' + name,
              'http://m.me/' + name,
              'https://www.facebook.com/' + name);
            break;
        case 'instagram':
            this.launchApp(
              'instagram://',
              'com.instagram.android',
              'instagram://user?username=' + name,
              'instagram://user?username=' + name,
              'https://www.instagram.com/' + name);
            break;
        case 'twitter':
            this.launchApp(
              'twitter://', 'com.twitter.android',
              'twitter://user?screen_name=' + name,
              'twitter://user?screen_name=' + name,
              'https://twitter.com/' + name);
            break;
        default:
            break;
      }
  }

  ngOnDestroy() {
    this.homepageSub.unsubscribe();
  }



  // helper methods
  setHomePage() {
    this.homepageService.fetchHomePage().subscribe();
    this.homepageSub = this.homepageService.homepage.subscribe(res => {
      this.homepage = res;
      // this.sliderEl = this.homepage.find(homepage => homepage.sectionTitle === 'slider');
      // this.sliderEl2 = this.homepage.find(homepage => homepage.sectionTitle === 'Slider 2');
      // this.banner = this.homepage.find(homepage => homepage.sectionTitle === 'Banner');
      // this.banner2 = this.homepage.find(homepage => homepage.sectionTitle === 'Banner 2');
      // this.banner3 = this.homepage.find(homepage => homepage.sectionTitle === 'Banner 3');
    });
  }
  sizeController() {
    this.brkPointService.size.subscribe(size=>{
      console.log('size home : ', size);
      if( size === 'xs' ){
        this.mobileView = true;
      } else{
        this.mobileView = false;
      }
    });
  }
  setColors() {
    this.colorsService.getColors();
    this.colorsService.randomColors.subscribe(res=>{
      this.colors = res;
    });
    console.log(this.colors);
  }
  setSliderOptions() {
      this.slideOpts = {
      grabCursor: true,
      autoplay: true,
      cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 10,
        shadowScale: 0.64,
      },
      on: {
        beforeInit: function() {
          const swiper = this;
          swiper.classNames.push(`${swiper.params.containerModifierClass}cube`);
          swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

          const overwriteParams = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            resistanceRatio: 0,
            spaceBetween: 0,
            centeredSlides: false,
            virtualTranslate: true,
          };

          this.params = Object.assign(this.params, overwriteParams);
          this.originalParams = Object.assign(this.originalParams, overwriteParams);
        },
        setTranslate: function() {
          const swiper = this;
          const {
            $el, $wrapperEl, slides, width: swiperWidth, height: swiperHeight, rtlTranslate: rtl, size: swiperSize,
          } = swiper;
          const params = swiper.params.cubeEffect;
          const isHorizontal = swiper.isHorizontal();
          const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
          let wrapperRotate = 0;
          let $cubeShadowEl;
          if (params.shadow) {
            if (isHorizontal) {
              $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
              if ($cubeShadowEl.length === 0) {
                $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
                $wrapperEl.append($cubeShadowEl);
              }
              $cubeShadowEl.css({ height: `${swiperWidth}px` });
            } else {
              $cubeShadowEl = $el.find('.swiper-cube-shadow');
              if ($cubeShadowEl.length === 0) {
                $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
                $el.append($cubeShadowEl);
              }
            }
          }

          for (let i = 0; i < slides.length; i += 1) {
            const $slideEl = slides.eq(i);
            let slideIndex = i;
            if (isVirtual) {
              slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
            }
            let slideAngle = slideIndex * 90;
            let round = Math.floor(slideAngle / 360);
            if (rtl) {
              slideAngle = -slideAngle;
              round = Math.floor(-slideAngle / 360);
            }
            const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
            let tx = 0;
            let ty = 0;
            let tz = 0;
            if (slideIndex % 4 === 0) {
              tx = -round * 4 * swiperSize;
              tz = 0;
            } else if ((slideIndex - 1) % 4 === 0) {
              tx = 0;
              tz = -round * 4 * swiperSize;
            } else if ((slideIndex - 2) % 4 === 0) {
              tx = swiperSize + (round * 4 * swiperSize);
              tz = swiperSize;
            } else if ((slideIndex - 3) % 4 === 0) {
              tx = -swiperSize;
              tz = (3 * swiperSize) + (swiperSize * 4 * round);
            }
            if (rtl) {
              tx = -tx;
            }

            if (!isHorizontal) {
              ty = tx;
              tx = 0;
            }

            const transform$$1 = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
            if (progress <= 1 && progress > -1) {
              wrapperRotate = (slideIndex * 90) + (progress * 90);
              if (rtl) wrapperRotate = (-slideIndex * 90) - (progress * 90);
            }
            $slideEl.transform(transform$$1);
            if (params.slideShadows) {
              // Set shadows
              let shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
              let shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
              if (shadowBefore.length === 0) {
                shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
                $slideEl.append(shadowBefore);
              }
              if (shadowAfter.length === 0) {
                shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
                $slideEl.append(shadowAfter);
              }
              if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
              if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
            }
          }
          $wrapperEl.css({
            '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
            '-moz-transform-origin': `50% 50% -${swiperSize / 2}px`,
            '-ms-transform-origin': `50% 50% -${swiperSize / 2}px`,
            'transform-origin': `50% 50% -${swiperSize / 2}px`,
          });

          if (params.shadow) {
            if (isHorizontal) {
              $cubeShadowEl.transform(`translate3d(0px, ${(swiperWidth / 2) + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`);
            } else {
              const shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
              const multiplier = 1.5 - (
                (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
                + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
              );
              const scale1 = params.shadowScale;
              const scale2 = params.shadowScale / multiplier;
              const offset$$1 = params.shadowOffset;
              $cubeShadowEl.transform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${(swiperHeight / 2) + offset$$1}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);
            }
          }

          const zFactor = (swiper.browser.isSafari || swiper.browser.isUiWebView) ? (-swiperSize / 2) : 0;
          $wrapperEl
            .transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);
        },
        setTransition: function(duration) {
          const swiper = this;
          const { $el, slides } = swiper;
          slides
            .transition(duration)
            .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
            .transition(duration);
          if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
            $el.find('.swiper-cube-shadow').transition(duration);
          }
        },
      }
    };

    this.emergencyCatSlider = {
      initialSlide: 0,
      speed: 400,
      loop: true,
      slidesPerView: 2.2,
      spaceBetween: 1,
      autoplay: true,
      breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1.5,
            spaceBetween: 10
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1.7,
            spaceBetween: 10
          },
          // when window width is >= 640px
          768: {
            slidesPerView: 2.5,
            spaceBetween: 10
          },
          // when window width is >= 640px
          980: {
            slidesPerView: 3.9,
            spaceBetween: 10
          }
        }
    };

    this.catSlider = {
      initialSlide: 0,
      speed: 400,
      loop: true,
      slidesPerView: 3.9,
      spaceBetween: 1,
      autoplay: true,
      breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 3.7,
            spaceBetween: 10
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 3.3,
            spaceBetween: 30
          },
          // when window width is >= 640px
          768: {
            slidesPerView: 3.9,
            spaceBetween: 40
          },
          // when window width is >= 640px
          980: {
            slidesPerView: 3.9,
            spaceBetween: 40
          }
      }
    };

    this.catSlider2 = {
      initialSlide: 0,
      speed: 400,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10,
      autoplay: true,
      breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          // when window width is >= 640px
          768: {
            slidesPerView: 1.9,
            spaceBetween: 40
          },
          // when window width is >= 640px
          980: {
            slidesPerView: 1.9,
            spaceBetween: 40
          }
      }
    };
  }
  launchApp(iosApp: string, androidApp: string, appUrlIOS: string, appUrlAndroid: string, webUrl: string) {
    let app: string;
    let appUrl: string;
    // check if the platform is ios or android, else open the web url
    if (this.platform.is('ios')) {
      app = iosApp;
      appUrl = appUrlIOS;
      const browser: InAppBrowserObject = this.inAppBrowser.create(appUrl, '_system');
    } else if (this.platform.is('android')) {
      app = androidApp;
      appUrl = appUrlAndroid;
      const browser: InAppBrowserObject = this.inAppBrowser.create(appUrl, '_system');
    } else {
      const browser: InAppBrowserObject = this.inAppBrowser.create(webUrl, '_system');
      return;
    }

    // this.appAvailability.check(app).then(
    //     () => {
    //         // success callback, the app exists and we can open it
    //         const browser: InAppBrowserObject = this.inAppBrowser.create(appUrl, '_system');
    //     },
    //     () => {
    //         // error callback, the app does not exist, open regular web url instead
    //         const browser: InAppBrowserObject = this.inAppBrowser.create(webUrl, '_system');
    //     }
    // );
  }
}
