export default {
    type: "draw-line",
    parser: function (data) {
        return `${data.context}.beginPath();${data.context}.moveTo(${data.startX}, ${data.startY});${data.context}.lineTo(${data.endX}, ${data.endY});${data.context}.stroke();`
    }
};