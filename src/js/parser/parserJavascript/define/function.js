export default {
    type: "function",
    parser: function (data) {
        return data["^after^"];
    },
    callback: function (code, data) {
        let attr = [];
        for (let i = 0; i < data.attributes.length; i++) {
            let attribute = data.attributes[i].trim();
            let attributeDefault = data.attributesDefault[i].trim();
            if (attribute !== "") {
                if (attributeDefault !== "") {
                    attr.push(attribute + " = " + attributeDefault)
                } else {
                    attr.push(attribute)
                }
            }
        }
        return `function ${data.name}(${attr.join(", ")}){${code}};`;
    }
};