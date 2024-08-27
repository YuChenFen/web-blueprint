export default {
    type: "set-color",
    parser: function (data) {
        return `${data.context}.${data.isFill ? "fill" : "stroke"}Style = "${data.color}";`
    }
};