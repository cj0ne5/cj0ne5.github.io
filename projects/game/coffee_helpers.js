
// Helper functions for terminal output
function print(text) {
    const output = document.getElementById('output');
    const line = document.createElement('div');
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

function printAscii(art) {
    const output = document.getElementById('output');
    const pre = document.createElement('pre');
    pre.className = 'ascii-art';
    pre.textContent = art;
    output.appendChild(pre);
    output.scrollTop = output.scrollHeight;
}

function clear() {
    document.getElementById('output').innerHTML = '';
}

// Input handling
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && gameActive) {
        const input = this.value.trim();
        this.value = '';
        print('> ' + input);
        handleInput(input);
    }
});

function handleInput(input) {
    // This function will be overridden by the current game state
    console.log("No handler for input: " + input);
}