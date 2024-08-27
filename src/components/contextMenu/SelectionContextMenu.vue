<template>

    <ContextMenuView v-if="(x >= 0 && y >= 0)" :x="x" :y="y" :data-array="dataArray" :click="onClick" :close="close">
    </ContextMenuView>
</template>

<script setup>
import ContextMenuView from './ContextMenuView.vue';
import { useVueFlow } from '@vue-flow/core';
import { useFlowStore } from '../../store/flowStore';
const props = defineProps({
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
    selectionNodes: {
        required: true,
    },
});
const emits = defineEmits(['update:x', 'update:y']);
const { addNodes, updateNode } = useVueFlow();
const { copySelectionObject } = useFlowStore();
const dataArray = [
    {
        label: "组合"
    },
    {
        label: "复制"
    }
]
function onClick(item) {
    if (item.label === "组合") {
        combinationNodes();
    } else if (item.label === "复制") {
        copySelectionObject();
    }
    close();
}

function combinationNodes() {
    let max = { x: -1 * Infinity, y: -1 * Infinity }
    let min = { x: Infinity, y: Infinity }
    props.selectionNodes.forEach(node => {
        if (node.computedPosition.x + node.dimensions.width > max.x) {
            max.x = node.computedPosition.x + node.dimensions.width;
        }
        if (node.computedPosition.y + node.dimensions.height > max.y) {
            max.y = node.computedPosition.y + node.dimensions.height;
        }
        if (node.computedPosition.x < min.x) {
            min.x = node.computedPosition.x;
        }
        if (node.computedPosition.y < min.y) {
            min.y = node.computedPosition.y;
        }
    })
    max.x += 10;
    max.y += 10;
    min.x -= 10;
    min.y -= 10;
    let combinationParentNode = {
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        type: 'combination-node',
        position: { x: min.x, y: min.y },
        dimensions: { width: max.x - min.x, height: max.y - min.y },
        data: {
            style: {}
        }
    }
    addNodes([combinationParentNode]);
    props.selectionNodes.forEach(node => {
        if (node.parentNode) {
            return;
        }
        let position = { x: node.position.x - min.x, y: node.position.y - min.y };
        updateNode(node.id, {
            extent: 'parent',
            parentNode: combinationParentNode.id,
            position: position,
            // expandParent: true
        })
        // console.log(node, position);
    });
}
function close(event) {
    emits('update:x', -1);
    emits('update:y', -1);
}
</script>
