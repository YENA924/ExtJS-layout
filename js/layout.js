(function() {

  // 지정된 이름과 모든 직접적인 종속성을 기준으로 모든 클래스를 로드
  // 전부 다 불러오기
  Ext.require(["*"]);

  Ext.onReady(function() {
    Ext.create('Ext.Viewport', {
        layout: 'border', // border layout
        defaults: { // 기본 옵션값 설정
            split: true
        },
        items: [
        { // header 
          region: 'north', // border 레이아웃 내부 영역을 정의
          title: 'Header',
          height: 32
        }, { // footer
            region: 'south',
            contentEl: 'footer',
            title: 'Footer',
            height: 100,
            minSize: 100,
            maxSize: 200,
            collapsible: true,
            collapsed: true
        }, { // right menu
            xtype: 'tabpanel', // tab이 존재하는 panel
            region: 'east',
            title: 'Rigth Menu',
            dockedItems: [{ // 이 패널에 도킹된 항목으로 추가할 구성 요소 또는 구성 요소
              dock: 'top',
              xtype: 'toolbar', // toolbar
              items: [ '->', {
                xtype: 'button',
                text: 'Test 버튼',
                tooltip: 'Test 버튼'
              }]
            }],
            animCollapse: true,
            collapsible: true,
            width: 225,
            minSize: 175,
            maxSize: 400,
            activeTab: 0,
            tabPosition: 'bottom',
            items: [{
              html: '<p>Rigth Menu</p>',
              title: 'Tab1',
              autoScroll: true
            }, Ext.create('Ext.grid.PropertyGrid', {
                title: 'Tab2',
                closable: true,
                source: {
                    "(name)": "Properties Grid",
                    "grouping": false,
                    "autoFitColumns": true,
                    "productionQuality": false,
                    "created": Ext.Date.parse('03/08/2022', 'm/d/Y'),
                    "tested": false,
                    "version": 0.01,
                    "borderWidth": 1
                }
            })]
        }, {
            region: 'west',
            title: 'Left Menu',
            width: 200,
            minWidth: 175,
            maxWidth: 400,
            collapsible: true,
            animCollapse: true,
            layout: 'accordion', // 아코디언 레이아웃
            items: [{
                contentEl: 'nav--left',
                title: 'Navigation',
                iconCls: 'nav'
            }, {
                title: 'Settings',
                html: '<p>Settings</p>',
                iconCls: 'settings'
            }, {
                title: 'Information',
                html: '<p>Infomation</p>',
                iconCls: 'info'
            }]
        },{
            xtype: 'tabpanel',
            region: 'center',
            title: 'Contents',
            activeTab: 0,
            bodyPadding: 15,
            items: [{
                contentEl: 'contents__panel--1',
                title: 'Panel1',
                closable: true,
                autoScroll: true
            }, {
                contentEl: 'contents__panel--2',
                title: 'Panel2 ',
                autoScroll: true
            }]
        }]
      })
    });
  
})();