import { Component, Input } from '@angular/core';
import { IResponseFreind } from '../../interfaces/freind/response-freind';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-message-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-modal.component.html',
  styleUrl: './message-modal.component.scss'
})
export class MessageModalComponent {
  apiImageUrl: string = ''
  @Input() freind: Partial<IResponseFreind> = {};

  constructor() {
    this.apiImageUrl = environment.apiUrlImages;
    console.log(this.apiImageUrl);
  }
}

