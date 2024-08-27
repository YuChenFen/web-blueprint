export default {
    type: "let",
    parser: function (data) {
        return `let ${data.name} = ${data.value};`;
    }
};