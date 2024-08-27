<template>
    <div class="node-container">
        <header :style="getHeaderStyle()">
            <p>{{ attrs.data.label }}</p>
            <svg viewBox="0 0 1024 1024" width="20" height="20" class="delete-icon" @click="deleteNode">
                <path
                    d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z">
                </path>
            </svg>
            <Handle id="in-^before^" type="target" :connectable="1" :position="Position.Top"
                :is-valid-connection="onConnect" class="handle"
                style="background-color: rgb(0 212 255);border-color: rgb(0 212 255);border-radius: 0;left: 15px;top: 50%;">
            </Handle>
        </header>
        <main class="nodrag">
            <div class="left" style="align-items: center;gap: 0;">
                <div class="handle-container">
                    <Text text="属性"></Text>
                </div>
                <div class="handle-container">
                    <Handle id="out-attributes" type="source" :position="Position.Bottom" :connectable="1"
                        :is-valid-connection="onConnect" class="handle"
                        style="background-color: #8fffff;border-color: #8fffff;bottom: 50%;">
                        <p>1</p>
                    </Handle>
                </div>
            </div>
            <div class="right" style="align-items: center;gap: 0;">
                <div class="handle-container">
                    <Text text="子节点"></Text>
                </div>
                <div class="handle-container">
                    <Handle id="out-^after^" type="source" :position="Position.Bottom" :is-valid-connection="onConnect"
                        class="handle"
                        style="background-color: rgb(0 212 255);border-color: rgb(0 212 255);border-radius: 0;bottom: 50%;">
                        <p>N</p>
                    </Handle>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import Text from '../../Text.vue';
import { useAttrs } from 'vue';
import { Position, Handle, useVueFlow } from '@vue-flow/core';
const attrs = useAttrs();

const { removeNodes } = useVueFlow();

const titleBarHeight = 30;
const width = attrs.data.width || 150;

function deleteNode() {
    removeNodes(attrs.id);
}

function getHeaderStyle() {
    return {
        "min-width": `${width}px`,
        "height": `${titleBarHeight}px`,
        "background-image": `linear-gradient(to right, ${attrs.data.titleBarColor[0]}, ${attrs.data.titleBarColor[1]})`
    }
}

function onConnect(connection) {
    // 连接验证

    return true;
}
</script>