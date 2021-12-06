import { Observable, Observer, Subscription } from 'rxjs';
import { PhoneModelService } from './../services/phone-model/phone-model.service';
import { AccountService } from './../account/account.service';

import { textEditor, TextEditorScreenComponent } from './../components/text-editor-screen/text-editor-screen.component';
import { AfterViewInit, OnDestroy } from '@angular/core';
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
import { PhoneModel } from '../models/phoneModels.model';

@Component({
  selector: 'app-phone-customizer',
  templateUrl: './phone-customizer.page.html',
  styleUrls: ['./phone-customizer.page.scss'],
})
export class PhoneCustomizerPage implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('addbg', {static: false}) addbg: ElementRef<HTMLInputElement>;
  @ViewChild('addLogo', {static: false}) addLogo: ElementRef<HTMLInputElement>;
  @ViewChild('logoRef', {static: false}) logoRef: ElementRef;
  // canvas image download
  @ViewChild('screen', {static: false}) screen: ElementRef;
  @ViewChild('canvas', {static: false}) canvas: ElementRef;
  @ViewChild('downloadLink', {static: false}) downloadLink: ElementRef;
  hideImageActions = false;
  actionWorking = false;
  rotateAngle = 0;
  logoImage = '';
  mainImage = '';
  backgroundImage = '';
  text = '';

  domToImage: any = domtoimage;
  backgroundImg;
  canvasImgBackConst = {
    size: 110,
    x: 0,
    y: 30
  };
  canvasImgBack = {
    size: 110,
    x: 0,
    y: 30
  };
  img: any = '';
  textEditor: textEditor;

  cursor = 'move';

  downloadHref= '';
  phoneModelsSub: Subscription;
  phoneModels: PhoneModel[] = [];
  selectedPhoneModel: PhoneModel;
   area = [
     {name: 'Samsung', img: '../../assets/phone-cover/samsung/A5-2017.png', cost: '60'},
     {name: 'Realme', img: '../../assets/phone-cover/vivo/V5.png', cost: '60'},
     {name: 'vivo', img: '../../assets/phone-cover/vivo/V5.png', cost: '60'},
     {name: 'oppo', img: '../../assets/phone-cover/vivo/V5.png', cost: '60'}
    ];
  selectedArea = {name: 'Samsung', img: 'https://rongobuy.s3.ap-southeast-1.amazonaws.com/images/r9ome7n52zf6bxja0wiupcg8dk41ht.png', cost: '60'};
  // editor menu item
  items: MenuItem[];
  tooltipItems: MenuItem[];
  leftTooltipItems: MenuItem[];
