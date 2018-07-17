import { Component, OnInit } from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";

export interface TipsDialog{
    message:string
}

@Component({
    selector: 'app-tips',
    template: `<div class="modal-dialog">
    <div class="modal-content">
       <div class="modal-header">
         <button type="button" class="close" (click)="close()" >&times;</button>
         <h4 class="modal-title">{{message}}</h4>
       </div>
 </div>`
  })

  export class TipsDialogComponent extends DialogComponent<TipsDialog, null> implements TipsDialog{
    message:string

    constructor(
        dialogService: DialogService,
    )
    {
        super(dialogService)
    }
  }