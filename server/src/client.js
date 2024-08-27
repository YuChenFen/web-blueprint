const connection = new WebSocket('ws://localhost:8081');
connection.addEventListener('message', (e) => handleSocketMessage(e.data));
window.connection = connection;

function handleSocketMessage(data) {
    const parsedMessage = JSON.parse(data);
    switch (parsedMessage.command) {
        case 'reload': {
            reloadPage();
        }
    }
}

function reloadPage() {
    const block = document.body
        ? document.body.hasAttribute('data-server-no-reload')
        : false;
    if (block) return;
    window.location.reload();
}
