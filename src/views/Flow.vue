<script setup>
import { computed, nextTick, ref, watch, h, getCurrentInstance, toRef } from 'vue';
import { useFileStore } from '../store/fileStore';
import { useFlowStore } from '../store/flowStore';
import { VueFlow, useVueFlow, ConnectionMode, getNodesInside } from '@vue-flow/core';
import ContextMenu from '../components/contextMenu/ContextMenu.vue';
import NodeContextMenu from '../components/contextMenu/NodeContextMenu.vue';
import EdgeContextMenu from '../components/contextMenu/EdgeContextMenu.vue';
import CustomConnectionLine from '../components/CustomConnectionLine.vue';
import SelectionContextMenu from '../components/contextMenu/SelectionContextMenu.vue';
import { storeToRefs } from 'pinia';

const { appContext } = getCurrentInstance();

const {
    getNodes, addNodes, updateNode, removeNodes,
    onNodeDrag, onNodeContextMenu,
    getEdges, addEdges, updateEdge, removeEdges,
    onEdgesChange, onEdgeContextMenu,
    onSelectionStart, onSelectionEnd, onSelectionContextMenu,
    getIntersectingNodes, project, toObject
} = useVueFlow();
const setNodes = (nodes) => {
    removeNodes(getNodes.value);
    nextTick(() => { addNodes(nodes) });
}
const setEdges = (edges) => {
    removeEdges(getEdges.value);
    nextTick(() => { addEdges(edges) });
}
const fileStore = useFileStore();
const { currentFile } = storeToRefs(fileStore);
const flowStore = useFlowStore();
const { edgeType } = storeToRefs(flowStore);
const { initFlow, setSelectionObject } = flowStore;
initFlow({ toObject, addNodes, addEdges, removeNodes, removeEdges });
// 添加句柄颜色
function addHandelColor(connection) {
    // 获取句柄元素
    const sourceEl = document.querySelector(`[data-nodeid='${connection.source}'][data-handleid='${connection.sourceHandle}']`);
    const targetEl = document.querySelector(`[data-nodeid='${connection.target}'][data-handleid='${connection.targetHandle}']`);
    sourceEl.style.filter = 'brightness(1)';
    targetEl.style.filter = 'brightness(1)';
}
// 删除句柄颜色
function deleteHandelColor(connection) {
    // 获取句柄元素
    const sourceEl = document.querySelector(`[data-nodeid='${connection.source}'][data-handleid='${connection.sourceHandle}']`);
    const targetEl = document.querySelector(`[data-nodeid='${connection.target}'][data-handleid='${connection.targetHandle}']`);
    let sourceHandleEdges = getEdges.value.filter(edge => edge.source === connection.source && edge.sourceHandle === connection.sourceHandle);
    let targetHandleEdges = getEdges.value.filter(edge => edge.target === connection.target && edge.targetHandle === connection.targetHandle);
    if (sourceHandleEdges.length === 0) {
        sourceEl.style.filter = 'brightness(0.4)';
    }
    if (targetHandleEdges.length === 0) {
        targetEl.style.filter = 'brightness(0.4)';
    }
}

const watchMap = new Map();
// 添加属性计算监听
function addPropertyListener(connection) {
    let sourceNode = getNodes.value.filter(node => node.id === connection.source)[0];
    let targetNode = getNodes.value.filter(node => node.id === connection.target)[0];
    let [sourceHandleType, sourceAttribute, sourceIndex] = connection.sourceHandle.split("-");
    let [targetHandleType, targetAttribute, targetIndex] = connection.targetHandle.split("-");
    if (sourceAttribute != "^after^" && targetAttribute != "^before^") {
        function getSourceAttribute() {
            return computed(() => {
                if (sourceIndex !== undefined) {
                    return sourceNode.data[sourceAttribute][sourceIndex];
                } else {
                    return sourceNode.data[sourceAttribute];
                }
            });
        }
        // 将属性挂载到目标节点
        if (targetIndex !== undefined) {
            let targetNodeAttribute = toRef(targetNode.data[targetAttribute], targetIndex);
            let watchStop = watch(getSourceAttribute(), (newValue) => {
                targetNodeAttribute.value = newValue;
            });
            watchMap.set(`${connection.source}${connection.sourceHandle}-${connection.target}${connection.targetHandle}`, watchStop);
        } else {
            targetNode.data[targetAttribute] = getSourceAttribute();
        }
        if (targetNode.data.hasOwnProperty(targetAttribute + "Handle")) {
            if (targetIndex !== undefined) {
                targetNode.data[targetAttribute + "Handle"][targetIndex] = true;
            } else {
                targetNode.data[targetAttribute + "Handle"] = true;
            }
        }
    }
}
// 删除属性计算监听
function deletePropertyListener(connection) {
    let sourceNode = getNodes.value.filter(node => node.id === connection.source)[0];
    let targetNode = getNodes.value.filter(node => node.id === connection.target)[0];
    let [sourceHandleType, sourceAttribute, sourceIndex] = connection.sourceHandle.split("-");
    let [targetHandleType, targetAttribute, targetIndex] = connection.targetHandle.split("-");
    if (sourceAttribute != "^after^" && targetAttribute != "^before^" && targetNode) {
        if (targetIndex !== undefined) {
            watchMap.get(`${connection.source}${connection.sourceHandle}-${connection.target}${connection.targetHandle}`)();
            watchMap.delete(`${connection.source}${connection.sourceHandle}-${connection.target}${connection.targetHandle}`);
            toRef(targetNode.data[targetAttribute], targetIndex).value = "";
        } else {
            targetNode.data[targetAttribute] = ref("");
        }
        if (targetNode.data.hasOwnProperty(targetAttribute + "Handle")) {
            if (targetIndex !== undefined) {
                targetNode.data[targetAttribute + "Handle"][targetIndex] = false;
            } else {
                targetNode.data[targetAttribute + "Handle"] = false;
            }
        }
    }
}

