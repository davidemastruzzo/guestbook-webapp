import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {

  @Input() color;
  @Input() private invalid = false;

  get _invalid(): boolean {
    return this.invalid;
  }

  constructor() { }

  ngOnInit() {
  }

}
