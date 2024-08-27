export default {
    type: "if",
    parser: function (data) {
        return data["^after^"];
    },
    callback: function (code, data) {
        return `if(${data.condition}){${code}};`
    }
};