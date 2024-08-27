export default {
    type: "for",
    parser: function (data) {
        return data["^after^"];
    },
    callback: function (code, data) {
        return `for(let ${data.index} = ${data.start}; ${data.index} < ${data.end}; ${data.index} += ${data.step}){${code}};`
    }
};