<script setup>
import EmptyFile from './views/EmptyFile.vue';
import Flow from './views/Flow.vue';
import Sidebar from './views/Sidebar.vue';
import Header from './views/header/index.vue';
import shortcutKeys from './js/shortcutKeys';
import { useFileStore } from './store/fileStore';
import { storeToRefs } from 'pinia';

const fileStore = useFileStore()
const { currentFile } = storeToRefs(fileStore);

// 性能考虑，默认不开启快捷键功能
if (false) {
    shortcutKeys.install()
}
</script>

<template>
    <header>
        <Header></Header>
    </header>
    <main>
        <Sidebar></Sidebar>
        <div style="position:relative;flex: 1;">
            <EmptyFile v-if="!currentFile"></EmptyFile>
            <Flow></Flow>
        </div>
    </main>
    <footer></footer>
</template>
<style scoped>
header {
    position: relative;
    height: 35px;
    z-index: 2;
}

main {
    position: relative;
    height: calc(100vh - 35px);
    width: 100vw;
    display: flex;
    z-index: 1;
}
</style>
