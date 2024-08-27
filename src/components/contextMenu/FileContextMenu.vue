<template>
    <ContextMenuView v-if="(x >= 0 && y >= 0)" :x="x" :y="y" :data-array="dataArray" :click="onClick" :close="close"></ContextMenuView>
</template>

<script setup>
import ContextMenuView from './ContextMenuView.vue';
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
    file: {
        required: true
    }
});
const emits = defineEmits(['update:x', 'update:y']);
const fileStore = useFileStore();
const dataArray = [
    {
        label: "重命名..."
    },
    {
        label: "删除"
    }
]
function onClick(item) {
    if (item.label == "重命名...") {
        renameFile();
    } else if (item.label == "删除") {
        removeFile();
    }
    close();
}

function renameFile() {
    fileStore.renameFile(props.file);
}
function removeFile() {
    fileStore.removeFile(props.file);
}

function close(event) {
    emits('update:x', -1);
    emits('update:y', -1);
}
</script>