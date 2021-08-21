import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public name = new FormControl('');

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.name.valueChanges.subscribe(value => {
      this.authService.name = value;
    });
  }

}
