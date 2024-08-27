// 赋值语句
import Let from "./components/define/Let.vue";
import Var from "./components/define/Var.vue";
import Const from "./components/define/Const.vue";
import Function from "./components/define/Function.vue";
// 流程控制
import Sequential from "./components/base/Sequential.vue";
import For from "./components/base/For.vue";
import While from "./components/base/While.vue";
import If from "./components/base/If.vue";
import IfElse from "./components/base/IfElse.vue";
// 内置对象（方法）
import PrintLog from "./components/object/PrintLog.vue";
import QuerySelector from "./components/object/QuerySelector.vue";
import AddEventListener from "./components/object/AddEventListener.vue";
import SetTimeout from "./components/object/SetTimeout.vue";
import SetInterval from "./components/object/SetInterval.vue";
// 算数运算
import Add from "./components/arithmeticPeration/Add.vue";
import Reduce from "./components/arithmeticPeration/Reduce.vue";
import Multiply from "./components/arithmeticPeration/Multiply.vue";
import Division from "./components/arithmeticPeration/Division.vue";
import Mod from "./components/arithmeticPeration/Mod.vue";
// 逻辑运算
import And from "./components/logicalOperation/And.vue";
import Or from "./components/logicalOperation/Or.vue";
import Not from "./components/logicalOperation/Not.vue";
import ShiftLeft from "./components/logicalOperation/ShiftLeft.vue";
import ShiftRight from "./components/logicalOperation/ShiftRight.vue";
// 关系运算
import Equal from "./components/relationOperation/Equal.vue";
import NotEqual from "./components/relationOperation/NotEqual.vue";
import Greater from "./components/relationOperation/Greater.vue";
import Less from "./components/relationOperation/less.vue";
import GreaterEqual from "./components/relationOperation/GreaterEqual.vue";
import LessEqual from "./components/relationOperation/LessEqual.vue";
// 其他
import RunFunction from "./components/other/RunFunction.vue";
import CodeBlock from "./components/other/CodeBlock.vue";

// 画布
import GetContext2d from "./components/context2d/GetContext2d.vue";
import SetColor from "./components/context2d/SetColor.vue";
import DrawLine from "./components/context2d/DrawLine.vue";
import DrawRect from "./components/context2d/DrawRect.vue";
import DrawArc from "./components/context2d/DrawArc.vue";

// 组合节点
import CombinationNode from "./components/CombinationNode.vue";


const NODE_JAVASCRIPT = {
    install(Vue) {
        if (!Vue.config.globalProperties.hasOwnProperty("$nodeComponentMap")) {
            Vue.config.globalProperties.$nodeComponentMap = {};
        }
        Vue.config.globalProperties.$nodeComponentMap = {
            ...Vue.config.globalProperties.$nodeComponentMap,
            // 基本js元素
            'node-let': Let,
            'node-var': Var,
            'node-const': Const,
            'node-function': Function,
            'node-sequential': Sequential,
            'node-for': For,
            'node-while': While,
            'node-if': If,
            'node-if-else': IfElse,
            'node-print-log': PrintLog,
            'node-query-selector': QuerySelector,
            'node-set-timeout': SetTimeout,
            'node-set-interval': SetInterval,
            'node-add-event-listener': AddEventListener,
            'node-add': Add,
            'node-reduce': Reduce,
            'node-multiply': Multiply,
            'node-division': Division,
            'node-mod': Mod,
            'node-and': And,
            'node-or': Or,
            'node-not': Not,
            'node-shift-left': ShiftLeft,
            'node-shift-right': ShiftRight,
            'node-equal': Equal,
            'node-not-equal': NotEqual,
            'node-greater': Greater,
            'node-less': Less,
            'node-greater-equal': GreaterEqual,
            'node-less-equal': LessEqual,
            'node-run-function': RunFunction,
            'node-code-block': CodeBlock,
            // 画布
            'node-get-context-2d': GetContext2d,
            'node-set-color': SetColor,
            'node-draw-line': DrawLine,
            'node-draw-rect': DrawRect,
            'node-draw-arc': DrawArc,

            // 组合节点
            'node-combination-node': CombinationNode
        }
    },
};

export default NODE_JAVASCRIPT;