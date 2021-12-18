import { Area, Division } from './../../../models/address.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { AddressService } from 'src/app/services/address/address.service';
import { ToastService } from 'src/app/services/controllers/toast.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  @Input() fromModal;
  addressForm: FormGroup;
  divisions: Division[];
  districts: Division[];
  area: Area[];
  isAreaSelected = false;

  defaultGender = 'female';

  constructor(
    private addressService: AddressService,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.getDivision();
    this.addressForm = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      email: new FormControl(null,{
        updateOn: 'change',
        validators: [Validators.email, Validators.required]
      }),
      phone: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      address: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      city: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      area: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      division: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      additional: new FormControl(null, {
        updateOn: 'change'
      }),
      type: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      default: new FormControl(true, {
        updateOn: 'change'
      })
    });
  }

  updateProfile() {
    console.log(this.addressForm);
    this.addressForm.value.default = this.addressForm.value.default ? 1 : 0;
    console.log('added address : ', this.addressForm.value);
    this.loadingCtrl.create({
      message: 'Adding Address...',
      mode: 'ios'
    }).then(el=>el.present());

    this.addressService.addAddress(this.addressForm.value).subscribe(res=>{
      console.log('added address : ', res);
      this.loadingCtrl.dismiss();
      if(this.fromModal !== undefined || this.fromModal) {
        this.modalCtrl.dismiss({closed: true});
      }
      if(res.success) {
        this.toastService.toast('address added successfully', 'success', 2000);
      } else {
        this.toastService.toast('something went wrong. try again', 'danger', 2000);
      }
    });
  }

  getDivision(){
    this.addressService.getDivision().subscribe(divs=>{
      this.divisions = divs.data;
    });
  }
  getDivisionId(id){
    console.log('selected division id : ', id);
  }

  divisionSelected(e) {
    console.log(e);
    const div = this.divisions.find(d=>d.name === e.detail.value);
    console.log(div);

    this.addressService.getDistrict(div.id).subscribe(dist=>{
      this.districts = dist.data;
    });
  }

  citySelected(e) {
    console.log(e);
    const div = this.districts.find(d=>d.name === e.detail.value);
    console.log(div);

    this.addressService.getArea(div.id).subscribe(dist=>{
      this.area = dist.data;
    });
  }

  areaSelected(e) {
    console.log(e);
    this.isAreaSelected = true;
    const div = this.districts.find(d=>d.name === e.detail.value);
    console.log(div);
  }

  onCloseModal() {
    this.modalCtrl.dismiss();
  }


}
