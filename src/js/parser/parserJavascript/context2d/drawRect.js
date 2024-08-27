export default {
    type: "draw-rect",
    parser: function (data) {
        return `${data.context}.beginPath();${data.context}.rect(${data.x}, ${data.y}, ${data.width}, ${data.height});${data.context}.${data.isFill ? "fill" : "stroke"}();`
    }
};