rotateBack = 180;
controlImageParam = {
  left: 0,
  top: 0,
  scale: 1,
  rotate: 0
};
controlImageParamConst = {
  left: 0,
  top: 0,
  scale: 1,
  rotate: 0
};

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
  logoParamConst = {
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
  textParamsConst = {
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
    private accountService: AccountService,
    private phoneModelsService: PhoneModelService // this
  ) { }

  async ngOnInit() {
    if(!this.accountService.isLoggedIn()){
      this.toastCtrl.create({message: 'please login if you wish to place an order', color: 'danger', duration:4000, position: 'top'})
      .then(el=>el.present());
    }
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
    this.phoneModelsService.fetchPhoneModels().subscribe();
    this.phoneModelsSub = this.phoneModelsService.phoneModel.subscribe(models=>{
      this.phoneModels = models;
      this.selectedPhoneModel = models[0];
    });
  }

  definePhoneModels() {
    //this.phoneModelsSub = this.phoneModelsService.phoneModel.subscribe(models=>this.phoneModels = models);
    //this.phoneModelsService.fetchPhoneModels().subscribe
  }

  ngAfterViewInit() {
    console.log('ref : ', this.logoRef.nativeElement.clientHeight);
  }

  onChangeArea() { console.log('changed'); }

  captureScreen() {
    this.hideImageActions = true;
        console.log(
          this.mainImage,
          this.backgroundImage,
          this.logoImage,
          this.text,
        );
    this.loadingCtrl.create({
      message: 'Loading Image ...',
      mode: 'ios'
    }).then(loadingEl => {
      loadingEl.present();
      // this.domToImage.toBlob(this.screen.nativeElement).then(blob => {
      //   console.log(' blob file : ', blob);
      //   const objectURL = URL.createObjectURL(blob);
      //   console.log(' blob file data url : ', blob);
      //   this.img = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      // });


      this.domToImage.toSvg(this.screen.nativeElement).then( dataUrl => {
        console.log('data  : ',dataUrl);
        //this.img = dataUrl;
        this.loadingCtrl.dismiss();
        const start = 'data:image/svg+xml;charset=utf-8,'.length + 1;
        const preview = dataUrl.slice(start+1 ,dataUrl.length);
        const svg = new Blob([preview], {type:"image/svg+xml;charset=utf-8"});
        console.log('svg blob : ', svg);

        this.domToImage.toPng(this.screen.nativeElement).then( dataUrls => {
          console.log('png : ',dataUrls);
          this.mainImage = dataUrls;
          this.modalCtrl.dismiss();

          this.modal({
            dataUrl,
            mainImage: this.mainImage,
            backgroundImage: this.backgroundImage,
            logoImage: this.logoImage,
            text: this.text
            }).then(data => {
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
              this.hideImageActions = false;
            }
          });
        });


      })
      .catch(err=>{
        console.log('err : ', err);
      });
    });
  }

  addBackgroundCover() {
    this.addbg.nativeElement.click();
  }

  addLogoImage() {
    this.addLogo.nativeElement.click();
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
        this.backgroundImage = dataUrl;
        console.log('backgroundImage : ', this.backgroundImage);
      }
      else if ( id === 'logo' ) {
        const heightTimer = setInterval(()=>{
          if ( this.logoRef.nativeElement.clientHeight !== 0 ) {
              this.logoParams.overlayHeight = this.logoRef.nativeElement.clientHeight;
              clearInterval(heightTimer);
          }
        },1);
        this.logoParams.src = dataUrl;
        this.logoImage = dataUrl;
        console.log('logoImage : ', this.logoImage);
      }
    };
    fr.readAsDataURL(pickedFile);
  }
  imageClick() {
    this.controlImageParamConst.left = this.controlImageParam.left;
    this.controlImageParamConst.top = this.controlImageParam.top;
  }

  controlImage(event, id) {
    if(this.actionWorking){
      return;
    }
    if(id === 'pinchIn') {
      console.log('zoom out');
      this.controlImageParam.scale -= 0.03;
      // cursor
      this.cursor = 'zoom-out';
      return;
    }
    if(id === 'pinchOut')  {
      console.log('zoom in');
      this.controlImageParam.scale += 0.03;
      // bg
      this.cursor = 'zoom-in';
      return;
    }
    console.log(id , event);
    if ( id === 'panright' || id === 'panleft' || id === 'panup' || id === 'pandown'  ) {
      this.controlImageParam.left = this.controlImageParamConst.left + event.deltaX;
      this.controlImageParam.top = this.controlImageParamConst.top + event.deltaY;
      return;
    }

    if (event.deltaY === 114) {
      console.log('zoom out');
      // if(this.controlImageParam.scale < 0.2){
      //   return;
      // }
      this.controlImageParam.scale -= 0.03;
      // cursor
      this.cursor = 'zoom-out';
      return;
    }
    if (event.deltaY === -114)  {
      console.log('zoom in');
      // if(this.controlImageParam.scale > 1.5){
      //   return;
      // }
      this.controlImageParam.scale += 0.03;
      // bg
      this.cursor = 'zoom-in';
      return;
    }

  }

  rotateBgImg(event) {
    console.log('rotate : ', event);
    this.actionWorking = true;
    // if(event.isFirst){
    //   this.controlImageParam.rotate = this.controlImageParamConst.rotate+ event.angle/3;
    // }
    if(event.isFirst){

    }
    if(event.angle > 0){
        this.controlImageParam.rotate = this.rotateAngle++;
    }
     else {
      // this.controlImageParam.rotate = this.controlImageParamConst.rotate + event.angle;
      this.controlImageParam.rotate = this.rotateAngle--;
    }
    if(event.isFinal){
      this.actionWorking = false;
      //this.controlImageParamConst.rotate = this.controlImageParam.rotate;
    }
  }
  resizeBgImg(event) {
    console.log('resize : ', event);
    this.actionWorking = true;
    if(event.additionalEvent === 'panleft') {
      this.controlImageParam.scale += 0.01;
    }

    if(event.additionalEvent === 'panright') {
      this.controlImageParam.scale -= 0.01;
    }
    if(event.isFinal){
      this.actionWorking = false;
      this.controlImageParamConst.scale = this.controlImageParam.scale;
    }
    // this.actionWorking = true;
    // // if(event.isFirst){
    // //   this.controlImageParam.rotate = this.controlImageParamConst.rotate+ event.angle/3;
    // // }
    // this.controlImageParam.scale += ;
    // if(event.isFinal){
    //   this.actionWorking = false;
    //   this.controlImageParamConst.rotate = this.controlImageParam.rotate;
    // }
  }

  deleteImage() {
    this.backgroundImg = null;
    this.controlImageParam = {
      left: 0,
      top: 0,
      scale: 1,
      rotate: 0
    };
    this.controlImageParamConst = {
      left: 0,
      top: 0,
      scale: 1,
      rotate: 0
    };
  }
  logoClick() {
    this.logoParamConst.marginLeft = this.logoParams.marginLeft;
    this.logoParamConst.marginTop = this.logoParams.marginTop;
  }
  logoEdit(event, id) {
    console.log(id , event);
    if ( id === 'panright' || id === 'panleft' || id === 'panup' || id === 'pandown'  ) {
      this.logoParams.marginLeft = this.logoParamConst.marginLeft + event.deltaX;
      this.logoParams.marginTop = this.logoParamConst.marginTop + event.deltaY;
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

    if(id === 'pinchIn') {
      console.log('zoom out');
      this.logoParams.scale -= 0.05;
      // cursor
      this.cursor = 'zoom-out';
    }
    if(id === 'pinchOut')  {
      console.log('zoom in');
      this.logoParams.scale += 0.05;
      // bg
      this.cursor = 'zoom-in';
    }

  }

  textClick(){
    this.textParamsConst.marginLeft = this.textParams.marginLeft;
    this.textParamsConst.marginTop = this.textParams.marginTop;
  }
  textEdit(event, id) {
    console.log(id, event);
    if ( id === 'panright' || id === 'panleft' || id === 'panup' || id === 'pandown'  ) {
      this.textParams.marginLeft = this.textParamsConst.marginLeft + event.deltaX;
      this.textParams.marginTop = this.textParamsConst.marginTop + event.deltaY;
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

    if(id === 'pinchIn') {
      console.log('zoom out');
      this.textParams.scale -= 0.05;
      // cursor
      this.cursor = 'zoom-out';
    }
    if (id === 'pinchOut')  {
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
      this.text = this.textEditor.confirm ? this.textEditor.text : this.text;
      console.log('text edited : ', this.text);
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
      swipeToClose: false,
      keyboardClose: false,
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
    // bg
    this.canvasImgBack.x = this.canvasImgBackConst.x + event.deltaX;
    this.canvasImgBack.y = this.canvasImgBackConst.y + event.deltaY;
    // cursor
    this.cursor = 'move';
  }

  panDown(event) {
    console.log('down : ', event);
    // bg
    this.canvasImgBack.x = this.canvasImgBackConst.x + event.deltaX;
    this.canvasImgBack.y = this.canvasImgBackConst.y + event.deltaY;
    // cursor
    this.cursor = 'move';
  }

  panRight(event) {
    console.log('right : ', event);
    // bg
    this.canvasImgBack.x = this.canvasImgBackConst.x + event.deltaX;
    this.canvasImgBack.y = this.canvasImgBackConst.y + event.deltaY;

        // cursor
    this.cursor = 'move';
  }

  panLeft(event) {
    console.log('left : ', event);
    // bg
    this.canvasImgBack.x = this.canvasImgBackConst.x + event.deltaX;
    this.canvasImgBack.y = this.canvasImgBackConst.y + event.deltaY;
    // cursor
    this.cursor = 'move';
  }

  wheel(event) {
    console.log('pinch : ', event);
    if (event.deltaY > 0) {
      console.log('zoom out');
      // bg
      this.canvasImgBack.size -= 2;
      // cursor
      this.cursor = 'zoom-out';
    }
    else {
      console.log('zoom in');
      // bg
      this.canvasImgBack.size += 2;
      // cursor
        this.cursor = 'zoom-in';
    }
  }

  pinchIn(event) {
    console.log('pinch : ', event);
    // bg
    this.canvasImgBack.size -= 0.5;
    // cursor
    this.cursor = 'zoom-out';
  }

  pinchOut(event) {
    console.log('zoom in');
    // bg
    this.canvasImgBack.size += 0.5;
    // cursor
    this.cursor = 'zoom-in';
  }

  initialEditorClick() {
    this.canvasImgBackConst.x = this.canvasImgBack.x;
    this.canvasImgBackConst.y = this.canvasImgBack.y;
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

  ngOnDestroy(){
    this.phoneModelsSub.unsubscribe();
  }


}
