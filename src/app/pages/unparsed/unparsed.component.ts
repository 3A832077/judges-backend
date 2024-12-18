import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-unparsed',
  standalone: true,
  imports: [
            CommonModule, NzTableModule,
          ],
  templateUrl: './unparsed.component.html',
  styleUrl: './unparsed.component.css'
})
export class UnparsedComponent {

}
