export default {
    type: "set-timeout",
    parser: function (data) {
        return data["^after^"];
    },
    callback: function (code, data) {
        return `${data.name === "" ? "" : data.definedType + " " + data.name + " = "}setTimeout(() => {${code}}, ${data.delayTime});`;
    }
};