<template>
    <ContextMenuView v-if="(x >= 0 && y >= 0)" :x="x" :y="y" :data-array="nodetypes" :click="onClick" :close="close"
        keyName="label">
    </ContextMenuView>
</template>

<script setup>
import ContextMenuView from './ContextMenuView.vue';
import { useVueFlow } from '@vue-flow/core';
import { getNode } from '../nodes/node';
import { ref, watch } from 'vue';
import { JAVASCRIPT_NODETYPES, HTML_NODETYPES, CSS_NODETYPES } from "../../js/nodeTypes/index"
import { useFileStore } from '../../store/fileStore';
const props = defineProps({
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
    nodeX: {
        type: Number,
        required: true,
    },
    nodeY: {
        type: Number,
        required: true,
    }
});
const emits = defineEmits(['update:x', 'update:y']);
const { addNodes, project } = useVueFlow();
const fileStore = useFileStore();

const contextMenu = {
    "javascript": JAVASCRIPT_NODETYPES,
    "html": HTML_NODETYPES,
    "css": CSS_NODETYPES
}
watch(() => fileStore.currentFileType, (type) => {
    nodetypes.value = contextMenu[type];
})
const nodetypes = ref(contextMenu[fileStore.currentFileType]);

function onClick(node) {
    let { x, y } = project({ x: props.nodeX, y: props.nodeY });
    addNodes(getNode(node.name, x, y, node.params));
    close();
}
function close(event) {
    emits('update:x', -1);
    emits('update:y', -1);
}
</script>