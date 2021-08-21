import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Design';

  constructor() {
    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
    }, false);
  }
}
