(function() {

  function getQueryParam(name, queryString) {
    var match = RegExp(name + '=([^&]*)').exec(queryString || location.search);
    return match && decodeURIComponent(match[1]);
    }

    var scriptTags = document.getElementsByTagName('script'),
        defaultTheme = 'neptune',
        defaultRtl = false,
        i = scriptTags.length,
        defaultQueryString, src, theme, rtl;

    while (i--) {
        src = scriptTags[i].src;
        if (src.indexOf('include-ext.js') !== -1) {
            defaultQueryString = src.split('?')[1];
            if (defaultQueryString) {
                defaultTheme = getQueryParam('theme', defaultQueryString) || defaultTheme;
                defaultRtl = getQueryParam('rtl', defaultQueryString) || defaultRtl;
            }
            break;
        }
    }

    Ext.themeName = theme = getQueryParam('theme') || defaultTheme;

    rtl = getQueryParam('rtl') || defaultRtl;

    if (rtl.toString() === 'true') {
        Ext.define('Ext.GlobalRtlComponent', {
            override: 'Ext.AbstractComponent',
            rtl: true
        });
    }

    Ext.onReady(function() {
      Ext.getBody().addCls(Ext.baseCSSPrefix + 'theme-' + Ext.themeName);

      function setParam(param) {
          var queryString = Ext.Object.toQueryString(
              Ext.apply(Ext.Object.fromQueryString(location.search), param)
          );
          location.search = queryString;
      }

      function removeParam(paramName) {
          var params = Ext.Object.fromQueryString(location.search);

          delete params[paramName];

          location.search = Ext.Object.toQueryString(params);
      }

      var toolbar;
          
      setTimeout(function() {
          toolbar = Ext.widget({
              xtype: 'toolbar',
              border: true,
              rtl: false,
              id: 'options-toolbar',
              floating: true,
              fixed: true,
              preventFocusOnActivate: true,
              draggable: {
                  constrain: true
              },
              items: [{
                  xtype: 'combo',
                  rtl: false,
                  width: 170,
                  labelWidth: 45,
                  fieldLabel: 'Theme',
                  displayField: 'name',
                  valueField: 'value',
                  labelStyle: 'cursor:move;',
                  margin: '0 5 0 0',
                  store: Ext.create('Ext.data.Store', {
                      fields: ['value', 'name'],
                      data : [
                          { value: 'access', name: 'Accessibility' },
                          { value: 'classic', name: 'Classic' },
                          { value: 'gray', name: 'Gray' },
                          { value: 'neptune', name: 'Neptune' }
                      ]
                  }),
                  value: theme,
                  listeners: {
                      select: function(combo) {
                          var theme = combo.getValue();
                          if (theme !== defaultTheme) {
                              setParam({ theme: theme });
                          } else {
                              removeParam('theme');
                          }
                      }
                  }
              }, {
                  xtype: 'button',
                  rtl: false,
                  hidden: !(Ext.repoDevMode || location.href.indexOf('qa.sencha.com') !== -1),
                  enableToggle: true,
                  pressed: rtl,
                  text: 'RTL',
                  margin: '0 5 0 0',
                  listeners: {
                      toggle: function(btn, pressed) {
                          if (pressed) {
                              setParam({ rtl: true });
                          } else {
                              removeParam('rtl');
                          }
                      }
                  }
              }, {
                  xtype: 'tool',
                  type: 'close',
                  rtl: false,
                  handler: function() {
                      toolbar.destroy();
                  }
              }],

              constraintInsets: '0 -' + (Ext.getScrollbarSize().width + 4) + ' 0 0'
          });
          toolbar.show();
          toolbar.alignTo(
              document.body,
              Ext.optionsToolbarAlign || 'tr-tr',
              [
                  (Ext.getScrollbarSize().width + 4) * (Ext.rootHierarchyState.rtl ? 1 : -1),
                  -(document.body.scrollTop || document.documentElement.scrollTop)
              ]
          );
          
          var constrainer = function() {
              toolbar.doConstrain();
          };
          
          Ext.EventManager.onWindowResize(constrainer);
          toolbar.on('destroy', function() { 
              Ext.EventManager.removeResizeListener(constrainer);
          });
      }, 100);

  });
})();