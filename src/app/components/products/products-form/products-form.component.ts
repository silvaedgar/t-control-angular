import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsModel } from 'src/app/models/products.model';
import { CoinsService } from 'src/app/services/coins.service';
import { ProductCategoriesService } from 'src/app/services/product-categories.service';
import { ProductGroupsService } from 'src/app/services/product-groups.service';
import { ProductsService } from 'src/app/services/products.service';
import { TaxesService } from 'src/app/services/taxes.service';
import { ErrorFieldService } from 'src/app/shared/services/error-field.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {

  id = 0
  updating = false
  message = 'Leyendo Datos ...'
  errorMessage = ''
  errors = []
  groups: any = []
  categories: any = []
  taxes: any = []
  headerContains = { }
  dataCoinCalcSale: any = []
  dataCoinCalcPurchase: any = []
  coinSymbols  = {'salePrice' : '', 'purchasePrice' : '', 'sale' : '', 'purchase' : ''}

  formLogin = this.formBuilder.group({
    code : new FormControl('',[Validators.minLength(3),Validators.maxLength(20)]),
    name : new FormControl ('',[Validators.minLength(3), Validators.maxLength(60)]),
    costPrice : new FormControl(0, [Validators.min(0)]),
    salePrice : new FormControl(0,[Validators.min(0)]),
    costOtherPrice : new FormControl(0,[Validators.min(0)]),
    saleOtherPrice : new FormControl(0,[Validators.min(0)]),
    categoryId : new FormControl(0,[Validators.min(-1)]),
    taxId: new FormControl(0,[Validators.min(-1)]),
    descriptionGroup : new FormControl('')
  })

  constructor(private _route:ActivatedRoute, private _product: ProductsService,
      private formBuilder: FormBuilder, private _groups: ProductGroupsService,
      private _categories: ProductCategoriesService, private _taxes: TaxesService,
      private _snack: SnackbarService, private _errorMessage : ErrorFieldService,
      private _coin: CoinsService) {}


  ngOnInit(): void {
    this.updating = true
    this.loadTaxes()
    this.loadGroups()
    this.loadCategories()
    this.id = this._route.snapshot.params.id
    if (this.id != 0) {
      this._product.loadProducts(this.id).subscribe((resp:any) => {
          this.formLogin.setValue({
            code : resp.data.code,
            name : resp.data.name,
            costPrice : resp.data.costPrice,
            salePrice : resp.data.salePrice,
            saleOtherPrice : 0,
            costOtherPrice : 0,
            categoryId : resp.data.productCategory.id,
            taxId: resp.data.tax.id,
            descriptionGroup : resp.data.productCategory.productGroup.description
          })
          this.updating = false
          this.dataCoin()
      }, (error) => {
          this.updating = false
          if (error.status != 400)
            this.errorMessage = this._errorMessage.messageErrorConection(error.status)
          else
            this.errors = error.error.errors
          this.generateHeader()
      })
    }
    else
      this.dataCoin()
  }

  dataCoin() {
    this._coin.generateDataCoin("Purchase").subscribe((resp: any) =>{
        if (resp.status == "OK") {
          this.dataCoinCalcPurchase = resp.data;
          this.coinSymbols.purchase = resp.data.baseCoin.symbol
          this.coinSymbols.purchasePrice = resp.data.calcCoin.symbol
          this.calculateOtherMount('Purchase',false)
        }
        else
          this.errorMessage = resp.message
        this._coin.generateDataCoin("Sale").subscribe((resp: any) => {
          if (resp.status == "OK") {
              this.dataCoinCalcSale = resp.data;
              this.coinSymbols.sale = resp.data.baseCoin.symbol
              this.coinSymbols.salePrice = resp.data.calcCoin.symbol
              this.calculateOtherMount('Sale',false)
          }
          else
            this.errorMessage = resp.message
          this.updating = false
          this.generateHeader()
        }, (error) => {
          this.updating =false;
          this.errorMessage = this._errorMessage.messageErrorConection(error.status)
          this.generateHeader()
        })
      },(error) => {
        this.updating =false;
        this.errorMessage = this._errorMessage.messageErrorConection(error.status)
        this.generateHeader()
    })

  }

  loadTaxes() {
      this.updating = true
      this._taxes.loadTaxes().subscribe((resp:any) => {
          if (resp.status == "OK")
            this.taxes = resp.data
          else
            this.errorMessage = resp.message
      }, (error) => {
          this.updating = false
          if (error.status != 400)
            this.errorMessage = this._errorMessage.messageErrorConection(error.status)
          else
            this.errors = error.error.errors
      })
  }

  loadGroups() {
      this.updating = true
      this._groups.loadProductGroups().subscribe((resp:any) => {
          if (resp.status == "OK")
            this.groups = resp.data
          else
            this.errorMessage = resp.message
          this.updating = false
      }, (error) => {
          this.updating = false
          if (error.status != 400)
            this.errorMessage = this._errorMessage.messageErrorConection(error.status)
          else
            this.errors = error.error.errors
      })
  }

  loadCategories() {
      this.updating = true
      this._categories.loadProductCategories().subscribe((resp:any) => {
          if (resp.status == "OK")
            this.categories = resp.data
          else
            this.errorMessage = resp.message
          this.updating = false
      }, (error) => {
          this.updating = false
          if (error.status != 400)
            this.errorMessage = this._errorMessage.messageErrorConection(error.status)
          else
            this.errors = error.error.errors
      })
  }

  formSubmit() {
    this.updating = true
    this.errorMessage = ""
    let userId = 1
    let productDTO = new ProductsModel(this.id,this.formLogin.value.code,this.formLogin.value.name,
                this.formLogin.value.costPrice,this.formLogin.value.salePrice,this.formLogin.value.categoryId,
                this.formLogin.value.taxId,userId)
    this._product.saveProduct(productDTO).subscribe((resp:any) => {
        this.updating = false
        this._snack.showSnackBar(resp.message,"Aceptar", 4000,"center","top")
        this.closeForm()
    }, (error) => {
      this.updating = false
      if (error.status != 400)
          this.errorMessage = this._errorMessage.messageErrorConection(error.status)
      else
          this.errors = error.error.errors
    })

  }

  messageError(field: string) {
    return this._errorMessage.findFieldIfError(field,this.errors);
  }

  closeForm() {
      window.location.href = "/products"
      // this.routes.navigateByUrl ("/products")

  }

  assignDescriptionGroup(description : String) {
    this.formLogin.patchValue({descriptionGroup : description })
  }

  calculateOtherMount(option: String, other: boolean) {
    if (option == "Purchase") {
        if (!other && this.dataCoinCalcPurchase.calcCoin.id != this.dataCoinCalcPurchase.baseCoin.id) {
          let otherPrice = this.dataCoinCalcPurchase.rate[0].purchase_price * this.formLogin.value.costPrice
          this.formLogin.patchValue({costOtherPrice : otherPrice.toFixed(2) })
        }
        if (other && this.dataCoinCalcPurchase.calcCoin.id != this.dataCoinCalcPurchase.baseCoin.id) {
          let otherPrice = this.formLogin.value.costOtherPrice / this.dataCoinCalcPurchase.rate[0].purchase_price
          this.formLogin.patchValue({costPrice : otherPrice.toFixed(2) })
        }
    }
    else {
        if (!other && this.dataCoinCalcSale.calcCoin.id != this.dataCoinCalcSale.baseCoin.id) {
          let otherPrice = this.dataCoinCalcSale.rate[0].sale_price * this.formLogin.controls.salePrice.value
          this.formLogin.patchValue({saleOtherPrice : otherPrice.toFixed(2) })
        }
        if (other && this.dataCoinCalcSale.calcCoin.id != this.dataCoinCalcSale.baseCoin.id) {
          let otherPrice =  this.formLogin.value.saleOtherPrice / this.dataCoinCalcSale.rate[0].sale_price
          this.formLogin.patchValue({salePrice : otherPrice.toFixed(2) })
        }
    }
  }

  generateHeader() {
    let tasaVta = (this.dataCoinCalcSale.calcCoin.id != this.dataCoinCalcSale.baseCoin.id
              ? "Tasa Venta: " + this.dataCoinCalcSale.rate[0].sale_price + this.dataCoinCalcSale.baseCoin.symbol
              : '')
    let tasaCompra = (this.dataCoinCalcPurchase.calcCoin.id != this.dataCoinCalcPurchase.baseCoin.id
              ? "Tasa Compra: " + this.dataCoinCalcPurchase.rate[0].purchase_price + this.dataCoinCalcPurchase.baseCoin.symbol
              : '')
    this.headerContains = { 'title1' : (this.id == 0 ? 'Crear' : 'Editar')  + " Producto",
        'subTitle1': '', 'title2' : tasaVta , 'subTitle2' : tasaCompra,
        'title3' : '', 'subTitle3' : '',
        'listform' : "false", 'errorMessage' : this.errorMessage }
  }

}