function onConnect(connection) {
    if (connection.source === connection.target) {
        return;
    }
    let [_, sourceAttribute, ____] = connection.sourceHandle.split("-");
    let [__, targetAttribute, ___] = connection.targetHandle.split("-");
    if ((sourceAttribute == "^after^" && targetAttribute != "^before^") || (sourceAttribute != "^after^" && targetAttribute == "^before^")) {
        return;
    }
    addEdges({ ...connection, type: edgeType, animated: true, updatable: true });
}

function onEdgeUpdate({ edge, connection }) {
    if (connection.source === connection.target) {
        return;
    }
    let [_, sourceAttribute, ____] = connection.sourceHandle.split("-");
    let [__, targetAttribute, ___] = connection.targetHandle.split("-");
    if ((sourceAttribute == "^after^" && targetAttribute != "^before^") || (sourceAttribute != "^after^" && targetAttribute == "^before^")) {
        return;
    }
    deleteHandelColor(edge);
    deletePropertyListener(edge);
    addHandelColor(connection);
    addPropertyListener(connection);
    updateEdge(edge, connection)
}

onEdgesChange((changeEdges) => {
    // console.log("edges change", changeEdges);
    for (let i = 0; i < changeEdges.length; i++) {
        if (changeEdges[i].type === "add") {
            nextTick(() => {
                addHandelColor(changeEdges[i].item);
                addPropertyListener(changeEdges[i].item);
            })
        } else if (changeEdges[i].type === "remove") {
            deleteHandelColor(changeEdges[i]);
            deletePropertyListener(changeEdges[i]);
        }
    }
})

/* 可重叠 */
const intersectingNodesId = {};
onNodeDrag(({ node: draggedNode }) => {
    if (draggedNode.type === "combination-node") {
        return;
    }
    const intersections = getIntersectingNodes(draggedNode);
    const intersectionIds = intersections.filter(intersection => intersection.type !== "combination-node").map(intersection => intersection.id);
    intersectingNodesId[draggedNode.id] = intersectionIds;
    intersectionIds.forEach((id) => {
        if (!intersectingNodesId.hasOwnProperty(id)) {
            intersectingNodesId[id] = []
        }
    })
    for (const nodeId in intersectingNodesId) {
        if (nodeId !== draggedNode.id) {
            // 如果节点Id不存在于intersectionIds中，则删除该节点与draggedNode节点的关系
            if (!intersectionIds.includes(nodeId)) {
                intersectingNodesId[nodeId] = intersectingNodesId[nodeId].filter((id) => id !== draggedNode.id)
            } else {
                // 如果节点Id存在于intersectionIds中，则添加该节点与draggedNode节点的关系
                if (!intersectingNodesId[nodeId].includes(draggedNode.id)) {
                    intersectingNodesId[nodeId].push(draggedNode.id)
                }
            }
        }
    }
    for (const nodeId in intersectingNodesId) {
        if (intersectingNodesId[nodeId].length === 0) {
            updateNode(nodeId, { style: { opacity: 1 } })
        } else {
            intersectingNodesId[nodeId].forEach((id) => {
                updateNode(id, { style: { opacity: 0.5 } })
            })
        }
    }
})


