import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { LoadingController, ModalController, Platform, ToastController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import domtoimage from 'dom-to-image-improved';

import { AccountService } from './../account/account.service';
import { ProductService } from '../services/product.service';
import { PhoneModelService } from './../services/phone-model/phone-model.service';
import { CartService } from '../services/cart.service';

import { textEditor, TextEditorScreenComponent } from './../components/text-editor-screen/text-editor-screen.component';
import { CustomizationReviewComponent } from '../components/customization-review/customization-review.component';

import { PhoneModel } from '../models/phoneModels.model';
import { Product } from '../models/product.model';
// import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
// import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-phone-customizer',
  templateUrl: './phone-customizer.page.html',
  styleUrls: ['./phone-customizer.page.scss'],
})
export class PhoneCustomizerPage implements OnInit, OnDestroy {

  @ViewChild('addbg', {static: false}) addbg: ElementRef<HTMLInputElement>;
  @ViewChild('addLogo', {static: false}) addLogo: ElementRef<HTMLInputElement>;
  // canvas image download
  @ViewChild('screen', {static: false}) screen: ElementRef;
  @ViewChild('downloadLink', {static: false}) downloadLink: ElementRef;
 selectedArea =
   {name: 'Samsung', img: 'https://rongobuy.s3.ap-southeast-1.amazonaws.com/images/r9ome7n52zf6bxja0wiupcg8dk41ht.png'};
  hideImageActions = false;
  logoImage = '';
  mainImage = '';
  backgroundImage = '';
  text = '';
  domToImage: any = domtoimage;
  backgroundImg;
  img: any = '';
  cursor = 'move';
  downloadHref= '';
  phoneModelsSub: Subscription;
  phoneModels: PhoneModel[] = [];
  selectedPhoneModel: PhoneModel;
  transform = null;
  transformText = null;
  isFirst = [];
  isImgEditor = true;
  controlTextParam = {
    left: 0,
    top: 0,
    scale: 1,
    rotate: 0,
    currentDeltaX: null,
    currentDeltaY: null,
    currentScale: null,
    currentRotation: null
  };
  controlTextParamConst = {
    left: 0,
    top: 0,
    scale: 1,
    rotate: 0,
    adjustDeltaX: 0,
    adjustDeltaY: 0,
    adjustScale: 1,
    adjustRotation: 0
  };
  controlImageParam = {
    left: 0,
    top: 0,
    scale: 1,
    rotate: 0,
    currentDeltaX: null,
    currentDeltaY: null,
    currentScale: null,
    currentRotation: null
  };
  controlImageParamConst = {
    left: 0,
    top: 0,
    scale: 1,
    rotate: 0,
    adjustDeltaX: 0,
    adjustDeltaY: 0,
    adjustScale: 1,
    adjustRotation: 0
  };
  rotationAll = 0;
  rotateStarter = false;
  rotateStarterText = false;

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
    zIndex: 20000,
    position: 'absolute'
  };
  textParamsConst = {
    scale: 1,
    marginTop: -333,
    marginLeft: 100,
    zIndex: 20000,
    position: 'absolute'
  };
  textBackground = '#3331';

  textEditor: textEditor = {
    confirm: false,
    text: '',
    styleParams: this.textStyleParams
  };
  isProductLoading = true;
  singleProduct: Product;
  skuId: string;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private nav: NavController,
    private platform: Platform,
    // private transfer: FileTransfer,
    // private file: File,
    private accountService: AccountService,
    private phoneModelsService: PhoneModelService, // this
    private cartService: CartService,
    private productService: ProductService
  ) { }

  // @since 1.4.0 ~
  // customizer functions
  rotatexyz(event){
    console.log('rotate event : ', event);
  }
  textStartXYZ(e){
    this.textClick();
    if(!this.rotateStarterText){
      this.controlTextParamConst.adjustRotation -= e.rotation;
      this.rotateStarterText = true;
    } else{
      return;
    }
  }
  textMoveXYZ(e){
    console.log('move',e);
    this.controlTextParam.currentScale = this.controlTextParamConst.adjustScale * e.scale;
    this.controlTextParam.currentDeltaX = this.controlTextParamConst.adjustDeltaX + (e.deltaX / this.controlTextParam.currentScale);
    this.controlTextParam.currentDeltaY = this.controlTextParamConst.adjustDeltaY + (e.deltaY / this.controlTextParam.currentScale);

    if(this.rotateStarterText){
      this.rotateStarterText = false;
      return;
    } else{
      this.controlTextParam.currentRotation = this.controlTextParamConst.adjustRotation + e.rotation;
    }

    const transforms = ['scale(' + this.controlTextParam.currentScale + ')'];
    transforms.push('translate(' + this.controlTextParam.currentDeltaX + 'px,' + this.controlTextParam.currentDeltaY + 'px)');
    transforms.push('rotate(' + Math.round(this.controlTextParam.currentRotation) + 'deg)');
    this.transformText = transforms.join(' ');
  }
  textEndXYZ(e){
    this.controlTextParamConst.adjustScale = this.controlTextParam.currentScale;
    this.controlTextParamConst.adjustRotation = this.controlTextParam.currentRotation;
    this.controlTextParamConst.adjustDeltaX = this.controlTextParam.currentDeltaX;
    this.controlTextParamConst.adjustDeltaY = this.controlTextParam.currentDeltaY;
  }
  startXYZ(e){
    this.imageClick();
    this.isFirst.push({name: 'start', rotation:e.rotation});
    console.log(e);
    console.log('rotation : ', this.controlImageParamConst.adjustRotation);
    this.rotationAll = e.rotation;
    if(!this.rotateStarter){
      this.controlImageParamConst.adjustRotation -= e.rotation;
      this.rotateStarter = true;
    } else{
      return;
    }
    console.log('rotation edited : ', this.controlImageParamConst.adjustRotation);
  }
  moveXYZ(e){
    this.isFirst.push({name: 'move', rotation: e.rotation});
    console.log('move',e);
    this.controlImageParam.currentScale = this.controlImageParamConst.adjustScale * e.scale;
    this.controlImageParam.currentDeltaX = this.controlImageParamConst.adjustDeltaX + (e.deltaX / this.controlImageParam.currentScale);
    this.controlImageParam.currentDeltaY = this.controlImageParamConst.adjustDeltaY + (e.deltaY / this.controlImageParam.currentScale);
    if(this.rotateStarter){
      this.rotateStarter = false;
      return;
    } else{
      this.controlImageParam.currentRotation = this.controlImageParamConst.adjustRotation + e.rotation;
    }

    const transforms = ['scale(' + this.controlImageParam.currentScale + ')'];
    transforms.push('translate(' + this.controlImageParam.currentDeltaX + 'px,' + this.controlImageParam.currentDeltaY + 'px)');
    transforms.push('rotate(' + Math.round(this.controlImageParam.currentRotation) + 'deg)');
    this.transform = transforms.join(' ');
  }
  endXYZ(e){
    this.isFirst.push({name: 'end', rotation: e.rotation});
    this.controlImageParamConst.adjustScale = this.controlImageParam.currentScale;
    this.controlImageParamConst.adjustRotation = this.controlImageParam.currentRotation;
    this.controlImageParamConst.adjustDeltaX = this.controlImageParam.currentDeltaX;
    this.controlImageParamConst.adjustDeltaY = this.controlImageParam.currentDeltaY;
  }

  pSlider(event, id){
    this.controlImageParam.currentDeltaX = this.controlImageParam.currentDeltaX ? this.controlImageParam.currentDeltaX : 0;
    this.controlImageParam.currentDeltaY = this.controlImageParam.currentDeltaY ? this.controlImageParam.currentDeltaY : 0;
    if(id === 'zoom'){
      this.controlImageParam.currentScale = event.value;
      this.controlImageParam.currentRotation = this.controlImageParam.currentRotation ? this.controlImageParam.currentRotation : 0;
      console.log('zoom', this.controlImageParam.currentScale);
    }
    if(id === 'rotate'){
      this.controlImageParam.currentRotation = event.value;
      this.controlImageParam.currentScale = this.controlImageParam.currentScale ? this.controlImageParam.currentScale : 1;
      console.log('rotate', this.controlImageParam.currentRotation);
    }
    console.log(this.controlImageParam.currentScale, this.controlImageParam.currentRotation);
    const transforms = ['scale(' + this.controlImageParam.currentScale + ')'];
    transforms.push('translate(' + this.controlImageParam.currentDeltaX + 'px,' + this.controlImageParam.currentDeltaY + 'px)');
    transforms.push('rotate(' + Math.round(this.controlImageParam.currentRotation) + 'deg)');
    this.transform = transforms.join(' ');
    console.log('transform : ', this.transform);

    this.controlImageParamConst.adjustScale = this.controlImageParam.currentScale;
    this.controlImageParamConst.adjustRotation = this.controlImageParam.currentRotation;
    this.controlImageParamConst.adjustDeltaX = this.controlImageParam.currentDeltaX;
    this.controlImageParamConst.adjustDeltaY = this.controlImageParam.currentDeltaY;
  }
  pSliderText(event, id) {
    this.controlTextParam.currentDeltaX = this.controlTextParam.currentDeltaX ? this.controlTextParam.currentDeltaX : 0;
    this.controlTextParam.currentDeltaY = this.controlTextParam.currentDeltaY ? this.controlTextParam.currentDeltaY : 0;
    if(id === 'zoom'){
      this.controlTextParam.currentScale = event.value;
      this.controlTextParam.currentRotation = this.controlTextParam.currentRotation ? this.controlTextParam.currentRotation : 0;
      console.log('zoom', this.controlTextParam.currentScale);
    }
    if(id === 'rotate'){
      this.controlTextParam.currentRotation = event.value;
      this.controlTextParam.currentScale = this.controlTextParam.currentScale ? this.controlTextParam.currentScale : 1;
      console.log('rotate', this.controlTextParam.currentRotation);
    }
    console.log(this.controlTextParam.currentScale, this.controlTextParam.currentRotation);
    const transforms = ['scale(' + this.controlTextParam.currentScale + ')'];
    transforms.push('translate(' + this.controlTextParam.currentDeltaX + 'px,' + this.controlTextParam.currentDeltaY + 'px)');
    transforms.push('rotate(' + Math.round(this.controlTextParam.currentRotation) + 'deg)');
    this.transformText = transforms.join(' ');
    console.log('transform : ', this.transformText);

    this.controlTextParamConst.adjustScale = this.controlTextParam.currentScale;
    this.controlTextParamConst.adjustRotation = this.controlTextParam.currentRotation;
    this.controlImageParamConst.adjustDeltaX = this.controlTextParam.currentDeltaX;
    this.controlTextParamConst.adjustDeltaY = this.controlTextParam.currentDeltaY;
  }


  async ngOnInit() {
    this.productInit();
    if(!this.accountService.isLoggedIn()){
      this.toastCtrl.create({message: 'please login if you wish to place an order', color: 'danger', duration:4000, position: 'top'})
      .then(el=>el.present());
    }
    // @since 1.6.0
    //this.tooltipItemInit();
    this.phoneModelsService.fetchPhoneModels().subscribe();
    this.phoneModelsSub = this.phoneModelsService.phoneModel.subscribe(models=>{
      this.phoneModels = models;
      this.phoneModelsService.selectedModel.subscribe(selectedModelName=>{
        this.selectedPhoneModel = models[0];
        if(selectedModelName) {
          this.phoneModels.map(allModels=>{
            if(allModels.name.toLowerCase() === selectedModelName.toLowerCase()){
              this.selectedPhoneModel = allModels;
              console.log('model found');
              return;
            } else{
              console.log('model not found');
            }
          });
        }
      });
    });
  }


  onChangeArea() { console.log('changed'); }

  captureScreen() {
    this.textBackground = '#3330';
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
    });

      this.domToImage.toSvg(this.screen.nativeElement).then( dataUrl => {
        //console.log('data  : ',dataUrl);
        this.domToImage.toPng(this.screen.nativeElement).then( dataUrls => {

          //console.log('png : ',dataUrls);
          this.mainImage = dataUrls;
          this.modal({
            dataUrl,
            mainImage: this.mainImage,
            backgroundImage: this.backgroundImage,
            logoImage: this.logoImage,
            text: this.text,
            phoneModel: this.selectedPhoneModel.name
            }).then(data => {
            if ( data['confirm'] ) {
              //console.log('confirm');
              // this.designDownload(dataUrl);

              if( data['buy'] ) {
                //console.log('want to buy the design now');
                this.loadingCtrl.create({
                  message: 'adding to cart, wait a few moment',
                  mode: 'ios'
                }).then(loadingEl=>loadingEl.present());
                this.cartService.addTOCart(
                  this.singleProduct.id, this.skuId, 1, this.backgroundImage, null, 'custom', this.selectedPhoneModel.name, this.mainImage
                ).subscribe(res=>{
                  this.loadingCtrl.dismiss();
                  if(res.success){
                    this.toastCtrl.create({
                      message: 'success',
                      color: 'success',
                      duration: 6000,
                      position: 'top',
                      buttons: [
                        {
                          side: 'end',
                          icon: 'cart',
                          text: 'view cart',
                          handler: () => {
                            this.nav.navigateForward('tabs/carts');
                          }
                        }
                      ]
                    }).then(toastEl=>toastEl.present());
                  } else {
                    this.toastCtrl.create({
                      message: 'something went wrong, try again',
                      color: 'danger',
                      duration: 4000,
                      position: 'top'
                    }).then(toastEl=>toastEl.present());
                  }
                });
              }
            } else {
              //console.log('cancelled');
              this.hideImageActions = false;
            }
          });
        });


      })
      .catch(err=>{
        console.log('err : ', err);
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
        this.imageClick();
        console.log('backgroundImage : ', this.backgroundImage);
      }
      else if ( id === 'logo' ) {
        // const heightTimer = setInterval(()=>{
        //   if ( this.logoRef.nativeElement.clientHeight !== 0 ) {
        //       this.logoParams.overlayHeight = this.logoRef.nativeElement.clientHeight;
        //       clearInterval(heightTimer);
        //   }
        // },1);
        //this.logoParams.src = dataUrl;
        this.logoImage = dataUrl;
        console.log('logoImage : ', this.logoImage);
      }
    };
    fr.readAsDataURL(pickedFile);
  }
  imageClick() {
    this.isImgEditor = true;
    this.controlImageParamConst.left = this.controlImageParam.left;
    this.controlImageParamConst.top = this.controlImageParam.top;
  }
  textClick(){
    console.log('text clicked');
    this.textBackground = '#3331';
    setTimeout(()=>{
      this.textBackground = '#3330';
    }, 1000);
    this.isImgEditor = false;
    this.textParamsConst.marginLeft = this.textParams.marginLeft;
    this.textParamsConst.marginTop = this.textParams.marginTop;
  }
  resizeImage(event) {
    console.log('resize : ', event);
    this.controlImageParam.scale = event.detail.value/10;
  }
  rotateImage(event) {
    this.controlImageParam.rotate = event.detail.value;
  }



  deleteText() {
    this.textEditor.text = '';
    this.imageClick();
  }
  deleteImage() {
    this.textClick();
    this.backgroundImg = null;
    this.controlImageParam = {
      left: 0,
      top: 0,
      scale: 1,
      rotate: 0,
      currentDeltaX: null,
      currentDeltaY: null,
      currentScale: null,
      currentRotation: null
    };
    this.controlImageParamConst = {
      left: 0,
      top: 0,
      scale: 1,
      rotate: 0,
      adjustDeltaX: 0,
      adjustDeltaY: 0,
      adjustScale: 1,
      adjustRotation: 0
    };
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
      if(data['confirm']){
        this.textClick();
      }
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
      backdropDismiss: false,
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


  // @since 1.6.1
  // designDownload(dataUrl){
  //   this.isWebPlatform().then(web => {
  //     if ( web ) {
  //       this.webDownloadManager('phone-cover.png', dataUrl);
  //     }
  //     else {
  //       this.appDownloadManager('phone-cover.png', dataUrl);
  //     }
  //   });
  // }

  // // platform checker
  // isWebPlatform() {
  //   return new Promise(resolve => {
  //     this.platform.ready().then(()=>{
  //       if(
  //         this.platform.is('cordova')
  //         || this.platform.is('android')
  //         || this.platform.is('ios')
  //         || this.platform.is('iphone')
  //         || this.platform.is('ipad')
  //         || this.platform.is('hybrid')
  //         || this.platform.is('tablet')
  //       ) {
  //         resolve(false);
  //       }
  //       else {
  //         resolve(true);
  //       }
  //     });
  //   });
  // }

  // // downloader
  // webDownloadManager( name, dataUrl) {
  //   this.downloadLink.nativeElement.download = name;
  //   this.downloadLink.nativeElement.href = dataUrl;
  //   this.downloadLink.nativeElement.click();
  // }

  // // download method
  // appDownloadManager(name, dataUrl) {
  //   console.log('download');
  //   const fileTransfer: FileTransferObject = this.transfer.create();
  //   console.log('download');
  //   const url = dataUrl;
  //   console.log('download');
  //   fileTransfer.download(url, this.file.dataDirectory + name).then(entry => {
  //     console.log('download complete: ' + entry.toURL());
  //   }, (error) => {
  //     // handle error
  //     console.log('download error', error);
  //   })
  //   .catch(err => {
  //     console.log('err');
  //   })
  //   ;
  //   console.log('download');
  // }

    productInit() {
    this.isProductLoading = true;
    this.productService.fetchSingleProduct('customized').subscribe(res=>{
      this.singleProduct = res;
      this.skuId = this.singleProduct.skuModule.skuPriceList[0].SkuId;
      this.isProductLoading = false;
      console.log('this.singleProduct custom check : ',this.singleProduct);
      //this.productPrice = parseInt(this.singleProduct.productPrice, 10);
    });
  }

  ngOnDestroy(){
    this.phoneModelsSub.unsubscribe();
  }

  // garbage
  // @since 1.6.0
  // initialEditorClick() {
  //   this.canvasImgBackConst.x = this.canvasImgBack.x;
  //   this.canvasImgBackConst.y = this.canvasImgBack.y;
  //   if (this.backgroundImg === '' || this.backgroundImg === undefined) {
  //     this.addBG();
  //     console.log('clicked');
  //   }
  //   return;
  // }
  // controlImage(event, id) {
  //   if(this.actionWorking){
  //     return;
  //   }
  //   if(id === 'pinchIn') {
  //     console.log('zoom out');
  //     this.controlImageParam.scale -= 0.03;
  //     // cursor
  //     this.cursor = 'zoom-out';
  //     return;
  //   }
  //   if(id === 'pinchOut')  {
  //     console.log('zoom in');
  //     this.controlImageParam.scale += 0.03;
  //     // bg
  //     this.cursor = 'zoom-in';
  //     return;
  //   }
  //   console.log(id , event);
  //   if ( id === 'panright' || id === 'panleft' || id === 'panup' || id === 'pandown'  ) {
  //     this.controlImageParam.left = this.controlImageParamConst.left + event.deltaX;
  //     this.controlImageParam.top = this.controlImageParamConst.top + event.deltaY;
  //     return;
  //   }

  //   if (event.deltaY === 114) {
  //     console.log('zoom out');
  //     // if(this.controlImageParam.scale < 0.2){
  //     //   return;
  //     // }
  //     this.controlImageParam.scale -= 0.03;
  //     // cursor
  //     this.cursor = 'zoom-out';
  //     return;
  //   }
  //   if (event.deltaY === -114)  {
  //     console.log('zoom in');
  //     // if(this.controlImageParam.scale > 1.5){
  //     //   return;
  //     // }
  //     this.controlImageParam.scale += 0.03;
  //     // bg
  //     this.cursor = 'zoom-in';
  //     return;
  //   }

  // }

  // rotateBgImg(event) {
  //   console.log('rotate : ', event);
  //   this.actionWorking = true;
  //   // if(event.isFirst){
  //   //   this.controlImageParam.rotate = this.controlImageParamConst.rotate+ event.angle/3;
  //   // }
  //   // if(event.isFirst){

  //   // }
  //   if(event.angle > 0){
  //       this.controlImageParam.rotate = this.rotateAngle++;
  //   }
  //    else {
  //     // this.controlImageParam.rotate = this.controlImageParamConst.rotate + event.angle;
  //     this.controlImageParam.rotate = this.rotateAngle--;
  //   }
  //   if(event.isFinal){
  //     this.actionWorking = false;
  //     //this.controlImageParamConst.rotate = this.controlImageParam.rotate;
  //   }
  // }
  // resizeBgImg(event) {
  //   console.log('resize : ', event);
  //   this.actionWorking = true;
  //   if(event.additionalEvent === 'panleft') {
  //     this.controlImageParam.scale += 0.01;
  //   }

  //   if(event.additionalEvent === 'panright') {
  //     this.controlImageParam.scale -= 0.01;
  //   }
  //   if(event.isFinal){
  //     this.actionWorking = false;
  //     this.controlImageParamConst.scale = this.controlImageParam.scale;
  //   }
  //   // this.actionWorking = true;
  //   // // if(event.isFirst){
  //   // //   this.controlImageParam.rotate = this.controlImageParamConst.rotate+ event.angle/3;
  //   // // }
  //   // this.controlImageParam.scale += ;
  //   // if(event.isFinal){
  //   //   this.actionWorking = false;
  //   //   this.controlImageParamConst.rotate = this.controlImageParam.rotate;
  //   // }
  // }
  // logoClick() {
  //   this.logoParamConst.marginLeft = this.logoParams.marginLeft;
  //   this.logoParamConst.marginTop = this.logoParams.marginTop;
  // }
  // logoEdit(event, id) {
  //   console.log(id , event);
  //   if ( id === 'panright' || id === 'panleft' || id === 'panup' || id === 'pandown'  ) {
  //     this.logoParams.marginLeft = this.logoParamConst.marginLeft + event.deltaX;
  //     this.logoParams.marginTop = this.logoParamConst.marginTop + event.deltaY;
  //   }

  //   if (event.deltaY === 114) {
  //     console.log('zoom out');
  //     this.logoParams.scale -= 0.05;
  //     // cursor
  //     this.cursor = 'zoom-out';
  //   }
  //   if (event.deltaY === -114)  {
  //     console.log('zoom in');
  //     this.logoParams.scale += 0.05;
  //     // bg
  //     this.cursor = 'zoom-in';
  //   }

  //   if(id === 'pinchIn') {
  //     console.log('zoom out');
  //     this.logoParams.scale -= 0.05;
  //     // cursor
  //     this.cursor = 'zoom-out';
  //   }
  //   if(id === 'pinchOut')  {
  //     console.log('zoom in');
  //     this.logoParams.scale += 0.05;
  //     // bg
  //     this.cursor = 'zoom-in';
  //   }

  // }
  // toolClick(event) {
  //   console.log('naim : ', event);
  // }
  // @since 1.6.0
  // image editor methods
  // panUp(event) {
  //   console.log('up : ', event);
  //   // bg
  //   this.canvasImgBack.x = this.canvasImgBackConst.x + event.deltaX;
  //   this.canvasImgBack.y = this.canvasImgBackConst.y + event.deltaY;
  //   // cursor
  //   this.cursor = 'move';
  // }

  // panDown(event) {
  //   console.log('down : ', event);
  //   // bg
  //   this.canvasImgBack.x = this.canvasImgBackConst.x + event.deltaX;
  //   this.canvasImgBack.y = this.canvasImgBackConst.y + event.deltaY;
  //   // cursor
  //   this.cursor = 'move';
  // }

  // panRight(event) {
  //   console.log('right : ', event);
  //   // bg
  //   this.canvasImgBack.x = this.canvasImgBackConst.x + event.deltaX;
  //   this.canvasImgBack.y = this.canvasImgBackConst.y + event.deltaY;

  //       // cursor
  //   this.cursor = 'move';
  // }

  // panLeft(event) {
  //   console.log('left : ', event);
  //   // bg
  //   this.canvasImgBack.x = this.canvasImgBackConst.x + event.deltaX;
  //   this.canvasImgBack.y = this.canvasImgBackConst.y + event.deltaY;
  //   // cursor
  //   this.cursor = 'move';
  // }

  // wheel(event) {
  //   console.log('pinch : ', event);
  //   if (event.deltaY > 0) {
  //     console.log('zoom out');
  //     // bg
  //     this.canvasImgBack.size -= 2;
  //     // cursor
  //     this.cursor = 'zoom-out';
  //   }
  //   else {
  //     console.log('zoom in');
  //     // bg
  //     this.canvasImgBack.size += 2;
  //     // cursor
  //       this.cursor = 'zoom-in';
  //   }
  // }

  // pinchIn(event) {
  //   console.log('pinch : ', event);
  //   // bg
  //   this.canvasImgBack.size -= 0.5;
  //   // cursor
  //   this.cursor = 'zoom-out';
  // }

  // pinchOut(event) {
  //   console.log('zoom in');
  //   // bg
  //   this.canvasImgBack.size += 0.5;
  //   // cursor
  //   this.cursor = 'zoom-in';
  // }
  // tooltipItemInit(){
  //   this.tooltipItems = [
  //           {
  //               tooltipOptions: {
  //                   tooltipLabel: 'Add Text'
  //               },
  //               icon: 'pi pi-sort-alpha-up',
  //               command: () => {
  //                 console.log('text clicked');
  //                 this.editedText({
  //                   text : this.textEditor ? this.textEditor.text : '',
  //                   styleParams: this.textEditor ? this.textEditor.styleParams : this.textStyleParams
  //                   });
  //               }
  //           },
  //           {
  //               tooltipOptions: {
  //                   tooltipLabel: 'Logo'
  //               },
  //               icon: 'pi pi-images',
  //               command: () => { this.addLogo.nativeElement.click(); }
  //           },
  //           {
  //               tooltipOptions: {
  //                   tooltipLabel: 'Delete'
  //               },
  //               icon: 'pi pi-trash',
  //               command: (event) => {
  //                   this.toolClick(event);
  //               }
  //           },
  //           {
  //               tooltipOptions: {
  //                   tooltipLabel: 'Background Image'
  //               },
  //               icon: 'pi pi-mobile',
  //               command: () => { this.addbg.nativeElement.click(); }
  //           },
  //           {
  //               tooltipOptions: {
  //                   tooltipLabel: 'Save'
  //               },
  //               icon: 'pi pi-save',
  //               command: () => {
  //                 this.captureScreen();
  //               }
  //           }
  //   ];

  //   this.leftTooltipItems = [
  //           {
  //               tooltipOptions: {
  //                   tooltipLabel: 'Add',
  //                   tooltipPosition: 'left',
  //               },
  //               icon: 'pi pi-pencil',
  //               command: (event) => {
  //                   this.toolClick(event);
  //               }
  //           },
  //           {
  //               tooltipOptions: {
  //                   tooltipLabel: 'Background Image',
  //                   tooltipPosition: 'left',
  //               },
  //               icon: 'pi pi-mobile',
  //               command: () => { this.addbg.nativeElement.click(); }
  //           },
  //           {
  //               tooltipOptions: {
  //                   tooltipLabel: 'Delete',
  //                   tooltipPosition: 'left',
  //               },
  //               icon: 'pi pi-trash',
  //               command: (event) => {
  //                   this.toolClick(event);
  //               }
  //           },
  //           {
  //               icon: 'pi pi-upload',
  //               tooltipOptions: {
  //                   tooltipLabel: 'Upload',
  //                   tooltipPosition: 'left',
  //               },
  //           },
  //           {
  //               tooltipOptions: {
  //                   tooltipLabel: 'Angular Website',
  //                   tooltipPosition: 'left',
  //               },
  //               icon: 'pi pi-external-link'
  //           }
  //   ];
  // }
  // htmlToCanvasImg() {
  //   const div = this.screen.nativeElement;
  //   console.log(div);
  //   const divHeight = div.clientHeight;
  //   const divWidth = div.clientWidth;
  //   const options = { width: divWidth*2, height: divHeight*2 };
  //   console.log(options);

  //   console.log('naim');

  //   html2canvas(this.screen.nativeElement, options).then(canvas =>{
  //     this.loadingCtrl.dismiss();

  //     const canvasSrc = canvas.toDataURL('image/png');
  //     console.log('canvas data url : ', canvasSrc);
  //     this.img = canvasSrc;

  //     this.downloadLink.nativeElement.download = 'phone-cover.png';
  //     this.downloadLink.nativeElement.href = canvasSrc;
  //     this.downloadLink.nativeElement.click();
  //   }).catch(err=>{
  //     console.log('err : ', err);
  //     this.loadingCtrl.dismiss();
  //     this.toastCtrl.create({
  //       message: 'something went wrong ...',
  //       color: 'danger',
  //       duration: 2000
  //     }).then(toastEl=>{
  //       toastEl.present();
  //     });
  //   });
  // }

  // properties
  // valRanges = [20,30];
  // canvasImgBackConst = {
  //   size: 110,
  //   x: 0,
  //   y: 30
  // };
  // canvasImgBack = {
  //   size: 110,
  //   x: 0,
  //   y: 30
  // };

  // @ViewChild('logoRef', {static: false}) logoRef: ElementRef;
  // @ViewChild('canvas', {static: false}) canvas: ElementRef;
  //actionWorking = false;
  //rotateAngle = 0;
    //  area = [
  //    {name: 'Samsung', img: '../../assets/phone-cover/samsung/A5-2017.png', cost: '60'},
  //    {name: 'Realme', img: '../../assets/phone-cover/vivo/V5.png', cost: '60'},
  //    {name: 'vivo', img: '../../assets/phone-cover/vivo/V5.png', cost: '60'},
  //    {name: 'oppo', img: '../../assets/phone-cover/vivo/V5.png', cost: '60'}
  //   ];

  // editor menu item
  // items: MenuItem[];
  // tooltipItems: MenuItem[];
  // leftTooltipItems: MenuItem[];
  // rotateBack = 180;

    // logoParams = {
  //   scale: 1,
  //   width: 153,
  //   height: 'auto',
  //   overlayHeight: 10,
  //   marginTop: -333,
  //   marginLeft: 100,
  //   zIndex: 15,
  //   position: 'absolute',
  //   src: ''
  // };
  // logoParamConst = {
  //   scale: 1,
  //   width: 153,
  //   height: 'auto',
  //   overlayHeight: 10,
  //   marginTop: -333,
  //   marginLeft: 100,
  //   zIndex: 15,
  //   position: 'absolute',
  //   src: ''
  // };


}
