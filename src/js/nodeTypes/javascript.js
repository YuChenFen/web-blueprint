const JAVASCRIPT_NODETYPES = [
    {
        label: "赋值语句",
        list: [
            {
                name: 'let',
                label: 'let'
            },
            {
                name: 'var',
                label: 'var'
            },
            {
                name: 'const',
                label: 'const'
            },
            {
                name: 'function',
                label: '函数'
            },
        ]
    },
    {
        label: "流程控制",
        list: [
            {
                name: 'sequential',
                label: '顺序执行'
            },
            {
                name: 'for',
                label: '计数循环'
            },
            {
                name: 'while',
                label: '条件循环'
            },
            {
                name: 'if',
                label: '条件判断（if）'
            },
            {
                name: 'if-else',
                label: '条件判断（if-else）'
            }
        ]
    },
    {
        label: "算数运算",
        list: [
            {
                name: 'add',
                label: '加法'
            },
            {
                name: 'reduce',
                label: '减法'
            },
            {
                name: 'multiply',
                label: '乘法'
            },
            {
                name: 'division',
                label: '除法'
            },
            {
                name: 'mod',
                label: "取余"
            }
        ]
    },
    {
        label: "逻辑运算",
        list: [
            {
                name: 'and',
                label: '与'
            },
            {
                name: 'or',
                label: '或'
            },
            {
                name: 'not',
                label: '非'
            },
            {
                name: "shift-left",
                label: '左移'
            },
            {
                name: "shift-right",
                label: '右移'
            }
        ]
    },
    {
        label: "关系运算",
        list: [
            {
                name: 'equal',
                label: '等于'
            },
            {
                name: 'not-equal',
                label: '不等于'
            },
            {
                name: 'greater',
                label: '大于'
            },
            {
                name: 'less',
                label: '小于'
            },
            {
                name: 'greater-equal',
                label: '大于等于'
            },
            {
                name: 'less-equal',
                label: '小于等于'
            }
        ]
    },
    {
        label: "内置对象",
        list: [
            {
                name: 'print-log',
                label: '打印日志'
            },
            {
                name: 'query-selector',
                label: '查询元素'
            },
            {
                name: 'add-event-listener',
                label: '事件监听'
            },
            {
                name: 'set-timeout',
                label: '定时器'
            },
            {
                name: 'set-interval',
                label: '定时器（循环）'
            }
        ]
    },
    {
        label: "Context2d",
        list: [
            {
                name: 'get-context-2d',
                label: '获取画布上下文'
            },
            {
                name: 'set-color',
                label: '设置颜色'
            },
            {
                name: 'draw-line',
                label: '绘制直线'
            },
            {
                name: 'draw-rect',
                label: '绘制矩形'
            },
            {
                name: 'draw-arc',
                label: '绘制圆弧'
            },
        ]
    },
    {
        label: "其他",
        list: [
            {
                name: 'run-function',
                label: '执行函数'
            },
            {
                name: 'code-block',
                label: '代码块'
            }
        ]
    }
];

export default JAVASCRIPT_NODETYPES;
