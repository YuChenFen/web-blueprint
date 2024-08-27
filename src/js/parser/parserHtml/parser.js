import dom from "./dom";
import domText from "./domText";
const parser = new Map();

function initParser() {
    parser.set("dom", dom);
    parser.set("dom-text", domText);
}

function getParser() {
    initParser();
    return parser;
}

export default getParser;
