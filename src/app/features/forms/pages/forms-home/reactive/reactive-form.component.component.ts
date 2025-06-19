import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';

@Component({
  standalone:false,
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent implements OnInit{
 myForm!:FormGroup;
 formFields = [
  {name:'name', label:'Name', type:'text', validators:[Validators.required]},
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

