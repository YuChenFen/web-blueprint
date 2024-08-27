export default {
    type: "add-event-listener",
    parser: function (data) {
        return data["^after^"];
    },
    callback: function (code, data) {
        console.log(data);
        return `${data.name === "" ? "" : data.definedType + " " + data.name + " = "}${data.element}.addEventListener("${data.type}", (${data.event})=>{${code}});`
    }
};