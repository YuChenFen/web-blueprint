<script setup>
import { ref, watch } from 'vue';
import { parser as htmlParser } from "posthtml-parser";
import { parse as cssParser } from '../../js/modules/postcss.js'
import { useFileStore } from '../../store/fileStore';
import { useFlowStore } from '../../store/flowStore';
import { storeToRefs } from 'pinia';

const { toObject } = useFlowStore();
const fileStore = useFileStore();
const { addFile, loadFile, saveFile, saveAsFile } = fileStore;
const { currentFile, currentFileType } = storeToRefs(fileStore)
const menuRef = ref(null);
const isAutoSave = ref(localStorage.getItem('isAutoSave') === 'true');

watch(() => isAutoSave.value, () => {
    localStorage.setItem('isAutoSave', isAutoSave.value);
})
watch(() => currentFile.value, (_, oldFile) => {
    let content = JSON.stringify(toObject())
    if (isAutoSave.value && oldFile && oldFile.content !== content) {
        saveFile(content, oldFile);
    }
})

/** 获取随机字符串
 * @returns {String}
 */
function getNodeId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/** 获取随机颜色 */
function getNodeColor() {
    const h = Math.floor(Math.random() * 360);
    return `hsl(${h}, 90%, 85%)`;
}

/** 获取节点
 * @param {String} type 类型
 * @param {Number} x
 * @param {Number} y
 * @returns {Object}
 */
function getNode(type, x, y, params) {
    if (params) {
        params = JSON.parse(JSON.stringify(params));
    }
    return {
        id: getNodeId(),
        type: type,
        initialized: false,
        position: { x, y },
        data: {
            titleBarColor: [getNodeColor(), getNodeColor()],
            ...params
        },
    }
}

/** 获取边
 * @param source 
 * @param sourceHandle 
 * @param target 
 * @param targetHandle 
 */
function getEdge(source, sourceHandle, target, targetHandle) {
    return {
        id: `vueflow__edge-${source}${sourceHandle}-${target}${targetHandle}`,
        type: 'special-straight',
        source,
        target,
        sourceHandle,
        targetHandle,
        animated: true,
        updatable: true,
        label: '',
        data: {},
        style: {
            opacity: 1
        }
    }
}

function htmlToJsonParse(html) {
    let ast = htmlParser(html);

    const nodes = [];
    const edges = [];

    // 有效节点
    function isValidNode(node) {
        if (node === "<!DOCTYPE html>") {
            return false;
        }
        return (typeof node === 'object') || (typeof node === 'string' && node.trim() !== '');
    }

    function parse(node, beforeNode, x, y) {
        if (!isValidNode(node)) {
            return x;
        }
        let newNode;
        if (typeof node === 'string') {
            newNode = getNode('dom-text', x, y, { value: node });
            nodes.push(newNode);
        } else {
            if (node.hasOwnProperty('attrs')) {
                let newNodeAttribute = getNode('dom-attribute', x - 150, y + 120, { attributes: node.attrs });
                newNode = getNode('dom', x, y, { label: node.tag, attributes: node.attrs });
                nodes.push(newNodeAttribute);
                edges.push(getEdge(newNode.id, 'out-attributes', newNodeAttribute.id, 'in-attributes'));
            } else {
                newNode = getNode('dom', x, y, { label: node.tag, attributes: {} });
            }
            nodes.push(newNode);
            if (node.hasOwnProperty('content')) {
                node.content.forEach(item => {
                    x = parse(item, newNode, x, y + 240);
                });
            }
        }

        if (beforeNode) {
            edges.push(getEdge(beforeNode.id, 'out-^after^', newNode.id, 'in-^before^'));
        }

        return node.hasOwnProperty('content') ? x : x + 300;
    }

    let x = 0, y = 0;
    for (let i = 0; i < ast.length; i++) {
        x = parse(ast[i], null, x, y);
    }

    return JSON.stringify({ nodes, edges });
}

function cssToJsonParse(css) {
    let ast = cssParser(css);

    let nodes = [];
    let edges = [];

    /**
     * @param {*} node 现节点
     * @param {*} root 父节点
     */
    function init(node, root) {
        if (node.type === "rule") {
            let selector = node.selector.replace(/&/g, "");
            // 如果包含冒号且不是冒号开头就在冒号或双冒号前面加空格
            if (selector.includes(":") && !selector.startsWith(":")) {
                selector = selector.replace(/([:]{1,2})([^:])/g, " $1$2");
            }
            let selectorList = selector.split(",").map(item => item.trim());
            let attribute = node.nodes.filter(item => item.type === "decl").map(item => {
                return {
                    key: item.prop,
                    value: item.value
                }
            })
            let children = [];
            node.nodes.filter(item => item.type === "rule").forEach(item => {
                return init(item, children)
            })

            for (let i = 0; i < selectorList.length; i++) {
                let layerNode = selectorList[i].split(" ").map(item => item.trim()).filter(item => item !== "");
                let thisNode = null, thisChildren = root;
                for (let j = 0; j < layerNode.length; j++) {
                    let layer = thisChildren.find(item => item.selector === layerNode[j]);
                    if (layer) {
                        thisNode = layer;
                        thisChildren = layer.children;
                    } else {
                        let newNode = {
                            selector: layerNode[j],
                            attribute: [],
                            children: []
                        }
                        thisChildren.push(newNode);
                        thisNode = newNode;
                        thisChildren = newNode.children;
                    }
                }
                thisNode.attribute = [...thisNode.attribute, ...attribute];
                thisNode.children = [...thisNode.children, ...children];
            }
        }
    }

    let newAst = [];
    for (let i = 0; i < ast.nodes.length; i++) {
        init(ast.nodes[i], newAst)
    }

    /**
     * @param {*} node 现节点
     * @param {*} parent 父节点
     * @param {*} x x坐标
     * @param {*} y y坐标
     */
    function parse(node, parent, x, y) {
        let oldY = y;
        let className = node.selector;
        let attributes = node.attribute;
        let newNode = getNode('css-node', x, y, { className: className, attributes });
        node.children.forEach(item => {
            y = parse(item, newNode, x + 300, y);
        })
        nodes.push(newNode);
        if (parent) {
            edges.push(getEdge(parent.id, 'out-^after^', newNode.id, 'in-^before^'));
        }
        return node.children.length === 0 ? y + attributes.length * 25 + 100 : Math.max(y, oldY + attributes.length * 25 + 100);
    }

    let x = 0, y = 0;
    for (let i = 0; i < newAst.length; i++) {
        y = parse(newAst[i], null, x, y);
    }

    return JSON.stringify({ nodes, edges });
}

