<template>
    <div class="node-container">
        <header :style="getHeaderStyle()">
            <p>定时器（循环）</p>
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
        <main class="nodrag" style="gap: 10px;">
            <div class="left">
                <div class="handle-container">
                    <Handle id="in-delayTime" type="target" :connectable="1" :position="Position.Left"
                        :is-valid-connection="onConnect" class="handle"
                        style="background-color: #fff;border-color: #fff;border-radius: 0;">
                        <p>1</p>
                    </Handle>
                    <div class="handle"></div>
                    <Input v-model="delayTime" placeholder="延迟时间" :disabled="attrs.data.delayTimeHandle"></Input>
                </div>
                <div class="handle-container" style="width: 100%;justify-content: flex-end;">
                    <Input v-model="definedType" placeholder="类型" :prompt-words="['var', 'let', 'const']"></Input>
                </div>
            </div>
            <div class="right">
                <div class="handle-container">
                    <Handle :id="`out-^after^-0`" type="source" :position="Position.Right"
                        :is-valid-connection="onConnect" :connectable="1" class="handle"
                        style="background-color: pink;border-color: pink;border-radius: 0;clip-path: polygon(70% 10%, 100% 50%, 70% 90%, 0% 90%, 0 50%, 0% 10%);">
                    </Handle>
                    <div class="handle"></div>
                    <Text text="执行内容"></Text>
                </div>
                <div class="handle-container">
                    <Handle id="out-name" type="source" :position="Position.Right" :is-valid-connection="onConnect"
                        class="handle" style="background-color: #fff;border-color: #fff;border-radius: 0;">
                        <p>N</p>
                    </Handle>
                    <div class="handle"></div>
                    <Input v-model="name" placeholder="对象名"></Input>
                </div>
            </div>
        </main>
    </div>
    <div>
    </div>
</template>

<script setup>
import Input from "../../../Input.vue";
import Text from '../../../Text.vue';
import { useAttrs, toRef } from 'vue';
import { Position, Handle, useVueFlow } from '@vue-flow/core';
const attrs = useAttrs();
const emits = defineEmits(['updateNodeInternals']);

/* 挂载对应输入属性 */
const attribute = {
    "delayTime": "",
    "delayTimeHandle": false,
    "definedType": "",
    "name": "",
    "^after^": [0]
}
for (let key in attribute) {
    if (!attrs.data.hasOwnProperty(key)) {
        attrs.data[key] = attribute[key];
    }
}

const definedType = toRef(attrs.data, "definedType");
const delayTime = toRef(attrs.data, "delayTime");
const name = toRef(attrs.data, "name");


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