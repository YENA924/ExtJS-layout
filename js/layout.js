(function() {

  Ext.require(["*"]);

  Ext.onReady(function() {

    Ext.QuickTips.init();

    Ext.create('Ext.Viewport', {
        layout: 'border',
        defaults: {
            split: true
        },
        items: [
        {
          region: 'north',
          title: 'Header',
          height: 32
        }, {
            region: 'south',
            contentEl: 'footer',
            height: 100,
            minSize: 100,
            maxSize: 200,
            collapsible: true,
            collapsed: true,
            title: 'Footer'
        }, {
            xtype: 'tabpanel',
            region: 'east',
            title: 'Rigth Menu',
            dockedItems: [{
              dock: 'top',
              xtype: 'toolbar',
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
            activeTab: 1,
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
                    "created": Ext.Date.parse('10/15/2006', 'm/d/Y'),
                    "tested": false,
                    "version": 0.01,
                    "borderWidth": 1
                }
            })]
        }, {
            region: 'west',
            stateId: 'navigation-panel',
            id: 'west-panel',
            title: 'West',
            width: 200,
            minWidth: 175,
            maxWidth: 400,
            collapsible: true,
            animCollapse: true,
            layout: 'accordion',
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
            deferredRender: false,
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