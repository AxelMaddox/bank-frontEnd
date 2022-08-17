import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { DocumentTypeService } from 'src/app/service/document-type.service';
import { __values } from 'tslib';

@Component({
	selector: 'app-customer-edit',
	templateUrl: './customer-edit.component.html',
	styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  custId!:any;
  customer!: Customer;
  documentTypes!:DocumentType[];

  showMsg:boolean=false;
  messages!:string[];

	constructor(public activatedRoute:ActivatedRoute,
    public customerService:CustomerService,
    public documentTypeService:DocumentTypeService) { }

	ngOnInit(): void {

    let params=this.activatedRoute.snapshot.paramMap.get('custId');
		this.custId=params;
		console.log(this.custId);  // Ni idea como lo arregle jssj
    this.customerService.findById(this.custId).subscribe(data =>{
      this.customer=data;
      console.table(this.customer);
    })


	}
  update():void{
    this.messages=[""];
    this.customerService.update(this.customer).subscribe(ok=>{
      this.showMsg=true;
      this.messages[0]="El customer se modifico con exito";
    },error=>{
      this.showMsg=true;
      this.messages=error.error.error;
    })
  }
  delete():void{
    this.messages=[""];
    this.customerService.delete(this.customer.custId).subscribe(ok=>{
      this.showMsg=true;
      this.messages[0]="El customer se borro con exito";
    },error=>{
      this.showMsg=true;
      this.messages=error.error.error;
    })
  }
}
