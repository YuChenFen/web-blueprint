export default {
    type: "set-interval",
    parser: function (data) {
        return data["^after^"];
    },
    callback: function (code, data) {
        return `${data.name === "" ? "" : data.definedType + " " + data.name + " = "}setInterval(() => {${code}}, ${data.delayTime});`;
    }
};