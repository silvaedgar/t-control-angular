import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.css']
})
export class CardHeaderComponent implements OnInit {

  @Input() headerContains:any= {}
  @Input() subTitle:String = ""
  @Input() errorMessage:String = ""
  @Input() listForm:boolean = false

  @Output() clickBtnAdd = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  callFormOrDialog() {
    this.clickBtnAdd.emit()
  }

}
