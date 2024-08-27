export default {
    type: "if-else",
    parser: function (data) {
        return [data["^after^"][0], "%^%&#$%^&*&)#@*%#)@#_!#%*#^&_~#_!#*%", data["^after^"][1]];
    },
    callback: function (code, data) {
        let [code1, code2] = code.split("%^%&#$%^&*&)#@*%#)@#_!#%*#^&_~#_!#*%");
        return `if(${data.condition}){${code1}}else{${code2}};`
    }
};