import { LoadingController, ModalController } from '@ionic/angular';
import { AddressService } from './../../../services/address/address.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressSingle } from 'src/app/models/address.model';
import { ToastService } from 'src/app/services/controllers/toast.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {

  @Input() defaultValues: AddressSingle;

  editAddressForm: FormGroup;

  defaultGender = 'female';

  constructor(
    private addressService: AddressService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.editAddressForm = new FormGroup({
      name: new FormControl(this.defaultValues.name, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      email: new FormControl(this.defaultValues.email,{
        updateOn: 'change',
        validators: [Validators.email, Validators.required]
      }),
      phone: new FormControl(this.defaultValues.phone, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      address: new FormControl(this.defaultValues.address, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      city: new FormControl(this.defaultValues.city, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      area: new FormControl(this.defaultValues.area, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      division: new FormControl(this.defaultValues.division, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      additional: new FormControl(this.defaultValues.additional, {
        updateOn: 'change'
      }),
      type: new FormControl(this.defaultValues.type, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      default: new FormControl(this.defaultValues.default, {
        updateOn: 'change'
      })
    });
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  updateProfile() {
    console.log(this.editAddressForm);
    this.loadingCtrl.create({
      message: 'Adding Address...',
      mode: 'ios'
    }).then(el=>el.present());
    this.addressService.updateAddress(this.defaultValues.id, this.editAddressForm.value).subscribe(res=>{
      console.log('updated address : ', res);
      this.loadingCtrl.dismiss();
      if(res.success) {
        this.toastService.toast('address Updated successfully', 'success', 2000);
        this.closeModal();
      } else {
        this.toastService.toast('something went wrong. try again', 'danger', 2000);
      }
    });
  }

}