/* 全局上下文菜单 */
const contextmenuX = ref(-1);
const contextmenuY = ref(-1);
const addNodeX = ref(0);
const addNodeY = ref(0);
function onContextmenu(e) {
    e.preventDefault();
    let { clientX: x, clientY: y, offsetX, offsetY } = e;
    contextmenuX.value = x;
    contextmenuY.value = y;
    addNodeX.value = offsetX;
    addNodeY.value = offsetY;
}
/* 节点上下文菜单 */
const nodeContextmenuX = ref(-1);
const nodeContextmenuY = ref(-1);
const currentNode = ref(null);
onNodeContextMenu(({ node, event }) => {
    event.preventDefault();
    let { clientX: x, clientY: y } = event;
    nodeContextmenuX.value = x;
    nodeContextmenuY.value = y;
    currentNode.value = node;
})
/* 边上下文菜单 */
const edgeContextmenuX = ref(-1);
const edgeContextmenuY = ref(-1);
const currentEdge = ref(null);
onEdgeContextMenu(({ edge, event }) => {
    event.preventDefault();
    let { clientX: x, clientY: y } = event;
    edgeContextmenuX.value = x;
    edgeContextmenuY.value = y;
    currentEdge.value = edge;
})
/* 选择上下文菜单 */
const selectionContextmenuX = ref(-1);
const selectionContextmenuY = ref(-1);
const selectionNodes = ref([]);
onSelectionContextMenu(({ event, nodes }) => {
    event.preventDefault();
    let { clientX: x, clientY: y } = event;
    selectionContextmenuX.value = x;
    selectionContextmenuY.value = y;
    selectionNodes.value = nodes;
})

const selectionPoint = { x: 0, y: 0 }
onSelectionStart(({ offsetX: x, offsetY: y }) => {
    selectionPoint.x = x;
    selectionPoint.y = y;
})
onSelectionEnd(({ offsetX: x, offsetY: y }) => {
    let { x: startX, y: startY } = project({ x: selectionPoint.x, y: selectionPoint.y });
    let { x: endX, y: endY } = project({ x, y });
    let rectX = Math.min(startX, endX);
    let rectY = Math.min(startY, endY);
    let rectWidth = Math.abs(startX - endX);
    let rectHeight = Math.abs(startY - endY);
    let nodes = getNodesInside(getNodes.value, { x: rectX, y: rectY, width: rectWidth, height: rectHeight });
    let edges = getEdges.value.filter(({ source, target }) => {
        return nodes.some(node => node.id === source) && nodes.some(node => node.id === target);
    });
    setSelectionObject(nodes, edges);
})

const nodes = ref([]);
const edges = ref([]);
watch(() => currentFile.value, (file) => {
    let { nodes, edges } = JSON.parse(file.content);
    setNodes(nodes);
    setEdges(edges);
})
watch(() => edgeType.value, (edgeType) => {
    getEdges.value.forEach((edge) => {
        edge.type = edgeType;
    })
})

</script>

<template>
    <VueFlow :nodes="nodes" :edges="edges" :connection-mode="ConnectionMode.Strict" elevate-edges-on-select
        @connect="onConnect" @edge-update="onEdgeUpdate" class="vue-flow-background" @paneContextMenu="onContextmenu">
        <template v-for="(Component, slotName) in appContext.app.config.globalProperties.$nodeComponentMap"
            :key="slotName" #[slotName]="nodeProps">
            <component :is="Component" v-bind="nodeProps" />
        </template>
        <!--边-->
        <template #edge-special-step="edgeProps">
            <SpecialStepEdge v-bind="edgeProps" />
        </template>
        <template #edge-special-straight="edgeProps">
            <SpecialStraightEdge v-bind="edgeProps" />
        </template>
        <template #edge-special-bezier="edgeProps">
            <SpecialBezierEdge v-bind="edgeProps" />
        </template>
        <!--连接线-->
        <template #connection-line="{ sourceX, sourceY, targetX, targetY }">
            <CustomConnectionLine :source-x="sourceX" :source-y="sourceY" :target-x="targetX" :target-y="targetY" />
        </template>
    </VueFlow>
    <teleport to="body">
        <ContextMenu v-model:x="contextmenuX" v-model:y="contextmenuY" :node-x="addNodeX" :node-y="addNodeY">
        </ContextMenu>
    </teleport>
    <teleport to="body">
        <NodeContextMenu v-model:x="nodeContextmenuX" v-model:y="nodeContextmenuY" :node="currentNode">
        </NodeContextMenu>
    </teleport>
    <teleport to="body">
        <EdgeContextMenu v-model:x="edgeContextmenuX" v-model:y="edgeContextmenuY" :edge="currentEdge">
        </EdgeContextMenu>
    </teleport>
    <teleport to="body">
        <SelectionContextMenu v-model:x="selectionContextmenuX" v-model:y="selectionContextmenuY"
            :selection-nodes="selectionNodes">
        </SelectionContextMenu>
    </teleport>
</template>