export default {
    type: "get-context-2d",
    parser: function (data) {
        return `${data.definedType} ${data.name} = ${data.element}.getContext("2d");`;
    }
};