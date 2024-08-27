export default {
    type: "var",
    parser: function (data) {
        return `var ${data.name} = ${data.value};`;
    }
};