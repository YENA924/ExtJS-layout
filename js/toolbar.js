(function() {

  // url parameter에서 theme 값 가져오기
  function getQueryParam(name, queryString) {
    const match = RegExp(name + '=([^&]*)').exec(queryString || location.search);
    return match && decodeURIComponent(match[1]);
  }

    const defaultTheme = 'neptune';
    let theme;

    // Ext.themeName, theme선언
    Ext.themeName = theme = getQueryParam('theme') || defaultTheme;

    Ext.onReady(function() {
      Ext.getBody().addCls(Ext.baseCSSPrefix + 'theme-' + Ext.themeName);

      // url 파라미터 set
      function setParam(param) {
        const queryString = Ext.Object.toQueryString(
              Ext.apply(Ext.Object.fromQueryString(location.search), param)
        );
        location.search = queryString;
      }

      // url 파라미터 remove
      function removeParam(paramName) {
        const params = Ext.Object.fromQueryString(location.search);

        delete params[paramName];

        location.search = Ext.Object.toQueryString(params);
      }

      let toolbar;

      setTimeout(function() { // 콜백 함수
        toolbar = Ext.widget({
            xtype: 'toolbar',
            border: true,
            id: 'options-toolbar',
            floating: true,
            fixed: true,
            preventFocusOnActivate: true,
            draggable: { // 드래그 앤 드롭 기능 추가
                constrain: true
            },
            items: [{ // 콤보박스
                xtype: 'combo',
                width: 170,
                labelWidth: 45,
                fieldLabel: '테마',
                displayField: 'name',
                valueField: 'value',
                labelStyle: 'cursor:move;',
                margin: '0 5 0 0',
                value: theme,
                // Model 개체 의 클라이언트 측 캐시를 캡슐화 
                store: Ext.create('Ext.data.Store', { // 목록 구성
                    fields: ['value', 'name'],
                    data : [
                        { value: 'access', name: 'Accessibility' },
                        { value: 'classic', name: 'Classic' },
                        { value: 'gray', name: 'Gray' },
                        { value: 'neptune', name: 'Neptune' }
                    ]
                }),
                listeners: { // 이벤트 리스너
                    select: function(combo) { // 목록 선택시
                        var theme = combo.getValue();
                        if (theme !== defaultTheme) {
                            setParam({ theme: theme });
                        } else {
                            removeParam('theme');
                        }
                    }
                }
            }, { // close 버튼
                xtype: 'tool',
                type: 'close',
                handler: function() { // 클릭시 toolbar destroy 함수 실행
                    toolbar.destroy();
                }
            }],

            constraintInsets: '0 -' + (Ext.getScrollbarSize().width + 4) + ' 0 0'
        });
        toolbar.show();
        toolbar.alignTo( // 지정된 기준점을 기준으로 요소를 다른 요소와 정렬
            document.body, // 기준점
            Ext.optionsToolbarAlign || 'tr-tr', // tr: 오른쪽 상단 모서리
            [
                (Ext.getScrollbarSize().width + 4) * -1,
                -(document.body.scrollTop || document.documentElement.scrollTop)
            ]
        );
        
        const constrainer = function() { 
            toolbar.doConstrain(); // 구성 요소를 추가된 컨테이너 또는 렌더링된 요소 내에 있도록 제한
        };
        
        Ext.EventManager.onWindowResize(constrainer); // window 리사이즈 이벤트시
        toolbar.on('destroy', function() { 
            Ext.EventManager.removeResizeListener(constrainer);
        });
      }, 100);
  });
})();