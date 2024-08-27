export default {
    type: "draw-arc",
    parser: function (data) {
        return `${data.context}.beginPath();${data.context}.arc(${data.x}, ${data.y}, ${data.radius}, ${data.startAngle}, ${data.endAngle});${data.context}.${data.isFill ? "fill" : "stroke"}();`
    }
};