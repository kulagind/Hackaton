import { Component, OnInit } from '@angular/core';
import { ComplexShapeRendererService } from 'src/app/graphics/services/complex-shape-renderer.service';
import { CursorsService } from 'src/app/graphics/services/cursors.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss']
})
export class HeaderContentComponent implements OnInit {

  constructor(
    public router: Router,
    public cursorsService: CursorsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate(['projects']);
  }

  changeName(): void {
    const name = prompt('Введите имя:');
    this.authService.name = name;
  }
}
