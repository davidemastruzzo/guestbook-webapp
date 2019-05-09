import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss']
})
export class TextfieldComponent implements OnInit {

  @Input() label = '';
  @Input() id = '';
  @Input() type = 'text';
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() taken = false;
  @Input() errorMessage = 'invalid';
  @Input() centerText = false;
  @Input() value = '';
  @Output() valueChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeValue() {
    this.valueChange.emit(this.value);
  }
}
