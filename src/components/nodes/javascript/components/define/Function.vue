<template>
    <div class="node-container">
        <header :style="getHeaderStyle()">
            <p>函数</p>
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
                    <Input v-model="name" placeholder="函数名称"></Input>
                </div>
                <div class="handle-container">
                    <Button @click="addAttribute">添加参数</Button>
                </div>
            </div>
            <div class="right">
                <div class="handle-container">
                    <Handle id="out-name" type="source" :position="Position.Right" :is-valid-connection="onConnect"
                        class="handle" style="background-color: #f0f;border-color: #f0f;border-radius: 0;">
                        <p>N</p>
                    </Handle>
                    <div class="handle"></div>
                    <Text text="引用"></Text>
                </div>
                <div class="handle-container" v-for="_, index in attributes" :key="index">
                    <Handle :id="`out-attributes-${index}`" type="source" :position="Position.Right"
                        :is-valid-connection="onConnect" class="handle"
                        style="background-color: #00ffde;border-color: #00ffde;border-radius: 0;">
                        <p>N</p>
                    </Handle>
                    <div class="handle"></div>
                    <Input v-model="attributesDefault[index]" placeholder="默认值"></Input>
                    <Input v-model="attributes[index]" placeholder="参数名称"></Input>
                    <Button @click="deleteAttribute(index)">删除</Button>
                </div>
                <div class="handle-container">
                    <Handle id="out-^after^-0" type="source" :connectable="1" :position="Position.Right"
                        :is-valid-connection="onConnect" class="handle"
                        style="background-color: #c3ffb1;border-color: #c3ffb1;border-radius: 0;clip-path: polygon(70% 10%, 100% 50%, 70% 90%, 0% 90%, 0 50%, 0% 10%);">
                    </Handle>
                    <div class="handle"></div>
                    <Text text="函数体"></Text>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import Input from '../../../Input.vue';
import Text from '../../../Text.vue';
import Button from '../../../Button.vue';
import { useAttrs, toRef } from 'vue';
import { Position, Handle, useVueFlow } from '@vue-flow/core';
const emits = defineEmits(["updateNodeInternals"]);
const attrs = useAttrs();

/* 挂载对应输入属性 */
const attribute = {
    "name": "",
    "attributes": [],
    "attributesDefault": [],
    "^after^": [0]
}

for (let key in attribute) {
    if (!attrs.data.hasOwnProperty(key)) {
        attrs.data[key] = attribute[key];
    }
}

const name = toRef(attrs.data, "name");
const attributes = toRef(attrs.data, "attributes");
const attributesDefault = toRef(attrs.data, "attributesDefault");

function addAttribute() {
    attrs.data.attributes.push("");
    attrs.data.attributesDefault.push("");
    emits('updateNodeInternals');
}

function deleteAttribute(index) {
    attrs.data.attributes.splice(index, 1);
    attrs.data.attributesDefault.splice(index, 1);
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