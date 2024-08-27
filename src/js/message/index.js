// 系统日志
// function message(title, msg) {
//     if (Notification.permission === 'default') {
//         Notification.requestPermission();
//     }
//     new Notification(title, { body: msg });
// }

const messageContent = document.createElement('div');
document.body.appendChild(messageContent);
messageContent.style.cssText = `
    position: fixed;
    bottom: 5px;
    right: 5px;
    width: 500px;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
    font-size: 14px;
    line-height: 1.5;
    border-radius: 5px;
    opacity: 0.8;
`;
let messageStyle = `
    padding: 10px 15px;
    margin: 10px;
    background-color: rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
`

const messageTitleColor = {
    '日志': 'hsl(195deg 95% 78%)',
    '警告': 'hsl(62deg 95% 78%)',
    '错误': 'hsl(0deg 95% 78%)'
}

function message(title, msg) {
    let messageDom = document.createElement('div');
    let messageText = document.createElement('p');
    let messageClose = document.createElement('span');
    let titleDom = document.createElement('span');
    titleDom.style.color = messageTitleColor[title];
    let contentDom = document.createElement('span');
    titleDom.innerText = title + " : ";
    contentDom.innerText = msg;
    messageText.appendChild(titleDom);
    messageText.appendChild(contentDom);
    messageClose.innerHTML = '<svg t="1724221707183" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M504.224 470.288l207.84-207.84a16 16 0 0 1 22.608 0l11.328 11.328a16 16 0 0 1 0 22.624l-207.84 207.824 207.84 207.84a16 16 0 0 1 0 22.608l-11.328 11.328a16 16 0 0 1-22.624 0l-207.824-207.84-207.84 207.84a16 16 0 0 1-22.608 0l-11.328-11.328a16 16 0 0 1 0-22.624l207.84-207.824-207.84-207.84a16 16 0 0 1 0-22.608l11.328-11.328a16 16 0 0 1 22.624 0l207.824 207.84z"></path></svg>';
    messageClose.style.cssText = `
        height: 1rem;
        cursor: pointer;
        text-align: center;
        user-select: none;
        margin-right: -10px;
        margin-top: -5px;
        fill: #ff5959;
    `;

    let flag = true;
    messageClose.onclick = () => {
        if (flag) {
            messageContent.removeChild(messageDom);
            flag = false;
        }
    };
    messageDom.style.cssText = messageStyle;
    messageDom.appendChild(messageText);
    messageDom.appendChild(messageClose);
    messageContent.appendChild(messageDom);
    setTimeout(() => {
        if (flag) {
            messageContent?.removeChild(messageDom);
        }
    }, 10000);
}

const consoleLog = console.log;
const consoleWarn = console.warn;
const consoleError = console.error;
console.log = function () {
    consoleLog.apply(console, arguments);
    message('日志', [...arguments].join(' '));
};
console.warn = function () {
    consoleWarn.apply(console, arguments);
    message('警告', [...arguments].join(' '));
};
console.error = function () {
    consoleError.apply(console, arguments);
    message('错误', [...arguments].join(' '));
};