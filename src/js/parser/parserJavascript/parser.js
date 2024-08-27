import letParser from "./define/let";
import varParser from "./define/var";
import constParser from "./define/const";
import functionParser from "./define/function";
import sequentialParser from "./base/sequential";
import forParser from "./base/for";
import whileParser from "./base/while";
import ifParser from "./base/if";
import ifElseParser from "./base/ifElse";
import printLogParser from "./object/printLog";
import querySelectorParser from "./object/querySelector";
import addEventListenerParser from "./object/addEventListener";
import setTimeoutParser from "./object/setTimeout";
import setIntervalParser from "./object/setInterval";
import addParser from "./arithmeticPeration/add";
import reduceParser from "./arithmeticPeration/reduce";
import multiplyParser from "./arithmeticPeration/multiply";
import divisionParser from "./arithmeticPeration/division";
import modParser from "./arithmeticPeration/mod";
import andParser from "./logicalOperation/and";
import orParser from "./logicalOperation/or";
import notParser from "./logicalOperation/not";
import shiftLeftParser from "./logicalOperation/shiftLeft";
import shiftRightParser from "./logicalOperation/shiftRight";
import equalParser from "./relationOperation/equal";
import notEqualParser from "./relationOperation/notEqual";
import greaterParser from "./relationOperation/greater";
import lessParser from "./relationOperation/less";
import greaterEqualParser from "./relationOperation/greaterEqual";
import lessEqualParser from "./relationOperation/lessEqual";
import runFunctionParser from "./other/runFunction";
import codeBlockParser from "./other/codeBlock";
import getContext2dParser from "./context2d/getContext2d";
import setColorParser from "./context2d/setColor";
import drawLineParser from "./context2d/drawLine";
import drawRectParser from "./context2d/drawRect";
import drawArcParser from "./context2d/drawArc";

const parser = new Map();

function initParser() {
    // 赋值语句
    parser.set(letParser.type, letParser);
    parser.set(varParser.type, varParser);
    parser.set(constParser.type, constParser);
    parser.set(functionParser.type, functionParser);
    // 流程控制
    parser.set(sequentialParser.type, sequentialParser);
    parser.set(forParser.type, forParser);
    parser.set(whileParser.type, whileParser);
    parser.set(ifParser.type, ifParser);
    parser.set(ifElseParser.type, ifElseParser);
    // 内置对象（方法）
    parser.set(printLogParser.type, printLogParser);
    parser.set(querySelectorParser.type, querySelectorParser);
    parser.set(addEventListenerParser.type, addEventListenerParser);
    parser.set(setTimeoutParser.type, setTimeoutParser);
    parser.set(setIntervalParser.type, setIntervalParser);
    // 算术运算
    parser.set(addParser.type, addParser);
    parser.set(reduceParser.type, reduceParser);
    parser.set(multiplyParser.type, multiplyParser);
    parser.set(divisionParser.type, divisionParser);
    parser.set(modParser.type, modParser);
    // 逻辑运算
    parser.set(andParser.type, andParser);
    parser.set(orParser.type, orParser);
    parser.set(notParser.type, notParser);
    parser.set(shiftLeftParser.type, shiftLeftParser);
    parser.set(shiftRightParser.type, shiftRightParser);
    // 关系运算
    parser.set(equalParser.type, equalParser);
    parser.set(notEqualParser.type, notEqualParser);
    parser.set(greaterParser.type, greaterParser);
    parser.set(lessParser.type, lessParser);
    parser.set(greaterEqualParser.type, greaterEqualParser);
    parser.set(lessEqualParser.type, lessEqualParser);
    // 其他
    parser.set(runFunctionParser.type, runFunctionParser);
    parser.set(codeBlockParser.type, codeBlockParser);
    // 画布
    parser.set(getContext2dParser.type, getContext2dParser);
    parser.set(setColorParser.type, setColorParser);
    parser.set(drawLineParser.type, drawLineParser);
    parser.set(drawRectParser.type, drawRectParser);
    parser.set(drawArcParser.type, drawArcParser);
}

function getParser() {
    initParser();
    return parser;
}

export default getParser;
