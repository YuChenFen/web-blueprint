<template>
    <div class="node-container">
        <header :style="getHeaderStyle()">
            <p>文本</p>
            <svg viewBox="0 0 1024 1024" width="20" height="20" class="delete-icon" @click="deleteNode">
                <path
                    d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z">
                </path>
            </svg>
            <Handle id="in-^before^" type="target" :connectable="1" :position="Position.Top"
                :is-valid-connection="onConnect" class="handle"
                style="background-color: #8fffff;border-color: #8fffff;border-radius: 0;left: 15px;top: 50%;">
            </Handle>
        </header>
        <main class="nodrag">
            <div class="left">
                <div class="handle-container">
                    <textarea v-model="value" placeholder="内容"></textarea>
                </div>
            </div>
        </main>
    </div>
    <div>
    </div>
</template>

<script setup>
import { useAttrs, toRef } from 'vue';
import { Position, Handle, useVueFlow } from '@vue-flow/core';
const attrs = useAttrs();

/* 挂载对应输入属性 */
const attribute = {
    "value": ""
}
for (let key in attribute) {
    if (!attrs.data.hasOwnProperty(key)) {
        attrs.data[key] = attribute[key];
    }
}

const value = toRef(attrs.data, "value");

const { removeNodes } = useVueFlow();

const width = attrs.data.width || 150;

function deleteNode() {
    removeNodes(attrs.id);
}

function getHeaderStyle() {
    return {
        "min-width": `${width}px`,
        "background-image": `linear-gradient(to right, ${attrs.data.titleBarColor[0]}, ${attrs.data.titleBarColor[1]})`
    }
}

function onConnect(connection) {
    // 连接验证

    return true;
}
</script>

<style scoped>
textarea {
    padding: 2px 5px;
    border-radius: 2px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
    font-size: 1em;
    border: none;
    outline: none;
    width: 100%;
}
</style>