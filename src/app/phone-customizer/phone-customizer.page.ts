import { AfterViewInit } from '@angular/core';
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';

//or     import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image-improved';

import { LoadingController, ToastController } from '@ionic/angular';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-phone-customizer',
  templateUrl: './phone-customizer.page.html',
  styleUrls: ['./phone-customizer.page.scss'],
})
export class PhoneCustomizerPage implements OnInit, AfterViewInit {
  @ViewChild('addbg', {static: false}) addbg: ElementRef<HTMLInputElement>;
    // canvas image download
  @ViewChild('screen', {static: false}) screen: ElementRef;
  @ViewChild('canvas', {static: false}) canvas: ElementRef;
  @ViewChild('downloadLink', {static: false}) downloadLink: ElementRef;

  @ViewChild('imgg', {static: false}) imgg: ElementRef<HTMLImageElement>;
  public context: CanvasRenderingContext2D;
  domToImage: any = domtoimage;
  canvasImgBack = {
    size: 110,
    x: 0,
    y: 30
  };

  img;
  h2c: any = html2canvas;


uploadedFiles: any[] = [];
  cursor = 'move';
  marginLeft;
  marginTop;
  scale = 1;
  // logo = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/52384618_403447716890410_7519901944706498560_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4vf2J_gHjV4AX9Iw4WH&_nc_ht=scontent.fdac22-1.fna&oh=cc8086e722ec06839a2993d3ac1852a3&oe=6180485F';
  backgroundImg = '';
  downloadHref= '';
   area = [
     {name: 'Samsung', img: '../../assets/phone-cover/samsung/A5-2017.png', cost: '60'},
     {name: 'Realme', img: '../../assets/phone-cover/vivo/V5.png', cost: '60'},
     {name: 'vivo', img: '../../assets/phone-cover/vivo/V5.png', cost: '60'},
     {name: 'oppo', img: '../../assets/phone-cover/vivo/V5.png', cost: '60'}
    ];
    selectedArea = {name: 'Samsung', img: '../../assets/phone-cover/samsung/A5-2017.png', cost: '60'};

  // tooltip item
    items: MenuItem[];

    tooltipItems: MenuItem[];

    leftTooltipItems: MenuItem[];

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ) { }

  ngOnInit() {

    // setTimeout(() => {
    //    this.downloadImage();

    // }, 1500);
            this.tooltipItems = [
            {
                tooltipOptions: {
                    tooltipLabel: "Add"
                },
                icon: 'pi pi-pencil',
                command: (event) => {
                    this.toolClick(event);
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Logo"
                },
                icon: 'pi pi-images',
                command: (event) => {
                    this.toolClick(event);
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Delete"
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
                command: () => {
                  this.addBG();
                }
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
                    tooltipLabel: "Add",
                    tooltipPosition: "left",
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
                command: () => {
                    this.addBG();
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Delete",
                    tooltipPosition: "left",
                },
                icon: 'pi pi-trash',
                command: (event) => {
                    this.toolClick(event);
                }
            },
            {
                icon: 'pi pi-upload',
                tooltipOptions: {
                    tooltipLabel: "Upload",
                    tooltipPosition: "left",
                },
            },
            {
                tooltipOptions: {
                    tooltipLabel: "Angular Website",
                    tooltipPosition: "left",
                },
                icon: 'pi pi-external-link'
            }
        ];

  }

  ngAfterViewInit() { }

  onChangeArea() {
    console.log('changed');
  }

  captureScreen() {
    this.loadingCtrl.create({
      message: 'Loading Image ...',
      mode: 'ios'
    }).then(loadingEl => {
      loadingEl.present();
      // html2canvas dont
      // this.htmlToCanvasImg();

      this.domToImage.toSvg(this.screen.nativeElement)
      .then( dataUrl => {
        console.log('data  : ',dataUrl);
        //document.body.appendChild(dataUrl);

        this.img = dataUrl;
        console.log('data 2 : ',dataUrl);
        this.loadingCtrl.dismiss();

        this.downloadLink.nativeElement.download = 'phone-cover.png';
        this.downloadLink.nativeElement.href = dataUrl;
        this.downloadLink.nativeElement.click();
      })
      .catch(err=>{
        console.log('err : ', err);
      });
    });
  }

  onUpload(event) {
      console.log(event.target.files[0]);

          const pickedFile = event.target.files[0];
          if(!pickedFile){
            return;
          }
          const fr = new FileReader();
          fr.onload = ()=>{
            const dataUrl = fr.result.toString();
            this.backgroundImg = dataUrl;

            console.log("base64 1:", this.backgroundImg);
          };
          fr.readAsDataURL(pickedFile);
  }

  addBG() {
    this.addbg.nativeElement.click();
  }


  // pan methods

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

  pinch(event) {
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

  initialClick() {
    if (this.img === undefined) {
      this.addBG();
    }
    return;
  }

  toolClick(event) {
    console.log('naim : ', event);
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
