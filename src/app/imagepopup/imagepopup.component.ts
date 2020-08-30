import { MatDialog } from '@angular/material';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-imagepopup',
  templateUrl: './imagepopup.component.html',
  styleUrls: ['./imagepopup.component.scss']
})
export class ImagepopupComponent implements OnInit {
  @ViewChild('imageDialog') imageDialog: TemplateRef<any>;
  randomImageId = `../../assets/offer/00${Math.floor(Math.random() * 2)}.png`;

  constructor(private _dialog: MatDialog) { }
  
  ngOnInit() {
    setTimeout(() =>{
      this.openDialogWithTemplateRef(this.imageDialog);
    }, 100);
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this._dialog.open(templateRef, {
      autoFocus: false,
                  maxWidth: '800px', maxHeight: '800px'
    });
  }

}
