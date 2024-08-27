<template>
    <div class="node-container">
        <header :style="getHeaderStyle()">
            <p>执行函数</p>
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
                    <Handle id="in-name" type="target" :connectable="1" :position="Position.Left"
                        :is-valid-connection="onConnect" class="handle"
                        style="background-color: #f0f;border-color: #f0f;border-radius: 0;">
                        <p>N</p>
                    </Handle>
                    <div class="handle"></div>
                    <Input v-model="name" placeholder="函数名称" :disabled="attrs.data.nameHandle"></Input>
                </div>
                <div class="handle-container" v-for="_, index in params" :key="index">
                    <Handle :id="`in-params-${index}`" type="target" :position="Position.Left"
                        :is-valid-connection="onConnect" class="handle"
                        style="background-color: #00ffde;border-color: #00ffde;border-radius: 0;">
                        <p>1</p>
                    </Handle>
                    <div class="handle"></div>
                    <Input v-model="params[index]" placeholder="值" :disabled="attrs.data.paramsHandle[index]"></Input>
                    <Button @click="removeAttribute(index)">删除</Button>
                </div>

            </div>
            <div class="right">
                <div class="handle-container">
                    <Button @click="addAttribute">添加参数</Button>
                </div>
                <div class="handle-container">
                    <Handle id="out-outputName" type="source" :position="Position.Right"
                        :is-valid-connection="onConnect" class="handle"
                        style="background-color: #f0f;border-color: #f0f;border-radius: 0;">
                        <p>N</p>
                    </Handle>
                    <div class="handle"></div>
                    <Input v-model="outputName" placeholder="对象名"></Input>
                    <Input v-model="outputType" placeholder="类型" :prompt-words="['var', 'let', 'const']"></Input>
                </div>

            </div>
        </main>
    </div>
</template>

<script setup>
import Input from '../../../Input.vue';
import Button from '../../../Button.vue';
import { useAttrs, toRef, ref } from 'vue';
import { Position, Handle, useVueFlow } from '@vue-flow/core';
const emits = defineEmits(["updateNodeInternals"]);
const attrs = useAttrs();

/* 挂载对应输入属性 */
const attribute = {
    "name": "",
    "nameHandle": false,
    "params": [],
    "paramsHandle": [],
    "outputName": "",
    "outputType": "",
}

for (let key in attribute) {
    if (!attrs.data.hasOwnProperty(key)) {
        attrs.data[key] = attribute[key];
    }
}

const name = toRef(attrs.data, "name");
const params = toRef(attrs.data, "params");
const outputName = toRef(attrs.data, "outputName");
const outputType = toRef(attrs.data, "outputType");

function addAttribute() {
    attrs.data.params.push("");
    attrs.data.paramsHandle.push(false);
    emits('updateNodeInternals');
}
function removeAttribute(index) {
    attrs.data.params.splice(index, 1);
    attrs.data.paramsHandle.splice(index, 1);
    emits('updateNodeInternals');
}

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