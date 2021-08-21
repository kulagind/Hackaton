import { Component, OnInit } from '@angular/core';
import { ComplexShapeRendererService } from 'src/app/graphics/services/complex-shape-renderer.service';
import { CursorsService } from 'src/app/graphics/services/cursors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss']
})
export class HeaderContentComponent implements OnInit {

  constructor(
    public router: Router,
    public cursorsService: CursorsService,
  ) { }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate(['projects']);
  }
}
