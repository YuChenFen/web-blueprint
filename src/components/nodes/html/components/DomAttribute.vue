<template>
    <div class="node-container">
        <header :style="getHeaderStyle()">
            <p>属性</p>
            <svg viewBox="0 0 1024 1024" width="20" height="20" class="delete-icon" @click="deleteNode">
                <path
                    d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z">
                </path>
            </svg>
            <Handle id="in-attributes" type="target" :connectable="1" :position="Position.Top"
                :is-valid-connection="onConnect" class="handle"
                style="background-color: #8fffff;border-color: #8fffff;border-radius: 50%;left: 15px;top: 50%;">
            </Handle>
        </header>
        <main class="nodrag" style="gap: 25px;">
            <div class="left" style="gap: 5px;">
                <div class="handle-container" v-for="_, key in attributes" :key="key">
                    <p>{{ language.hasOwnProperty(key) ? language[key] : key }}</p>
                </div>
            </div>
            <div class="right" style="gap: 5px;">
                <div class="handle-container" v-for="value, key in attributes" :key="key">
                    <Switch v-if="value === true || value === false" v-model="attributes[key]" />
                    <Input v-else style="min-width: 80px;" v-model="attributes[key]" :placeholder="key" />
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import Switch from '../../Switch.vue';
import Input from '../../Input.vue';
import { toRef, useAttrs } from 'vue';
import { Position, Handle, useVueFlow } from '@vue-flow/core';
import language from './language';
const attrs = useAttrs();

/* 挂载对应输入属性 */
const attribute = {
    "attributes": {}
}
for (let key in attribute) {
    if (!attrs.data.hasOwnProperty(key)) {
        attrs.data[key] = attribute[key];
    }
}

const attributes = toRef(attrs.data, "attributes");

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