function javascriptToJsonParse(javascript) {
    let node = getNode('code-block', 0, 0, { code: javascript });
    return JSON.stringify({ nodes: [node], edges: [] });
}

function onClick(type) {
    switch (type) {
        case 'addFile':
            addFile();
            break;
        case 'loadFile-json':
            loadFile();
            break;
        case 'loadFile-html':
            loadFile(htmlToJsonParse);
            break;
        case 'loadFile-css':
            loadFile(cssToJsonParse);
            break;
        case 'loadFile-javascript':
            loadFile(javascriptToJsonParse);
            break;
        case 'saveFile':
            saveFile(JSON.stringify(toObject()));
            break;
        case 'saveAsFile':
            saveAsFile(JSON.stringify(toObject()));
            break;
        case 'autoSave':
            isAutoSave.value = !isAutoSave.value;
        case 'changeFileType-javascript':
            currentFileType.value = 'javascript'
            break;
        case 'changeFileType-html':
            currentFileType.value = 'html'
            break;
        case 'changeFileType-css':
            currentFileType.value = 'css'
            break;
    }
    menuRef.value.parentElement.blur();
}
</script>

<template>
    <div class="menu" ref="menuRef">
        <div class="menu-item" @click="onClick('addFile')">
            <p>新建文件</p>
            <p>Ctrl + N</p>
        </div>
        <div class="menu-item">
            <div class="has-children-item-label">
                <p>导入文件</p>
                <svg t="1723621107797" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4093" width="20" height="20">
                    <path
                        d="M384 354.24v315.616a34.112 34.112 0 0 0 52.96 28.448l226.656-150.752a42.688 42.688 0 0 0 0-71.072l-226.656-150.688A34.08 34.08 0 0 0 384 354.24z"
                        fill="#ccc" p-id="4094"></path>
                </svg>
            </div>
            <div class="menu children-menu">
                <div class="menu-item" @click="onClick('loadFile-json')">
                    <div class="item-select">
                        <p>JSON文件</p>
                    </div>
                </div>
                <div class="menu-item" @click="onClick('loadFile-html')">
                    <div class="item-select">
                        <p>由html解析</p>
                    </div>
                </div>
                <div class="menu-item" @click="onClick('loadFile-css')">
                    <div class="item-select">
                        <p>由css解析</p>
                    </div>
                </div>
                <div class="menu-item" @click="onClick('loadFile-javascript')">
                    <div class="item-select">
                        <p>生成javascript代码块</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="menu-item" @click="onClick('saveFile')">
            <p>保存</p>
            <p>Ctrl + S</p>
        </div>
        <div class="menu-item" @click="onClick('saveAsFile')">
            <p>另存为...</p>
            <p>Ctrl + Shift + S</p>
        </div>
        <div class="line"></div>
        <div class="menu-item" @click="onClick('autoSave')">
            <p>切换文件时自动保存</p>
            <span>{{ isAutoSave ? "√" : " " }}</span>
        </div>
        <div class="menu-item">
            <div class="has-children-item-label">
                <p>语言项</p>
                <svg t="1723621107797" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4093" width="20" height="20">
                    <path
                        d="M384 354.24v315.616a34.112 34.112 0 0 0 52.96 28.448l226.656-150.752a42.688 42.688 0 0 0 0-71.072l-226.656-150.688A34.08 34.08 0 0 0 384 354.24z"
                        fill="#ccc" p-id="4094"></path>
                </svg>
            </div>
            <div class="menu children-menu">
                <div class="menu-item" @click="onClick('changeFileType-javascript')">
                    <div class="item-select">
                        <span>{{ currentFileType === "javascript" ? "√" : " " }}</span>
                        <p>JavaScript</p>
                    </div>
                </div>
                <div class="menu-item" @click="onClick('changeFileType-html')">
                    <div class="item-select">
                        <span>{{ currentFileType === "html" ? "√" : " " }}</span>
                        <p>HTML</p>
                    </div>
                </div>
                <div class="menu-item" @click="onClick('changeFileType-css')">
                    <div class="item-select">
                        <span>{{ currentFileType === "css" ? "√" : " " }}</span>
                        <p>CSS</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url("./headerMenu.css");

.item-select {
    display: flex;

    & span {
        min-width: 1rem;
    }
}
</style>