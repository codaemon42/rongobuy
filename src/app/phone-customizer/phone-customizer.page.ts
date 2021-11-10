
import { textEditor, TextEditorScreenComponent } from './../components/text-editor-screen/text-editor-screen.component';
import { AfterViewInit } from '@angular/core';
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';

//or     import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image-improved';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

import { LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';

import { MenuItem } from 'primeng/api';
import { CustomizationReviewComponent } from '../components/customization-review/customization-review.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-phone-customizer',
  templateUrl: './phone-customizer.page.html',
  styleUrls: ['./phone-customizer.page.scss'],
})
export class PhoneCustomizerPage implements OnInit, AfterViewInit {

  @ViewChild('addbg', {static: false}) addbg: ElementRef<HTMLInputElement>;
  @ViewChild('addLogo', {static: false}) addLogo: ElementRef<HTMLInputElement>;
  @ViewChild('logoRef', {static: false}) logoRef: ElementRef;
  // canvas image download
  @ViewChild('screen', {static: false}) screen: ElementRef;
  @ViewChild('canvas', {static: false}) canvas: ElementRef;
  @ViewChild('downloadLink', {static: false}) downloadLink: ElementRef;

  domToImage: any = domtoimage;
  backgroundImg;
  canvasImgBack = {
    size: 110,
    x: 0,
    y: 30
  };
  img: any = '';
  textEditor: textEditor;

  cursor = 'move';
  marginLeft;
  marginTop;
  scale = 1;
  downloadHref= '';
   area = [
     {name: 'Samsung', img: '../../assets/phone-cover/samsung/A5-2017.png', cost: '60'},
     {name: 'Realme', img: '../../assets/phone-cover/vivo/V5.png', cost: '60'},
     {name: 'vivo', img: '../../assets/phone-cover/vivo/V5.png', cost: '60'},
     {name: 'oppo', img: '../../assets/phone-cover/vivo/V5.png', cost: '60'}
    ];
  selectedArea = {name: 'Samsung', img: '../../assets/phone-cover/samsung/A5-2017.png', cost: '60'};
  // editor menu item
  items: MenuItem[];
  tooltipItems: MenuItem[];
  leftTooltipItems: MenuItem[];

  logoParams = {
    scale: 1,
    width: 153,
    height: 'auto',
    overlayHeight: 10,
    marginTop: -333,
    marginLeft: 100,
    zIndex: 15,
    position: 'absolute',
    src: ''
  };

  textStyleParams = {
    color: '#333',
    font: {
      size: 16,
      weight: 400,
    },
    transform: {
      text: 'capitalize',
      scale: 1,
      rotate: 0
    },
    margin: {
      top: -333,
      left: 100
    },
    zIndex: 20,
    position: 'absolute'
  };

  textParams = {
    scale: 1,
    marginTop: -333,
    marginLeft: 100,
    zIndex: 20,
    position: 'absolute'
  };


  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private platform: Platform,
    private transfer: FileTransfer,
    private file: File,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.tooltipItems = [
            {
                tooltipOptions: {
                    tooltipLabel: 'Add Text'
                },
                icon: 'pi pi-sort-alpha-up',
                command: () => {
                  console.log('text clicked');
                  this.editedText({
                    text : this.textEditor ? this.textEditor.text : '',
                    styleParams: this.textEditor ? this.textEditor.styleParams : this.textStyleParams
                    });
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: 'Logo'
                },
                icon: 'pi pi-images',
                command: () => { this.addLogo.nativeElement.click(); }
            },
            {
                tooltipOptions: {
                    tooltipLabel: 'Delete'
                },
                icon: 'pi pi-trash',
                command: (event) => {
                    this.toolClick(event);
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: 'Background Image'
                },
                icon: 'pi pi-mobile',
                command: () => { this.addbg.nativeElement.click(); }
            },
            {
                tooltipOptions: {
                    tooltipLabel: 'Save'
                },
                icon: 'pi pi-save',
                command: () => {
                  this.captureScreen();
                }
            }
    ];

