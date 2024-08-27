<template>
    <div class="node-container">
        <header :style="getHeaderStyle()">
            <p>绘制直线</p>
            <svg viewBox="0 0 1024 1024" width="20" height="20" class="delete-icon" @click="deleteNode">
                <path
                    d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z">
                </path>
            </svg>
            <Handle id="in-^before^" type="target" :connectable="1" :position="Position.Left"
                :is-valid-connection="onConnect" class="handle"
                style="background-color: #c3ffb1;border-color: #c3ffb1;border-radius: 0;clip-path: polygon(70% 10%, 100% 50%, 70% 90%, 0% 90%, 0 50%, 0% 10%);left: 15px;">
            </Handle>
        </header>
        <main class="nodrag">
            <div class="left">
                <div class="handle-container">
                    <Handle id="in-context" type="target" :connectable="1" :position="Position.Left"
                        :is-valid-connection="onConnect" class="handle"
                        style="background-color: #c0ffbf;border-color: #c0ffbf;border-radius: 0;">
                        <p>1</p>
                    </Handle>
                    <div class="handle"></div>
                    <Input v-model="context" placeholder="画布上下文" :disabled="attrs.data.contextHandle"></Input>
                </div>
                <div class="handle-container">
                    <Handle id="in-startX" type="target" :connectable="1" :position="Position.Left"
                        :is-valid-connection="onConnect" class="handle"
                        style="background-color: #fff;border-color: #fff;border-radius: 0;">
                        <p>1</p>
                    </Handle>
                    <div class="handle"></div>
                    <Input v-model="startX" placeholder="startX" :disabled="attrs.data.startXHandle"></Input>
                </div>
                <div class="handle-container">
                    <Handle id="in-startY" type="target" :connectable="1" :position="Position.Left"
                        :is-valid-connection="onConnect" class="handle"
                        style="background-color: #fff;border-color: #fff;border-radius: 0;">
                        <p>1</p>
                    </Handle>
                    <div class="handle"></div>
                    <Input v-model="startY" placeholder="startY" :disabled="attrs.data.startYHandle"></Input>
                </div>
                <div class="handle-container">
                    <Handle id="in-endX" type="target" :connectable="1" :position="Position.Left"
                        :is-valid-connection="onConnect" class="handle"
                        style="background-color: #fff;border-color: #fff;border-radius: 0;">
                        <p>1</p>
                    </Handle>
                    <div class="handle"></div>
                    <Input v-model="endX" placeholder="endX" :disabled="attrs.data.endXHandle"></Input>
                </div>
                <div class="handle-container">
                    <Handle id="in-endY" type="target" :connectable="1" :position="Position.Left"
                        :is-valid-connection="onConnect" class="handle"
                        style="background-color: #fff;border-color: #fff;border-radius: 0;">
                        <p>1</p>
                    </Handle>
                    <div class="handle"></div>
                    <Input v-model="endY" placeholder="endY" :disabled="attrs.data.endYHandle"></Input>
                </div>
            </div>
        </main>
    </div>
    <div>
    </div>
</template>

<script setup>
import Input from "../../../Input.vue";
import { useAttrs, toRef } from 'vue';
import { Position, Handle, useVueFlow } from '@vue-flow/core';
const attrs = useAttrs();
const emits = defineEmits(['updateNodeInternals']);

/* 挂载对应输入属性 */
const attribute = {
    "context": "ctx",
    "contextHandle": false,
    "startX": "",
    "startXHandle": false,
    "startY": "",
    "startYHandle": false,
    "endX": "",
    "endXHandle": false,
    "endY": "",
    "endYHandle": false,
}
for (let key in attribute) {
    if (!attrs.data.hasOwnProperty(key)) {
        attrs.data[key] = attribute[key];
    }
}

const context = toRef(attrs.data, "context");
const startX = toRef(attrs.data, "startX");
const startY = toRef(attrs.data, "startY");
const endX = toRef(attrs.data, "endX");
const endY = toRef(attrs.data, "endY");

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