import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
            NzFormModule, CommonModule, FormsModule,
            ReactiveFormsModule, NzSelectModule,
          ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  highJudicial = [
    {
      "id": "HC",
      "name": "臺灣高等法院"
    },
    {
      "id": "TZHC",
      "name": "臺灣高等法院臺中分院",
    },
    {
      "id": "TNHC",
      "name": "臺灣高等法院臺南分院",
    },
    {
      "id": "GXHC",
      "name": "臺灣高等法院高雄分院",
    },
    {
      "id": "HLHC",
      "name": "臺灣高等法院花蓮分院",
    },
    {
      "id": "JMHC",
      "name": "福建高等法院金門分院",
    }
  ]

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      judicial: [null, [Validators.required]],
      url: [null, ],
    });

  }

}
