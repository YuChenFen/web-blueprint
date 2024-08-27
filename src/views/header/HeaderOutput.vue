<script setup>
import { ref } from 'vue';
import { parserJavascript, parserHtml, parserCss } from '../../js/parser';
import { useFlowStore } from '../../store/flowStore';
import { useFileStore } from '../../store/fileStore';

const menuRef = ref(null);
const parser = {
    html: parserHtml,
    javascript: parserJavascript,
    css: parserCss
}
const BASE_URL = "http://localhost:3000/";
const urlPath = {
    html: BASE_URL + "index.html",
    javascript: BASE_URL + "index.js",
    css: BASE_URL + "style.css"
}
const { toObject } = useFlowStore();
const fileStore = useFileStore();
function onClick(type) {
    switch (type) {
        case 'open-preview':
            window.open(BASE_URL);
            break;
        case 'parse':
            let code = parser[fileStore.currentFileType](toObject());
            console.log("code", code);
            fetch(urlPath[fileStore.currentFileType], {
                method: "POST",
                body: JSON.stringify({ data: `${code}` })
            })
            break;
    }
    menuRef.value.parentElement.blur();
}
</script>

<template>
    <div class="menu" ref="menuRef">
        <div class="menu-item" @click="onClick('parse')">
            <p>解析</p>
        </div>
        <div class="menu-item" @click="onClick('open-preview')">
            <p>显示预览</p>
        </div>
    </div>
</template>

<style scoped>
@import url("./headerMenu.css");
</style>