import { Component, OnInit } from '@angular/core';
import { NodeEvent, TreeModel, RenamableNode, Ng2TreeSettings } from './component/tree/index';

@Component({
  selector: 'app-root',
  template: `
    <div class="tree-demo-app">
    <div class="tree-container">
        <p class="tree-title">分销平台树</p>
        <p class="notice">异步加载</p>
        <tree
          [tree]="pls"
          [settings]="settings"
          (nodeRemoved)="onNodeRemoved($event)"
          (nodeRenamed)="onNodeRenamed($event)"
          (nodeSelected)="onNodeSelected($event)"
          (nodeMoved)="onNodeMoved($event)"
          (nodeCreated)="onNodeCreated($event)">
        </tree>
      </div>

      <div class="tree-container">
        <p class="tree-title">营销通后台</p>
        <p class="notice">有树根、子叶异步加载</p>
        <tree
          [tree]="fonts"
          (nodeRemoved)="onNodeRemoved($event)"
          (nodeRenamed)="onNodeRenamed($event)"
          (nodeSelected)="onNodeSelected($event)"
          (nodeMoved)="onNodeMoved($event)"
          (nodeCreated)="onNodeCreated($event)"
          (nodeExpanded)="onNodeExpanded($event)"
          (nodeCollapsed)="onNodeCollapsed($event)">
        </tree>
      </div>
      
      <div class="tree-container">
        <p class="tree-title">分销平台（目录/文件结构）</p>
        <p class="notice">高级配置（添加awesome图标）</p>
        <tree
          [tree]="dfs"
          (nodeRemoved)="onNodeRemoved($event)"
          (nodeRenamed)="onNodeRenamed($event)"
          (nodeSelected)="onNodeSelected($event)"
          (nodeMoved)="onNodeMoved($event)"
          (nodeCreated)="onNodeCreated($event)"
          (nodeExpanded)="onNodeExpanded($event)"
          (nodeCollapsed)="onNodeCollapsed($event)">
        </tree>
      </div>
    </div>
  `,
  styles: [`
    .tree-demo-app {
      margin: auto;
      width: -moz-fit-content;
      width: -webkit-fit-content;
      width: fit-content;
    }

    .tree-demo-app .tree-container {
      float: left;
      vertical-align: top;
      width: 500px;
    }

    .tree-title {
      color: #40a070;
      font-size: 2em;
    }

    .notice {
      color: #e91e63;
      font-size: 1.2em;
      font-style: italic;
    }

    :host /deep/ .fa {
      cursor: pointer;
    }

    :host /deep/ .fa.disabled {
      cursor: inherit;
      color: #757575;
    }
  `]
})
export class AppComponent {
  public settings: Ng2TreeSettings = {
    //隐藏root
    rootIsVisible: false
  };

  public fonts: TreeModel = {
    value: '树根',
    children: [
      {
        value: '数据分析（子叶都不可拖拽、显示菜单操作）',
        settings: {
          'static': true
          // rightMenu: false
        },
        children: [
          { value: '<a href="https://www.baidu.com" id="antiqua" class="test">百度</a>链接' },
          { value: '考核报表',children: [
              { value: '633数据报表' },
              { value: '会员明细报表' },
              { value: '终端报表' }
            ] },
          { value: '分析报表',children: [
              { value: '优惠劵费用报表' },
              { value: '会员回访明细表' },
              { value: '香港会员' }
            ] }
        ]
      },
      {
        value: '人事薪酬',
        children: [
          { value: '信息公告', children: [
              { value: '信息公告展示' }
            ] },
          { value: '档案工资',children: [
              { value: '人事档案管理' },
              { value: '审批工资' },
              { value: 'SA育婴顾问工资' }
            ] }
        ]
      },
      {
        value: '营销管理（异步加载）',
        // children属性被忽略如果存在loadChildren属性
        children: [{ value: '优惠劵' }],
        loadChildren: (callback) => {
          setTimeout(() => {
            callback([
              { value: '商家学院' },
              { value: '活动管理' },
              { value: '社群报备' }
            ]);
          }, 2000);
        }
      }
    ]
  };

  public pls: TreeModel;

