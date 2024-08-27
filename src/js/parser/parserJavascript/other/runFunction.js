export default {
    type: "run-function",
    parser: function (data) {
        console.log(data);
        let output = data.outputType.trim() + " " + data.outputName.trim();
        return `${data.outputName.trim() !== "" ? output + " = " : ""}${data.name}(${data.params.join(", ")});`
    }
};