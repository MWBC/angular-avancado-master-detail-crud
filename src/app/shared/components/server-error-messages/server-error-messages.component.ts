
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server-error-messages',
  imports: [],
  templateUrl: './server-error-messages.component.html',
  styleUrl: './server-error-messages.component.css'
})
export class ServerErrorMessagesComponent {

  @Input('server-error-messages') serverErrorMessages: string[] = [];

  constructor() {}
}
