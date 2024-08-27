export default {
    type: "css-node",
    parser: function (data) {
        if (data.className.trim() === "") {
            return "";
        }
        function discriminator(data) {
            return data !== null && data !== undefined && data.trim() !== "" && data !== false;
        }
        function reanmeChildren(children) {
            if (children.className.trim() !== "") {
                if (children.className[0] === ":") {
                    children.className = `&${children.className}`
                }
                else {
                    children.className = `& ${children.className}`
                }
            }
        }
        let attributes = [];
        for (let i = 0; i < data.attributes.length; i++) {
            if (discriminator(data.attributes[i].key) && discriminator(data.attributes[i].value)) {
                attributes.push(`${data.attributes[i].key}: ${data.attributes[i].value};`);
            }
        }
        for (let i = 0; i < data.childrens.length; i++) {
            reanmeChildren(data.childrens[i].data);
        }
        return [...attributes, ...data.childrens];
    },
    callback: function (code, data) {
        return `${data.className}{${code}}`;
    }
};