<template>
    <div class="node-container">
        <header :style="getHeaderStyle()">
            <div style="display: flex;align-items: center;justify-content: center;height: 100%;">
                <Input class="nodrag" style="width: 160px;height: 20px;font-size: 0.8rem;" v-model="className"
                    placeholder="类名" />
            </div>
            <svg viewBox="0 0 1024 1024" width="20" height="20" class="delete-icon" @click="deleteNode">
                <path
                    d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z">
                </path>
            </svg>
            <Handle id="in-^before^" type="target" :connectable="1" :position="Position.Left"
                :is-valid-connection="onConnect" class="handle"
                style="background-color: #fffa8f;border-color:#fffa8f;border-radius: 0;left: 15px;">
            </Handle>
        </header>
        <main class="nodrag" style="gap: 10px;">
            <div class="left" style="gap: 5px;">
                <div class="handle-container" v-for="attribute in attributes" :key="attribute">
                    <Input style="min-width: 80px;" v-model="attribute.key" placeholder="属性名"
                        :prompt-words="attributePromptWords" />
                </div>
                <div class="handle-container">
                    <Button @click="addContainer">添加属性</Button>
                </div>
            </div>
            <div class="right" style="gap: 5px;">
                <div class="handle-container" v-for="attribute, index in attributes" :key="attribute">
                    <Button @click="deleteAttribute(index)">删除</Button>
                    <Input style="min-width: 80px;" v-model="attribute.value" placeholder="值"
                        :prompt-words="attributeValuePromptWords[attribute.key] ? attributeValuePromptWords[attribute.key] : []" />
                </div>
                <div class="handle-container">
                    <Handle id="out-^after^" type="source" :position="Position.Right" :is-valid-connection="onConnect"
                        class="handle" style="background-color: #fffa8f;border-color: #fffa8f;border-radius: 0;">
                        <p>N</p>
                    </Handle>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import Input from '../../Input.vue';
import Button from '../../Button.vue';
import { toRef, useAttrs } from 'vue';
import { Position, Handle, useVueFlow } from '@vue-flow/core';
import { attributePromptWords, attributeValuePromptWords } from './promptWords';

const attrs = useAttrs();

/* 挂载对应输入属性 */
const attribute = {
    "className": "",
    "attributes": []
}
for (let key in attribute) {
    if (!attrs.data.hasOwnProperty(key)) {
        attrs.data[key] = attribute[key];
    }
}

const className = toRef(attrs.data, "className");
const attributes = toRef(attrs.data, "attributes");


function addContainer() {
    attrs.data.attributes.push({ key: "", value: "" });
}
function deleteAttribute(index) {
    attrs.data.attributes.splice(index, 1);
}

const { removeNodes } = useVueFlow();

const titleBarHeight = 30;
const width = attrs.data.width || 250;

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