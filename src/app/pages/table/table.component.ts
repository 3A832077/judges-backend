import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { NzTableModule,  NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormComponent } from './form/form.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { addDays, format, subDays } from 'date-fns';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';

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
  sortOrder: NzTableSortOrder | null;
  filterMultiple: boolean;
  showSort: boolean;
  showFilter: boolean;
}
@Component({
    selector: 'app-table',
    imports: [
        CommonModule, NzTableModule, NzButtonModule,
        NzModalModule, NzDividerModule, NzFormModule,
        FormsModule, ReactiveFormsModule, NzInputModule,
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
      sortOrder: null,
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null,
      showSort: true,
      showFilter: false
    },
    {
      name: '建立時間',
      width: '',
      position: null,
      sortOrder: 'descend',
      sortFn: (a: ItemData, b: ItemData) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime(),
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
      showSort: true,
      showFilter: false
    },
    {
      name: '最後修改時間',
      width: '',
      position: null,
      sortOrder: null,
      sortFn: (a: ItemData, b: ItemData) => new Date(a.lastUpdate).getTime() - new Date(b.lastUpdate).getTime(),
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
      showSort: true,
      showFilter: false
    },
    {
      name: '是否已解析',
      width: '',
      position: 'center',
      sortFn: null,
      sortOrder: null,
      filterMultiple: true,
      listOfFilter: [
        { text: '是', value: true },
        { text: '否', value: false }
      ],
      filterFn: (done: boolean[], item: ItemData) => done.some(d => item.done === d),
      showSort: false,
      showFilter: true
    },
    {
      name: '操作',
      width: '120px',
      position: 'center',
      sortOrder: null,
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
      id: 0,
      name: '檔案1',
      createDate: this.formattedDate,
      lastUpdate: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
      done: true,
    },
    {
      id: 1,
      name: 'ccc2',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 2,
      name: '檔案2',
      createDate: format(subDays(new Date(), 10), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 3,
      name: '檔案2',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: true
    },
    {
      id: 4,
      name: 'cccc',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 5,
      name: '檔案2',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 6,
      name: 'aaa',
      createDate: format(subDays(new Date(), 15), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: true
    },
    {
      id: 7,
      name: '檔案2',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: true
    },
    {
      id: 8,
      name: '檔案2',
      createDate: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 9,
      name: '檔案2',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 10,
      name: 'ddd',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 11,
      name: '檔案2',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 12,
      name: '檔案2',
      createDate: format(addDays(new Date(), 12), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 13,
      name: '檔案2',
      createDate: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 14,
      name: '檔案2',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 15,
      name: '檔案2',
      createDate: format(addDays(new Date(), 4), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 16,
      name: '檔案2',
      createDate: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 17,
      name: '檔案2',
      createDate: format(addDays(new Date(), 4), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 18,
      name: '檔案2',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 19,
      name: '檔案2',
      createDate: format(subDays(new Date(), 6), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
  ];

  pageIndex : number = 1;

  pageSize : number = 10;

  filteredLists: any[] = [];

  total : number = this.listOfData.length;

  displayedList: any[] = this.listOfData;

  totalPages: number = Math.ceil(this.total / this.pageSize);

  form: FormGroup = new FormGroup({});

  constructor(
              private modalService: NzModalService,
              private message: NzMessageService,
              private fb: FormBuilder
            ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      search: [null],
    });
  }

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

    // 接收表單傳回的資料
    modal.afterClose.subscribe((result) => {
      if (result) {
        this.listOfData.push(
          {
            id: this.listOfData.length + 1,
            name: result.label,
            createDate: this.formattedDate,
            lastUpdate: this.formattedDate,
            done: false
          }
        );
        this.listOfData = [...this.listOfData];
        this.message.success('新增成功');
      }
    });
  }

  /**
   * 按下enter搜尋列表
   * @param event
   */
  searchList(event: any): any {
    if (event.key === 'Enter') {
      const searchTerm = event.target.value.trim();
      const startIndex = (this.pageIndex - 1) * 12;
      const endIndex = Math.min(startIndex + 12, this.total);
      const currentPageItems = this.listOfData.slice(startIndex, endIndex);

      if (searchTerm === '') {
        this.filteredLists = currentPageItems;
      }
      else {
        this.filteredLists = currentPageItems.filter((item) =>
          item.name.indexOf(searchTerm) !== -1
        );
      }
    }
    this.displayedList = this.filteredLists;
  }

  /**
   * 刪除資料
   * @param id
   */
  deleteFile(id: number): void {
    const modal: NzModalRef = this.modalService.confirm({
      nzTitle: '確定要刪除此檔案嗎?',
      nzOnOk: () => {
        const index = this.listOfData.findIndex(item => item.id === id);
        this.listOfData.splice(index, 1);
        this.displayedList = [...this.listOfData];
        this.message.success('刪除成功');
      },
      nzOnCancel: () => {
        modal.close();
      }
    });
  }

}
