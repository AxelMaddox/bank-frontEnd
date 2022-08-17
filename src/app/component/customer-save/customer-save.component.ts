import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/domain/customer';
import { DocumentType } from 'src/app/domain/document-type';
import { CustomerService } from 'src/app/service/customer.service';
import { DocumentTypeService } from 'src/app/service/document-type.service';



@Component({
  selector: 'app-customer-save',
  templateUrl: './customer-save.component.html',
  styleUrls: ['./customer-save.component.css']
})
export class CustomerSaveComponent implements OnInit {

  customer!:Customer;
  documentTypes!:DocumentType[]; //! para inicializar y ctrl +space para import

  showMsg: boolean = false;
  messages:string[]=[""];

  constructor(public customerService:CustomerService, //importacion e inyeccion de dependencia
    public documentTypeService:DocumentTypeService) { }


  ngOnInit(): void {
    console.log("hpnlk");
    this.customer={
      address:'',
      custId:0,
      dotyId:0,
      email: '',
      enable:true,
      name: '',
      phone:'',
      token: ''
    }
    this.findAllDocumentType(); //cargar el customer
  }

  findAllDocumentType():void{
    this.documentTypeService.findAll().subscribe(data=>{
      this.documentTypes=data;
    })
  }

  save():void{
    this.customerService.save(this.customer).subscribe(ok=>{
      this.showMsg=true;
      this.messages[0]="customer grabado con exito";
    }, error=>{
      this.showMsg=true;
      this.messages[0]="error.error.error";

    });
  }

}
