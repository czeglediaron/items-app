import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Item } from '../item';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit{
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Item){

  }
  

  ngOnInit(): void {
    
  }

}
