import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  registrationForm: FormGroup = this.fb.group({
    firstName: [''],
    lastName: [''],
    gender: [''],
    mstatus: [''],
    fav: [false],
    phoneNumbers: this.fb.array([
      this.createPhoneNumber()
    ])
  });
  totalUsers: any[] = [];
  currentUser: any[] = [];
  phType = ['mobile', 'landline'];
  showAdd: boolean = false;
  showUpdate: boolean = false;
  currentIndex: number = -1;
  favValue: boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    //this.addPhoneNumber();

    //console.log(this.registration)
  }
  createPhoneNumber(): FormGroup {
    return this.fb.group({
      type: ['mobile'],
      value: ['']
    })
  }
  get userPhoneGroups() {
    return this.registrationForm.get('phoneNumbers') as FormArray;
  }
  addPhoneNumber() {
    let phControl = this.registrationForm.get('phoneNumbers') as FormArray;
    phControl.push(this.createPhoneNumber());
  }
  removePhoneNumber(index: number) {
    let phControl = this.registrationForm.get('phoneNumbers') as FormArray;
    phControl.removeAt(index);
  }
  onSubmit() {
    let userData = this.registrationForm.getRawValue();
    userData['fav'] = this.favValue;
    this.totalUsers.push(userData);
    this.registrationForm.reset();
    this.clearFormArray((<FormArray>this.registrationForm.get('phoneNumbers')), 1)
  }
  getUserDetails(index: number) {
    this.currentUser = [];
    this.currentUser.push(this.totalUsers[index]);
    //this.registrationForm.setValue(this.currentUser[0]);
    this.registrationForm.patchValue({
      firstName: this.currentUser[0]['firstName'],
      lastName: this.currentUser[0]['lastName'],
      gender: this.currentUser[0]['gender'],
      mstatus: this.currentUser[0]['mstatus'],
      fav: this.favValue
    });
    this.favValue = this.currentUser[0]['fav'];
    //this.currentUser[0]['phoneNumbers'].for
    this.clearFormArray((<FormArray>this.registrationForm.get('phoneNumbers')), 0);
    var data = this.currentUser[0]['phoneNumbers'];
    for (var s = 0; s < data.length; s++) {
      (<FormArray>this.registrationForm.get('phoneNumbers')).push(
        this.fb.group({
          type: data[s]['type'],
          value: data[s]['value']
        })
      )
    }
    // console.log(value);
    // const control = new FormControl(value);
    // (<FormArray>this.registrationForm.get('phoneNumbers')).push(control);
    //});
    //this.registrationForm.setControl('phoneNumbers',this.fb.array(this.currentUser[0]['phoneNumbers'] || []));
    this.showAdd = true;
    this.showUpdate = true;
    this.currentIndex = index;
  }
  showAddFrom() {
    this.showAdd = true;
    this.showUpdate = false;
    this.registrationForm.reset();
    this.clearFormArray((<FormArray>this.registrationForm.get('phoneNumbers')), 1)
  }
  updateUser() {
    console.log(this.totalUsers[this.currentIndex]);
    var x = this.registrationForm.getRawValue();
    x['fav'] = this.favValue;
    this.totalUsers.splice(this.currentIndex, 1, x);
  }
  cancelForm() {
    this.showAdd = false;
    this.showUpdate = false;
    this.registrationForm.reset();
  }
  deleteUser() {
    this.totalUsers.splice(this.currentIndex, 1);
    this.cancelForm();
  }
  clearFormArray = (formArray: FormArray, index: any) => {
    while (formArray.length !== index) {
      formArray.removeAt(0)
    }
  }
  changeFav() {
    this.favValue = !this.favValue;
  }

}
