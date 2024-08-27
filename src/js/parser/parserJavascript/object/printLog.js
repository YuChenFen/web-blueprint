export default {
    type: "print-log",
    parser: function (data) {
        return `console.log(${data.value});`;
    }
};