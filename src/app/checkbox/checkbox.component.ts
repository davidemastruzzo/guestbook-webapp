import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() id: string;
  @Input() private invalid = false;
  @Input() private checked = false;
  @Output() checkedChange = new EventEmitter();

  get _checked(): boolean {
    return this.checked;
  }

  get _invalid(): boolean {
    return this.invalid;
  }

  constructor() {
  }

  ngOnInit() {
  }

  toggleChecked() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }

}
