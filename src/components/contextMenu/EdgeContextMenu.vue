<template>
    <ContextMenuView v-if="(x >= 0 && y >= 0)" :x="x" :y="y"
        :data-array="dataArray" :click="onClick" :close="close"></ContextMenuView>
</template>

<script setup>
import ContextMenuView from './ContextMenuView.vue';
import { useVueFlow } from '@vue-flow/core';
const props = defineProps({
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
    edge: {
        required: true,
    },
});
const emits = defineEmits(['update:x', 'update:y']);
const { removeEdges } = useVueFlow();

const dataArray = [
    {
        label: "删除链接"
    }
]
function onClick(item) {
    if (item.label === "删除链接") {
        removeEdge();
    }
    close();
}
function removeEdge() {
    if (props.edge) {
        removeEdges([props.edge.id]);
    }
}
function close(event) {
    emits('update:x', -1);
    emits('update:y', -1);
}
</script>