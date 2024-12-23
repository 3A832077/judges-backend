import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableService } from './table.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormComponent } from './form/form.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-table',
    imports: [
        CommonModule, NzTableModule, NzButtonModule,
        NzModalModule
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {

  constructor(
              private tableService: TableService,
              private modalService: NzModalService,
              private message: NzMessageService
            ) {}

  ngOnInit(): void {}

  /**
   * 打開新增視窗
   */
  openModal(): void {
    const modal: NzModalRef = this.modalService.create({
      nzTitle: '新增檔案',
      nzContent: FormComponent,
      nzMaskClosable: false,
      nzCentered: true,
      nzZIndex: 60,
      nzWidth: window.innerWidth < 579 ? '400px' : '500px',
      nzFooter: null
    });

    // 接收子組件傳回的資料
    modal.afterClose.subscribe((result) => {
      if (result) {
        console.log(result);
        this.message.success('新增成功');
      }
    });
  }

  downloadFile() {
    const url = '';
    this.tableService.downloadFile(url).subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'downloadedFile';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
