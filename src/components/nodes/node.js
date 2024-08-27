/** 获取随机字符串
 * @returns {String}
 */
function getNodeId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/** 获取随机颜色 */
function getNodeColor() {
    // let r = Math.floor(Math.random() * 255);
    // let g = Math.floor(Math.random() * 255);
    // let b = Math.floor(Math.random() * 255);
    // return `rgb(${r},${g},${b})`;
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
        position: { x, y },
        data: {
            titleBarColor: [getNodeColor(), getNodeColor()],
            ...params
        },
    }
}

export { getNode }