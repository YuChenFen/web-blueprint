export default {
    type: "dom",
    parser: function (data) {
        if (data.label === "文本") {
            delete data.childrens
            return data.attributes.text;
        }
        return data.childrens;
    },
    callback: function (code, data) {
        let attributes = [""];
        function discriminator(data) {
            return data !== null && data !== undefined && data.trim() !== "" && data !== false;
        }
        for (const attribute in data.attributes) {
            if (discriminator(data.attributes[attribute])) {
                attributes.push(`${attribute}="${data.attributes[attribute]}"`);
            }
        }
        if (data.hasOwnProperty("childrens")) {
            return `<${data.label.toLowerCase()}${attributes.join(" ")}>${code}</${data.label.toLowerCase()}>`
        }
        return code;
    }
};