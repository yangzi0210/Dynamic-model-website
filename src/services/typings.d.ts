declare namespace BasicListApi {
  interface Page {
    title: string;
    type: string;
    searchBar: boolean;
    trash: boolean;
  }
  interface Datum {
    id: number;
    parent_id: number;
    name: string;
    create_time: Date;
    delete_time?: any;
    status: number;
    value: any;
    title: string;
    depth: number;
  }
  interface Action {
    component: string;
    text: string;
    type: string;
    action: string;
    uri: string;
    method: string;
  }
  interface TableColumn {
    title: string;
    dataIndex: string;
    key: string;
    type?: string;
    data?: Datum[];
    hideInColumn?: boolean;
    sorter?: boolean;
    mode?: string;
    actions?: Action[];
    [key: string]: any;
  }

  interface Layout {
    tableColumn: TableColumn[];
    tableToolBar: Action[];
    batchToolBar: Action[];
  }

  interface Pivot {
    id: number;
    admin_id: number;
    group_id: number;
    create_time: string;
    update_time: string;
    delete_time?: any;
    status: number;
  }
  interface Group {
    id: number;
    parent_id: number;
    name: string;
    create_time: Date;
    update_time: Date;
    delete_time?: any;
    status: number;
    pivot: Pivot;
  }

  interface DataSource {
    id: number;
    username: string;
    display_name: string;
    create_time: Date;
    delete_time?: any;
    status: number;
    groups: Group[];
  }
  interface Meta {
    total: number;
    per_page: number;
    page: number;
  }
  interface Data {
    page: Page;
    layout: Layout;
    dataSource: DataSource[];
    meta: Meta;
  }
  interface RootObject {
    success: boolean;
    message: string;
    data: Data;
  }
}

declare namespace PageApi {
  interface Page {
    title: string;
    type: string;
  }

  interface Datum2 {
    id: number;
    parent_id: number;
    name: string;
    create_time: Date;
    delete_time?: any;
    status: number;
    value: number;
    title: string;
    depth: number;
  }

  interface Datum {
    title: string;
    dataIndex: string;
    key: string;
    type: string;
    disabled: boolean;
    data: Datum2[];
  }

  interface Tab {
    name: string;
    title: string;
    data: Datum[];
  }

  interface Datum3 {
    component: string;
    text: string;
    type: string;
    action: string;
    uri: string;
    method: string;
  }

  interface Action {
    name: string;
    title: string;
    data: Datum3[];
  }

  interface Layout {
    tabs: Tab[];
    actions: Action[];
  }

  interface DataSource {
    id: number;
    username: string;
    display_name: string;
    create_time: Date;
    update_time: Date;
    status: number;
    groups: number[];
  }

  interface Data {
    page: Page;
    layout: Layout;
    dataSource: DataSource;
  }

  interface RootObject {
    success: boolean;
    message: string;
    data: Data;
  }
}