  public dfs: TreeModel = {
    value: '系统树根',
    id: 1,
    settings: {
      cssClasses: {
        expanded: 'fa fa-caret-down',
        collapsed: 'fa fa-caret-right',
        empty: 'fa fa-caret-right disabled',
        leaf: 'fa'
      },
      templates: {
        node: '<i class="fa fa-folder-o"></i>',
        leaf: '<i class="fa fa-file-o"></i>'
      }
    },
    children: [
      {
        value: '政策动态',
        id: 2,
        children: [
          { value: '系统帮助', id: 3 },
          { value: '联系人编辑', id: 4 },
          { value: '通知公告', id: 5 },
          { value: '财务公告', id: 6 },
          { value: '产品简介', id: 7 },
          { value: '发货信息', id: 8 },
          { value: '销售政策', id: 9 },
          { value: '公司证照', id: 10 },
          { value: '产品证照', id: 11 },
          { value: '经销商故事', id: 12 }
        ]
      },
      {
        value: ' 订单管理',
        id: 13,
        children: [
          {
            value: '配额设置',
            id: 14,
            children: [
              { value: '产品配额设置', id: 15 },
              { value: '总部配额管理', id: 16 },
              { value: '办事处配额分配', id: 17 },
              { value: '经销商配额明细', id: 18 }
            ]
          },
          {
            value: '跨境订购',
            id: 22,
            children: []
          },
          { value: '二级药线收货品项', id: 23 },
          { value: '特殊订单权限查看', id: 24 },
          { value: '跨境订购', id: 25 },
          { value: '跨境订单查询', id: 26 },
          { value: 'B2B订单', id: 27 },
          { value: 'B2B订单查询', id: 28 },
          { value: '订单查询', id: 29 },
          { value: '订单明细', id: 30 },
          { value: '订单设置', id: 31 }
        ]
      },
      {
        value: '电商业务',
        id: 32,
        settings: {
          leftMenu: false,
          rightMenu: false
        },
        children: [
          {
            value: '免单返款',
            id: 33,
            settings: {
              leftMenu: true
            }
          },
          {
            value: '员工订单',
            id: 335,
            settings: {
              leftMenu: true
            }
          },
          {
            value: '发货异常查询',
            id: 333,
            settings: {
              rightMenu: true
            }
          }
        ]
      },
      { value: '财务管理', id: 34, children: [] },
      { value: '经销商绩效', id: 35, children: [] },
      { value: 'PDA管理', id: 36, children: [] },
      {
        value: 'PDA管理',
        id: 37,
        children: [
          {
            value: 'PDA管理1',
            id: 38,
            children: [
              {
                value: 'PDA管理2',
                id: 39,
                children: [
                  {
                    value: 'PDA管理3',
                    id: 40,
                    children: [
                      {
                        value: 'PDA管理4',
                        id: 41,
                        children: [
                          { value: 'PDA管理5', id: 42 },
                          { value: 'PDA管理6', id: 43 }
                        ]
                      },
                      { value: 'PDA管理7', id: 48, children: [] }
                    ]
                  }
                ]
              },
              { value: 'PDA管理8', id: 49, children: [] },
              { value: 'PDA管理9', id: 50, children: [] },
              {
                value: 'PDA管理10',
                id: 52,
                children: [{ value: 'PDA管理11' }],
                loadChildren: (callback) => {
                  setTimeout(() => {
                    callback([
                      { value: 'PDA管理12', id: 78, children: [] },
                      { value: 'PDA管理13', id: 79, children: [] }
                    ]);
                  }, 5000);
                }
              },
              { value: 'PDA管理14', id: 53, children: [] }
            ]
          },
          {
            value: 'PDA管理15',
            id: 54,
            settings: {
              leftMenu: true
            },
            children: [
              { value: 'PDA管理16', id: 55, children: [] },
              {
                value: 'PDA管理17',
                id: 56,
                settings: {
                  templates: {
                    leftMenu: '<i class="fa fa-navicon"></i>'
                  }
                },
                children: [
                  { value: 'PDA管理18', id: 57 },
                  { value: 'PDA管理19', id: 58 }
                ]
              },
              { value: 'PDA管理20', id: 63, children: [] },
              { value: 'PDA管理21', id: 64, children: [] }
            ]
          }
        ]
      },
      { value: '物料订购', id: 76, children: [] },
      { value: '系统管理', id: 77, children: [] }
    ]
  };

  private static logEvent(e: NodeEvent, message: string): void {
    console.log(e);
    console.log(`${message}:${e.node.value}`);
  }

  public ngOnInit(): void {
    setTimeout(() => {
      this.pls = {
        value: '树根',
        children: [
          {
            value: '首页'
          },
          {
            value: '政策与动态',
            children: [
              {
                value: {
                  name: '系统帮助',
                  setName(name: string): void {
                    this.name = name;
                  },
                  toString(): string {
                    return this.name;
                  }
                } as RenamableNode
              },
              { value: '联系人编辑' },
              { value: '通知公告' },
              { value: '财务公告' },
              { value: '产品简介' },
              { value: '发货信息' },
              { value: '通知公告' },
              { value: '销售政策' }
            ]
          },
          {
            value: '订单管理',
            children: [
              { value: '跨境订购' },
              { value: 'B2B订单' },
              { value: '订单查询' },
              {
                value: '配额设置', children: [
                  { value: "产品配额设置" },
                  { value: "总部配额管理" },
                  { value: "办事处配额分配" }
                ]
              }
            ]
          }
        ]
      };
    }, 2000);
  }

  public onNodeRemoved(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Removed');
  }

  public onNodeMoved(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Moved');
  }

  public onNodeRenamed(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Renamed');
  }

  public onNodeCreated(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Created');
  }

  public onNodeSelected(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Selected');
  }

  public onNodeExpanded(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Expanded');
  }

  public onNodeCollapsed(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Collapsed');
  }
}
