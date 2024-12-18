import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
            CommonModule, RouterLink, RouterOutlet,
            NzIconModule, NzLayoutModule, NzMenuModule,
            NzDrawerModule, NzToolTipModule,
          ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isCollapsed = false;
  isDrawerVisible = false;
  visible = false;

  constructor() { }

  ngOnInit(): void {
    this.checkWindowWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkWindowWidth();
  }

  checkWindowWidth() {
    this.isCollapsed = window.innerWidth < 768;
    this.isDrawerVisible = window.innerWidth < 500;
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  showDrawer(): void {
    if (this.isDrawerVisible){
      this.open();
    }
    else{
      this.close();
      this.isCollapsed = !this.isCollapsed
    }
  }




}
