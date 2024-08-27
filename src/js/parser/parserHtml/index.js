import getParser from "./parser";

const parser = getParser();
const nodesMap = new Map();

/* ---------------------- 预处理 ---------------------- */

function getData(json) {
    // 存储数据
    const newJson = {
        nodes: [],
        edges: json.edges
    }
    json.nodes.forEach(element => {
        nodesMap.set(element.id, element);
    });

    // 1.处理所有边的数据，添加子节点数据
    initHandles(json.nodes, json.edges);

    // 2.获取所有开始节点并放入解析队列
    let hasBeforeNodeId = json.edges.filter(({ targetHandle }) => targetHandle.split("-")[1] === "^before^").map(element => element.target);
    // 获取开始节点（未有前置节点则为开始节点）
    let startNode = json.nodes.filter(element => !hasBeforeNodeId.includes(element.id) && element.type !== "dom-attribute" && element.type !== "combination-node");
    newJson.nodes = startNode;

    return newJson;
}

function initHandles(nodes, edges) {
    nodes.forEach(node => {
        if (node.type === "dom-attribute") {
            return;
        }
        node.data.childrens = edges.filter(({ source, sourceHandle }) => {
            return source === node.id && sourceHandle === `out-^after^`;
        }).map(({ target, targetHandle }) => {
            return nodesMap.get(target);
        });
        // node.data.attributes = edges.filter(({ source, sourceHandle }) => {
        //     return source === node.id && sourceHandle === `out-attributes`;
        // }).map(({ target, targetHandle }) => {
        //     return nodesMap.get(target);
        // });
    });
}


/* ---------------------- 解析节点 ---------------------- */

function parserNode(node) {
    // 如果是字符串直接返回（为分隔符等）
    if (typeof node === "string") {
        return node;
    }
    // 节点处理
    let nodeParserObject = parser.get(node.type);
    let output = nodeParserObject.parser(node.data);
    let code = "";
    if (typeof output === "string") {
        code = output;
    } else if (typeof output === "object") {
        for (let i = 0; i < output.length; i++) {
            code += parserNode(output[i]);
        }
    }
    if (nodeParserObject.hasOwnProperty("callback")) {
        code = nodeParserObject.callback(code, node.data);
    }
    return code;
}

function parserHtml(json) {
    console.log("json", json);
    let data = getData(json);
    console.log("newJson", data);
    let code = "";
    for (let i = 0; i < data.nodes.length; i++) {
        code += parserNode(data.nodes[i]);
    }
    return "<!DOCTYPE html>" + code;
}

export { parserHtml }
