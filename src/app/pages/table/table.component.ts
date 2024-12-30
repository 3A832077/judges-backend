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
import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface ItemData {
  id: number;
  type: string;
  name: string;
  url: string;
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
        NzIconModule
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
      position: 'center',
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
      position: 'center',
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
      width: '140px',
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
      type: 'S',
      name: '最高法院',
      url: 'https://tps.judicial.gov.tw/',
      createDate: this.formattedDate,
      lastUpdate: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
      done: true,
    },
    {
      id: 1,
      type: 'HC',
      name: '臺灣高等法院',
      url: 'https://tph.judicial.gov.tw/',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 2,
      type: 'TYDC',
      name: '臺灣桃園地方法院',
      url: 'https://tyd.judicial.gov.tw/',
      createDate: format(subDays(new Date(), 10), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 3,
      type: 'PCDC',
      name: '臺灣新北地方法院',
      url: 'https://pcd.judicial.gov.tw/',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: true
    },
    {
      id: 4,
      type: 'TBHAC',
      name: '臺北高等行政法院',
      url: 'https://tpb.judicial.gov.tw/',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 5,
      type: 'TZHC',
      name: '臺灣高等法院臺中分院',
      url: 'https://tch.judicial.gov.tw/',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 6,
      type: 'TBDC',
      name: '臺灣臺北地方法院',
      url: 'https://tpd.judicial.gov.tw/',
      createDate: format(subDays(new Date(), 15), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: true
    },
    {
      id: 7,
      type: 'JLDC',
      name: '臺灣基隆地方法院',
      url: 'https://kld.judicial.gov.tw/',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: true
    },
    {
      id: 8,
      type: 'TNDC',
      name: '臺灣臺南地方法院',
      url: 'https://tnd.judicial.gov.tw/',
      createDate: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 9,
      type: 'TBHAC',
      name: '臺北高等行政法院',
      url: 'https://tpb.judicial.gov.tw/',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 10,
      type: 'JMHC',
      name: '臺灣高等法院高雄分院',
      url: 'https://ksh.judicial.gov.tw/',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 11,
      type: 'SA',
      name: '福建高等法院金門分院',
      url: 'https://kmh.judicial.gov.tw/',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 12,
      type: 'MLDC',
      name: '臺灣苗栗地方法院',
      url: 'https://mld.judicial.gov.tw/',
      createDate: format(addDays(new Date(), 12), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 13,
      type: 'ILDC',
      name: '臺灣宜蘭地方法院',
      url: 'https://ild.judicial.gov.tw/',
      createDate: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 14,
      type: 'SA',
      name: '臺灣高雄少年及家事法院',
      url: 'https://fhfh.com',
      createDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 15,
      type: 'PDDC',
      name: '臺灣屏東地方法院',
      url: 'https://ptd.judicial.gov.tw/',
      createDate: format(addDays(new Date(), 4), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    },
    {
      id: 16,
      type: 'IBFC',
      name: '智慧財產及商業法院',
      url: 'https://ipc.judicial.gov.tw/',
      createDate: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
      lastUpdate: this.formattedDate,
      done: false
    }
  ];

  pageIndex : number = 1;

  pageSize : number = 10;

  filteredLists: any[] = [];

  total : number = this.listOfData.length;

  displayedList: any[] = this.listOfData;

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
   * 打開新增/編輯視窗
   */
  openModal(isEdit: boolean, data?: any): void {
    const modal: NzModalRef = this.modalService.create({
      nzTitle: isEdit ? '編輯' : '新增',
      nzContent: FormComponent,
      nzMaskClosable: false,
      nzCentered: true,
      nzZIndex: 60,
      nzWidth: window.innerWidth < 579 ? '400px' : '500px',
      nzFooter: null,
      nzData: data,
    });

    // 接收表單傳回的資料
    modal.afterClose.subscribe((result) => {
      const index = this.listOfData.findIndex(item => item.id === data.id);
      if (result){
        if (isEdit) { // 編輯
          if (index !== -1) {
            this.listOfData[index].name = result.label;
            this.listOfData[index].type = result.type;
            this.listOfData[index].url = result.url;
            this.listOfData[index].lastUpdate = this.formattedDate;
            this.message.success('編輯成功');
          }
          else {
            this.message.error('編輯失敗');
          }
        }
        else { // 新增
          this.listOfData.push({
            id: this.listOfData.length + 1,
            type: result.type,
            name: result.label,
            url: result.url,
            createDate: this.formattedDate,
            lastUpdate: this.formattedDate,
            done: false
          });
          this.message.success('新增成功');
        }
      }
      this.displayedList = [...this.listOfData];
    });
  }

  /**
   * 按下enter搜尋列表
   * @param event
   */
  searchList(event: any): any {
    if (event.key === 'Enter') {
      const searchTerm = event.target.value.trim();
      if (searchTerm === '') {
        this.filteredLists = this.listOfData;
      }
      else {
        this.filteredLists = this.listOfData.filter((item) =>
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
        if (index === -1) {
          this.message.error('刪除失敗');
        }
        else{
          this.listOfData.splice(index, 1);
          this.displayedList = [...this.listOfData];
          this.message.success('刪除成功');
        }
      },
      nzOnCancel: () => {
        modal.close();
      }
    });
  }
}
