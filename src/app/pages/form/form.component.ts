import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
            NzFormModule, CommonModule, FormsModule,
            ReactiveFormsModule, NzSelectModule, NzButtonModule,
            NzInputModule, NzIconModule
          ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  judicial: any = {
    type:[
      {
        id: "S",
        name: "最高法院"
      },
      {
        id: "SA",
        name: "最高行政法院"
      },
      {
        id: "HC",
        name: "高等法院"
      },
      {
        id: "HA",
        name: "高等行政法院"
      },
      {
        id: "F",
        name: "專業法院"
      },
      {
        id: "D",
        name: "地方法院"
      }
    ],
    HC:[
      {
        id: "HC",
        name: "臺灣高等法院",
      },
      {
        id: "TZHC",
        name: "臺灣高等法院臺中分院",
      },
      {
        id: "TNHC",
        name: "臺灣高等法院臺南分院",
      },
      {
        id: "GXHC",
        name: "臺灣高等法院高雄分院",
      },
      {
        id: "HLHC",
        name: "臺灣高等法院花蓮分院",
      },
      {
        id: "JMHC",
        name: "福建高等法院金門分院",
      }
    ],
    HA:[
      {
        id: "TBHAC",
        name: "臺北高等行政法院",
      },
      {
        id: "TZHAC",
        name: "臺中高等行政法院",
      },
      {
        id: "GXHAC",
        name: "高雄高等行政法院",
      }
    ],
    F:[
      {
        id: "IBFC",
        name: "智慧財產及商業法院",
      },
      {
        id: "YFFC",
        name: "臺灣高雄少年及家事法院",
      }
    ],
    D:[
      {
        id: "TBDC",
        name: "臺灣臺北地方法院",
      },
      {
        id: "SLDC",
        name: "臺灣士林地方法院",
      },
      {
        id: "XBDC",
        name: "臺灣新北地方法院",
      },
      {
        id: "ILDC",
        name: "臺灣宜蘭地方法院",
      },
      {
        "id": "JLDC",
        "name": "臺灣基隆地方法院",
      },
      {
        id: "TYDC",
        name: "臺灣桃園地方法院",
      },
      {
        id: "XZDC",
        name: "臺灣新竹地方法院",
      },
      {
        id: "MLDC",
        name: "臺灣苗栗地方法院",
      },
      {
        id: "TZDC",
        name: "臺灣臺中地方法院",
      },
      {
        id: "ZHDC",
        name: "臺灣彰化地方法院",
      },
      {
        id: "NTDC",
        name: "臺灣南投地方法院",
      },
      {
        id: "ULDC",
        name: "臺灣雲林地方法院",
      },
      {
        id: "JYDC",
        name: "臺灣嘉義地方法院",
      },
      {
        id: "TNDC",
        name: "臺灣臺南地方法院",
      },
      {
        id: "GXDC",
        name: "臺灣高雄地方法院",
      },
      {
        id: "QTDC",
        name: "臺灣橋頭地方法院",
      },
      {
        id: "HLDC",
        name: "臺灣花蓮地方法院",
      },
      {
        id: "TDDC",
        name: "臺灣臺東地方法院",
      },
      {
        id: "PDDC",
        name: "臺灣屏東地方法院",
      },
      {
        id: "PHDC",
        name: "臺灣澎湖地方法院",
      },
      {
        id: "JMDC",
        name: "福建金門地方法院",
      },
      {
        id: "LJDC",
        name: "福建連江地方法院",
      }
    ]
  }

  courtTypes = [
    { value: 'HC', label: '高等法院' },
    { value: 'HA', label: '高等行政法院' },
    { value: 'F', label: '專業法院' },
    { value: 'D', label: '地方法院' }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      type: ['S', [Validators.required]],
      url: [''],
    });
  }

  /**
   * 更改法院類型出現對應的選項
   * @param value
   */
  typeChange(value: string): void {
    if (value === 'S' || value === 'SA') {
      this.form.removeControl('HC');
      this.form.removeControl('HA');
      this.form.removeControl('F');
      this.form.removeControl('D');
    }
    else {
      if (this.form.get('type')?.value === 'HC') {
        this.form.addControl('HC', new FormControl('HC'));
      }
      if (this.form.get('type')?.value === 'HA') {
        this.form.addControl('HA', new FormControl('TBHAC'));
      }
      if (this.form.get('type')?.value === 'F') {
        this.form.addControl('F', new FormControl('IBFC'));
      }
      if (this.form.get('type')?.value === 'D') {
        this.form.addControl('D', new FormControl('TBDC'));
      }
    }
  }

  /**
   * 清空輸入的網址
   * @param value
   */
  setUrl(value: string) {
    this.form.get('url')?.setValue(value);
  }

}
