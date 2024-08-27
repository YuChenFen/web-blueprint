export default {
    type: "while",
    parser: function (data) {
        return data["^after^"];
    },
    callback: function (code, data) {
        return `while(${data.condition}){${code}};`
    }
};