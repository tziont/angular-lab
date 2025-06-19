

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone:false,
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() title!: string;
  @Input() description!: string;

  @Output() cardClicked = new EventEmitter<string>();

  onClick() {
    this.cardClicked.emit(this.title);
  }
}
