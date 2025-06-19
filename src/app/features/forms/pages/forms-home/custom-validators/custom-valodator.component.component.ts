import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import {noNumbersValidator} from '../../../../../shared/validators/custom-validators';

@Component({
  standalone:false,
  selector: 'app-custom-validator',
  templateUrl: './custom-validator.component.html',
  styleUrls: ['./custom-validator.component.scss'],
})
export class CustomValidatorComponent implements OnInit{
 myForm!:FormGroup;
 formFields = [
  {name:'name', label:'Name', type:'text', validators:[Validators.required, noNumbersValidator]},
  {name:'email', label:'Email', type:'email', validators:[Validators.required,Validators.email]}] 
ngOnInit(): void {
  const group: { [key: string]: FormControl } = {};
  
  this.formFields.forEach(field => group[field.name] = new FormControl('', field.validators))
  this.myForm = new FormGroup(group)

}

onSubmit(){
  if (this.myForm.valid){
    console.log(this.myForm.value)
  }else{
    console.log('please fill up the form before sending')
  }
}

}

