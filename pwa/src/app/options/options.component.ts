import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Option } from './option.enum';
@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  Option = Option;
  constructor(private _bottomSheetRef: MatBottomSheetRef<OptionsComponent>) { }

  ngOnInit(): void {
  }

  openLink(action: Option): void {
    this._bottomSheetRef.dismiss(action);
  }
}
