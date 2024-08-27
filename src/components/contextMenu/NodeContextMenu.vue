<template>
    <ContextMenuView v-if="(x >= 0 && y >= 0)" :x="x" :y="y" :data-array="dataArray" :click="onClick" :close="close"></ContextMenuView>
</template>

<script setup>
import ContextMenuView from './ContextMenuView.vue';
import { useVueFlow } from '@vue-flow/core';
import { computed, ref, watch } from 'vue';
const props = defineProps({
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
    node: {
        required: true,
    },
});
let data = {
    hasChildren: [
        {
            label: "删除节点"
        },
        {
            label: "删除组合"
        }
    ],
    noChildren: [
        {
            label: "删除节点"
        }
    ]
}
const dataArray = ref([]);
const emits = defineEmits(['update:x', 'update:y']);
const { getNodes, updateNode, removeNodes } = useVueFlow();
const nodeChildren = computed(() => {
    return getNodes.value.filter(node => node.parentNode == props.node?.id);
});
watch(() => nodeChildren.value, (children) => {
    dataArray.value = data[children.length !== 0 ? 'hasChildren' : 'noChildren'];
})

function onClick(item) {
    if (item.label === "删除节点") {
        removeNode();
    }
    if (item.label === "删除组合") {
        removeCombinationNode();
    }
    close();
}

function removeNode() {
    if (props.node) {
        removeNodes([props.node.id, ...nodeChildren.value.map(node => node.id)]);
    }
}
function removeCombinationNode() {
    if (props.node) {
        nodeChildren.value.forEach(node => {
            delete node.parentNode;
            delete node.extent;
            delete node.expandParent;
            updateNode(node.id, {
                position: {
                    x: node.computedPosition.x,
                    y: node.computedPosition.y
                }
            });
        });
        removeNodes([props.node.id]);
    }
}
function close(event) {
    emits('update:x', -1);
    emits('update:y', -1);
}
</script>

<style scoped>
@import url(./style.css);
</style>