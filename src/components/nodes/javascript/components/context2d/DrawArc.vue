<template>
    <div class="node-container">
        <header :style="getHeaderStyle()">
            <p>绘制圆弧</p>
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
                    <Text text="填充"></Text>
                    <Switch v-model="isFill"></Switch>
                </div>
                <div class="handle-container">
                    <Handle id="in-x" type="target" :connectable="1" :position="Position.Left"
                        :is-valid-connection="onConnect" class="handle"
                        style="background-color: #fff;border-color: #fff;border-radius: 0;">
                        <p>1</p>
                    </Handle>
                    <div class="handle"></div>
                    <Input v-model="x" placeholder="x" :disabled="attrs.data.xHandle"></Input>
                </div>
                <div class="handle-container">
                    <Handle id="in-y" type="target" :connectable="1" :position="Position.Left"
                        :is-valid-connection="onConnect" class="handle"
                        style="background-color: #fff;border-color: #fff;border-radius: 0;">
                        <p>1</p>
                    </Handle>
                    <div class="handle"></div>
                    <Input v-model="y" placeholder="y" :disabled="attrs.data.yHandle"></Input>
                </div>
                <div class="handle-container">
                    <Handle id="in-radius" type="target" :connectable="1" :position="Position.Left"
                        :is-valid-connection="onConnect" class="handle"
                        style="background-color: #fff;border-color: #fff;border-radius: 0;">
                        <p>1</p>
                    </Handle>
                    <div class="handle"></div>
                    <Input v-model="radius" placeholder="radius" :disabled="attrs.data.radiusHandle"></Input>
                </div>
                <div class="handle-container">
                    <Handle id="in-startAngle" type="target" :connectable="1" :position="Position.Left"
                        :is-valid-connection="onConnect" class="handle"
                        style="background-color: #fff;border-color: #fff;border-radius: 0;">
                        <p>1</p>
                    </Handle>
                    <div class="handle"></div>
                    <Input v-model="startAngle" placeholder="startAngle" :disabled="attrs.data.startAngleHandle"></Input>
                </div>
                <div class="handle-container">
                    <Handle id="in-endAngle" type="target" :connectable="1" :position="Position.Left"
                        :is-valid-connection="onConnect" class="handle"
                        style="background-color: #fff;border-color: #fff;border-radius: 0;">
                        <p>1</p>
                    </Handle>
                    <div class="handle"></div>
                    <Input v-model="endAngle" placeholder="endAngle" :disabled="attrs.data.endAngleHandle"></Input>
                </div>
            </div>
        </main>
    </div>
    <div>
    </div>
</template>

<script setup>
import Input from "../../../Input.vue";
import Switch from "../../../Switch.vue";
import Text from "../../../Text.vue";
import { useAttrs, toRef } from 'vue';
import { Position, Handle, useVueFlow } from '@vue-flow/core';
const attrs = useAttrs();
const emits = defineEmits(['updateNodeInternals']);

/* 挂载对应输入属性 */
const attribute = {
    "context": "ctx",
    "contextHandle": false,
    "x": "",
    "xHandle": false,
    "y": "",
    "yHandle": false,
    "radius": "",
    "radiusHandle": false,
    "startAngle": "",
    "startAngleHandle": false,
    "endAngle": "",
    "endAngleHandle": false,
    "isFill": false
}
for (let key in attribute) {
    if (!attrs.data.hasOwnProperty(key)) {
        attrs.data[key] = attribute[key];
    }
}

const context = toRef(attrs.data, "context");
const x = toRef(attrs.data, "x");
const y = toRef(attrs.data, "y");
const radius = toRef(attrs.data, "radius");
const startAngle = toRef(attrs.data, "startAngle");
const endAngle = toRef(attrs.data, "endAngle");
const isFill = toRef(attrs.data, "isFill");

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