    this.leftTooltipItems = [
            {
                tooltipOptions: {
                    tooltipLabel: 'Add',
                    tooltipPosition: 'left',
                },
                icon: 'pi pi-pencil',
                command: (event) => {
                    this.toolClick(event);
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: 'Background Image',
                    tooltipPosition: 'left',
                },
                icon: 'pi pi-mobile',
                command: () => { this.addbg.nativeElement.click(); }
            },
            {
                tooltipOptions: {
                    tooltipLabel: 'Delete',
                    tooltipPosition: 'left',
                },
                icon: 'pi pi-trash',
                command: (event) => {
                    this.toolClick(event);
                }
            },
            {
                icon: 'pi pi-upload',
                tooltipOptions: {
                    tooltipLabel: 'Upload',
                    tooltipPosition: 'left',
                },
            },
            {
                tooltipOptions: {
                    tooltipLabel: 'Angular Website',
                    tooltipPosition: 'left',
                },
                icon: 'pi pi-external-link'
            }
    ];
  }

  ngAfterViewInit() {
    console.log('ref : ', this.logoRef.nativeElement.clientHeight);
  }

  onChangeArea() { console.log('changed'); }

  captureScreen() {
    this.loadingCtrl.create({
      message: 'Loading Image ...',
      mode: 'ios'
    }).then(loadingEl => {
      loadingEl.present();
      this.domToImage.toBlob(this.screen.nativeElement).then(blob => {
        console.log(' blob file : ', blob);
        const objectURL = URL.createObjectURL(blob);
        console.log(' blob file data url : ', blob);
        this.img = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
      this.domToImage.toSvg(this.screen.nativeElement).then( dataUrl => {
        console.log('data  : ',dataUrl);
        //this.img = dataUrl;
        this.loadingCtrl.dismiss();
        const start = 'data:image/svg+xml;charset=utf-8,'.length + 1;

        this.modal({dataUrl}).then(data => {
          if ( data['confirm'] ) {
            console.log('confirm');
            this.isWebPlatform().then(web => {
              if ( web ) {
                this.webDownloadManager('phone-cover.png', dataUrl);
              }
              else {
                this.appDownloadManager('phone-cover.png', dataUrl);
              }
            });

            if( data['buy'] ) {
              console.log('want to buy the design now');
              // add this item to cart
              // navigate to the cart page
            }
          } else {
            console.log('cancelled');
          }
        });
      })
      .catch(err=>{
        console.log('err : ', err);
      });
    });
  }

  onUploadBackgroundImage(event, id) {
    console.log(event.target.files[0]);
    const pickedFile = event.target.files[0];
    if(!pickedFile){
      return;
    }
    const fr = new FileReader();
    fr.onload = ()=>{
      const dataUrl = fr.result.toString();
      if ( id === 'background' ) {
        this.backgroundImg = dataUrl;
      }
      else if ( id === 'logo' ) {
        const heightTimer = setInterval(()=>{
          if ( this.logoRef.nativeElement.clientHeight !== 0 ) {
              this.logoParams.overlayHeight = this.logoRef.nativeElement.clientHeight;
              clearInterval(heightTimer);
          }
        },1);
        this.logoParams.src = dataUrl;
      }
    };
    fr.readAsDataURL(pickedFile);
  }

  logoEdit(event, id) {
    console.log(id , event);

    if ( id === 'panright' || id === 'panleft' || id === 'panup' || id === 'pandown'  ) {
      this.logoParams.marginLeft = 100 + event.deltaX;
      this.logoParams.marginTop = -333 + event.deltaY;
    }

    if (event.deltaY === 114) {
      console.log('zoom out');
      this.logoParams.scale -= 0.05;
      // cursor
      this.cursor = 'zoom-out';
    }
    if (event.deltaY === -114)  {
      console.log('zoom in');
      this.logoParams.scale += 0.05;
      // bg
      this.cursor = 'zoom-in';
    }

  }

  textEdit(event, id) {
    console.log(id, event);
    if ( id === 'panright' || id === 'panleft' || id === 'panup' || id === 'pandown'  ) {
      this.textParams.marginLeft = 100 + event.deltaX;
      this.textParams.marginTop = -333 + event.deltaY;
    }

    if (event.deltaY === 114) {
      console.log('zoom out');
      this.textParams.scale -= 0.05;
      // cursor
      this.cursor = 'zoom-out';
    }
    if (event.deltaY === -114)  {
      console.log('zoom in');
      this.textParams.scale += 0.05;
      // bg
        this.cursor = 'zoom-in';
    }
  }

  // HELPER METHODS

  editedText(props) {
    this.textEditorModal(props).then( data => {
      console.log('text edited data : ', data['text']);
      this.textEditor = {
        confirm: data['confirm'],
        text: data['text'],
        styleParams: data['styleParams']
      };
    });
  }

  async textEditorModal(props) {
    const textModal = await this.modalCtrl.create({
      component: TextEditorScreenComponent,
      componentProps: props,
      animated: true,
      swipeToClose: true,
      cssClass: 'preview-modal'
    });

    await textModal.present();

    const { data } = await textModal.onDidDismiss();
    console.log('data : ', data);

    return new Promise( resolve => {
      resolve(data);
    });
  }

  async modal(props) {
    const modal = await this.modalCtrl.create({
      component: CustomizationReviewComponent,
      componentProps: props,
      animated: true,
      swipeToClose: true,
      cssClass: 'preview-modal'
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);

    return new Promise(resolve => {
      resolve(data);
    });
  }

  addBG() {
    this.addbg.nativeElement.click();
  }

  // image editor methods
  panUp(event) {
    console.log('up : ', event);
    this.marginLeft = event.deltaX;
    this.marginTop = event.deltaY;
    // bg
    this.canvasImgBack.x = event.deltaX;
    this.canvasImgBack.y = event.deltaY;
    // cursor
    this.cursor = 'move';
  }

  panDown(event) {
    console.log('down : ', event);
    this.marginLeft = event.deltaX;
    this.marginTop = event.deltaY;
    // bg
    this.canvasImgBack.x = event.deltaX;
    this.canvasImgBack.y = event.deltaY;
    // cursor
    this.cursor = 'move';
  }

  panRight(event) {
    console.log('right : ', event);
    this.marginLeft = event.deltaX;
    this.marginTop = event.deltaY;
    // bg
    this.canvasImgBack.x = 0+event.deltaX;
    this.canvasImgBack.y = event.deltaY;

        // cursor
    this.cursor = 'move';
  }

  panLeft(event) {
    console.log('left : ', event);
    this.marginLeft = 0-event.deltaX;
    this.marginTop = event.deltaY;
    // bg
    this.canvasImgBack.x = event.deltaX;
    this.canvasImgBack.y = event.deltaY;
    // cursor
    this.cursor = 'move';
  }

  wheel(event) {
    console.log('pinch : ', event);
    if (event.deltaY > 0) {
      console.log('zoom out');
      this.scale -= 0.05;
      // bg
      this.canvasImgBack.size -= 2;
      console.log('scale', this.scale);
      // cursor
      this.cursor = 'zoom-out';
    }
    else {
      console.log('zoom in');
      this.scale += 0.05;
      // bg
      this.canvasImgBack.size += 2;
      console.log('scale', this.scale);
      // cursor
        this.cursor = 'zoom-in';
    }
  }

  pinchIn(event) {
    console.log('pinch in', event);
    this.scale -= 0.05;
    this.cursor = 'zoom-out';
  }

  pinchOut(event) {
    console.log('pinch Out', event);
    this.scale += 0.05;
    this.cursor = 'zoom-in';
  }

  initialEditorClick() {
    if (this.backgroundImg === '' || this.backgroundImg === undefined) {
      this.addBG();
      console.log('clicked');
    }
    return;
  }

  toolClick(event) {
    console.log('naim : ', event);
  }

  // platform checker

  isWebPlatform() {
    return new Promise(resolve => {
      this.platform.ready().then(()=>{
        if(
          this.platform.is('cordova')
          || this.platform.is('android')
          || this.platform.is('ios')
          || this.platform.is('iphone')
          || this.platform.is('ipad')
          || this.platform.is('hybrid')
          || this.platform.is('tablet')
        ) {
          resolve(false);
        }
        else {
          resolve(true);
        }
      });
    });
  }

  // downloader
  webDownloadManager( name, dataUrl) {
    this.downloadLink.nativeElement.download = name;
    this.downloadLink.nativeElement.href = dataUrl;
    this.downloadLink.nativeElement.click();
  }

  // download method
  appDownloadManager(name, dataUrl) {
    console.log('download');
    const fileTransfer: FileTransferObject = this.transfer.create();
    console.log('download');
    const url = dataUrl;
    console.log('download');
    fileTransfer.download(url, this.file.dataDirectory + name).then(entry => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
      console.log('download error', error);
    })
    .catch(err => {
      console.log('err');
    })
    ;
    console.log('download');
  }

  // garbage
  htmlToCanvasImg() {
    const div = this.screen.nativeElement;
    console.log(div);
    const divHeight = div.clientHeight;
    const divWidth = div.clientWidth;
    const options = { width: divWidth*2, height: divHeight*2 };
    console.log(options);

    console.log('naim');

    html2canvas(this.screen.nativeElement, options).then(canvas =>{
      this.loadingCtrl.dismiss();

      const canvasSrc = canvas.toDataURL('image/png');
      console.log('canvas data url : ', canvasSrc);
      this.img = canvasSrc;

      this.downloadLink.nativeElement.download = 'phone-cover.png';
      this.downloadLink.nativeElement.href = canvasSrc;
      this.downloadLink.nativeElement.click();
    }).catch(err=>{
      console.log('err : ', err);
      this.loadingCtrl.dismiss();
      this.toastCtrl.create({
        message: 'something went wrong ...',
        color: 'danger',
        duration: 2000
      }).then(toastEl=>{
        toastEl.present();
      });
    });
  }
}
