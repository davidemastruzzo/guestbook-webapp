import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() id: string;
  @Input() private disabled = false;
  @Input() private checked = false;
  @Output() checkedChange = new EventEmitter();

  get _checked(): boolean {
    return this.checked;
  }

  set _checked(value: boolean) {
    this.checked = value;
  }

  get _disabled(): boolean {
    return this.disabled;
  }

  constructor() { }

  ngOnInit() {
  }

  toggleChecked() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }

}
