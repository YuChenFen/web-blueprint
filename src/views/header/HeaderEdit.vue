<script setup>
import { ref } from 'vue';
import { useFlowStore } from '../../store/flowStore';

const menuRef = ref(null);
const { cutSelectionObject, copySelectionObject, pasteSelectionObject } = useFlowStore();

function onClick(type) {
    switch (type) {
        case 'cut':
            cutSelectionObject();
            break;
        case 'copy':
            copySelectionObject();
            break;
        case 'paste':
            pasteSelectionObject();
            break;
    }
    menuRef.value.parentElement.blur();
}
</script>

<template>
    <div class="menu" ref="menuRef">
        <div class="menu-item" @click="onClick('cut')">
            <p>剪切</p>
            <p>Ctrl + X</p>
        </div>
        <div class="menu-item" @click="onClick('copy')">
            <p>复制</p>
            <p>Ctrl + C</p>
        </div>
        <div class="menu-item" @click="onClick('paste')">
            <p>粘贴</p>
            <p>Ctrl + V</p>
        </div>
    </div>
</template>

<style scoped>
@import url("./headerMenu.css");
</style>