export default {
    type: "const",
    parser: function (data) {
        return `const ${data.name} = ${data.value};`;
    }
};