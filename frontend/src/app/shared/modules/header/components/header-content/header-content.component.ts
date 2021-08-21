import { Component, OnInit } from '@angular/core';
import { ComplexShapeRendererService } from 'src/app/graphics/services/complex-shape-renderer.service';
import { CursorsService } from 'src/app/graphics/services/cursors.service';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss']
})
export class HeaderContentComponent implements OnInit {

  constructor(
    public cursorsService: CursorsService,
  ) { }

  ngOnInit(): void {
  }
}
