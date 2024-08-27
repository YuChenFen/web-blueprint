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

    // 1.处理所有边的数据，将引用传递的节点属性替换（已使用computed监听，无需重新替换）
    // initHandles(json.nodes, json.edges);

    // 2.获取所有开始节点并放入解析队列
    let hasBeforeNodeId = json.edges.filter(({ targetHandle }) => targetHandle.split("-")[1] === "^before^").map(element => element.target);
    // 获取开始节点（未有前置节点则为开始节点）
    let startNode = json.nodes.filter(element => !hasBeforeNodeId.includes(element.id));

    for (let i = 0; i < startNode.length; i++) {
        let node = startNode[i];
        if (node.type === "combination-node") {
            continue;
        }
        if (startNode[i].data.hasOwnProperty("^after^")) {
            getAfterNodes(node, json.edges)
        }
        newJson.nodes.push(node);
    }
    return newJson;
}

// function initHandles(nodes, edges) {
//     edges.forEach(({ source, sourceHandle, target, targetHandle }) => {
//         let [sourceHandleType, sourceAttribute, sourceIndex] = sourceHandle.split("-");
//         let [targetHandleType, targetAttribute, targetIndex] = targetHandle.split("-");
//         if (sourceAttribute === "^after^" || targetAttribute === "^before^") {
//             return;
//         }
//         let attribute = nodes.filter(({ id }) => id === source)[0].data[sourceAttribute];
//         nodes.filter(({ id }) => id === target)[0].data[targetAttribute] = attribute;
//     })
// }

function getAfterNodes(node, edges) {
    let newBefor = [];
    for (let j = 0; j < node.data["^after^"]["length"]; j++) {
        let edge = edges.filter(({ source, sourceHandle }) => {
            return source === node.id && sourceHandle === `out-^after^-${node.data["^after^"][j]}`
        })[0];
        if (!edge) {
            continue;
        }
        let { target } = edge;
        if (target) {
            target = nodesMap.get(target);
            if (target.data.hasOwnProperty("^after^")) {
                getAfterNodes(target, edges);
            }
            newBefor.push(target);
        }
    }
    node.data["^after^"] = newBefor;
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

function parserJavascript(json) {
    console.log("json", json);
    let data = getData(json);
    console.log("newJson", data);
    let code = "";
    for (let i = 0; i < data.nodes.length; i++) {
        code += parserNode(data.nodes[i]);
    }
    return code;
}

export { parserJavascript }
