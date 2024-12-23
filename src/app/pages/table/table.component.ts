import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { NzTableModule,  NzTableFilterFn, NzTableFilterList, NzTableSortFn } from 'ng-zorro-antd/table';
import { TableService } from './table.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormComponent } from './form/form.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { addDays, format, subDays } from 'date-fns';

interface ItemData {
  id: number;
  name: string;
  createDate: string;
  lastUpdate: string;
  done: boolean;
}

interface ColumnItem {
  name: string;
  width: string;
  position: 'left' | 'right' | 'center' | null;
  sortFn: NzTableSortFn<ItemData> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<ItemData> | null;
  filterMultiple: boolean;
  showSort: boolean;
  showFilter: boolean;
}
@Component({
    selector: 'app-table',
    imports: [
        CommonModule, NzTableModule, NzButtonModule,
        NzModalModule, NzDividerModule
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {

  date = new Date();

  format = 'yyyy-MM-dd';

  formattedDate = formatDate(this.date, this.format, 'zh-TW');

  Columns: ColumnItem[] = [
    {
      name: '檔案名稱',
      width: '',
      position: null,
      sortFn: (a: ItemData, b: ItemData) => a.name.localeCompare(b.name, 'zh-Hant'),
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
      showSort: true,
      showFilter: false
    },
    {
      name: '建立時間',
      width: '550px',
      position: null,
      sortFn: (a: ItemData, b: ItemData) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime(),
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
      showSort: true,
      showFilter: false
    },
    {
      name: '最後修改時間',
      width: '550px',
      position: null,
      sortFn: (a: ItemData, b: ItemData) => new Date(a.lastUpdate).getTime() - new Date(b.lastUpdate).getTime(),
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
      showSort: true,
      showFilter: false
    },
    {
      name: '是否已解析',
      width: '150px',
      position: 'center',
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [
        { text: '是', value: true },
        { text: '否', value: false }
      ],
      filterFn: (done: boolean, item: ItemData) => item.done === done,
      showSort: false,
      showFilter: true
    },
    {
      name: '操作',
      width: '150px',
      position: 'center',
      sortFn: null,
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true,
      showSort: false,
      showFilter: false
    },
  ];

  listOfData: ItemData[] = [
    {
      id: 1,
      name: '檔案1',
      createDate: this.formattedDate,
      lastUpdate: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
      done: true,
    },
    {
      id: 2,
      name: '檔案2',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    }
  ];

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
