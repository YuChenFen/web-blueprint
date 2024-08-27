import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useFlowStore = defineStore('flow', () => {
    const edgeType = ref(localStorage.getItem('edgeType') || 'special-step');
    const selectionObject = { nodes: [], edges: [] };
    let _toObject = void 0;
    let _addNodes = void 0;
    let _addEdges = void 0;
    let _removeNodes = void 0;
    let _removeEdges = void 0;

    // 该属性只有在创建时才会得到对应的值，需要一个代理来获取该函数
    function initFlow({ toObject, addNodes, addEdges, removeNodes, removeEdges }) {
        _toObject = toObject;
        _addNodes = addNodes;
        _addEdges = addEdges;
        _removeNodes = removeNodes;
        _removeEdges = removeEdges;
    }

    function toObject() {
        if (_toObject) {
            return _toObject();
        } else {
            console.error("[flowStore]:toObject is not defined");
        }
    }

    function setEdgeType(type) {
        edgeType.value = type;
        localStorage.setItem('edgeType', type);
    }

    function setSelectionObject(nodes, edges) {
        selectionObject.nodes = nodes;
        selectionObject.edges = edges;
    }

    function cutSelectionObject() {
        if (_removeEdges && _removeNodes) {
            if (selectionObject.nodes.length > 0) {
                navigator.clipboard.writeText(JSON.stringify({ nodes: selectionObject.nodes, edges: selectionObject.edges }));
                _removeNodes(selectionObject.nodes);
                _removeEdges(selectionObject.edges);
                console.log('剪切成功');
            }
        } else {
            console.error("[flowStore]:removeEdges or removeNodes is not defined");
        }
    }

    function copySelectionObject() {
        if (selectionObject.nodes.length > 0) {
            navigator.clipboard.writeText(JSON.stringify({ nodes: selectionObject.nodes, edges: selectionObject.edges })).then(() => {
                console.log('复制成功');
            }).catch(() => {
                console.error('复制失败');
            });
        }
    }

    function pasteSelectionObject() {
        if (_addNodes && _addEdges) {
            navigator.clipboard.readText().then(text => {
                let { nodes, edges } = JSON.parse(text);
                _addNodes(nodes);
                _addEdges(edges);
            });
        } else {
            console.error("[flowStore]:addNodes or addEdges is not defined");
        }
    }

    return {
        edgeType,
        initFlow,
        toObject,
        setEdgeType,
        setSelectionObject,
        cutSelectionObject,
        copySelectionObject,
        pasteSelectionObject,
    }
})