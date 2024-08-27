import cssNode from "./cssNode";
const parser = new Map();

function initParser() {
    parser.set("css-node", cssNode);
}

function getParser() {
    initParser();
    return parser;
}

export default getParser;
