
// This function prints text out to the terminal
function print(text) {
    const output = document.getElementById('output');
    const line = document.createElement('div');
    line.innerHTML = "<p>" + text + "</p>";
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

//this formats text inside a pre tag.
//it just makes sure that HTML doesn't mess with spacing
//tip - ASCII art will need to escape any backslashes!
//      so to print \, you'll need to say \\
function printAscii(art) {
    const output = document.getElementById('output');
    const pre = document.createElement('pre');
    pre.className = 'ascii-art';
    pre.textContent = art;
    output.appendChild(pre);
    output.scrollTop = output.scrollHeight;
}

//clears the output screen.
//this isn't really necessary, but I found that the output
//looked cluttered if I didn't clear it every time the user
//enters a new command
function clear() {
    document.getElementById('output').innerHTML = '';
}

// This lets the user type input. It acts a little weird.
// Don't worry too much yet about how it works. Just know
// that when you press the enter key, it grabs what you typed
// and passes it to a function called `handleInput`
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && gameActive) {
        const input = this.value.trim();
        this.value = '';
        print('> ' + input);
        handleInput(input);
    }
});

//This function will be overridden by the current game state
function handleInput(input) {
    console.log("No handler for input: " + input);
}

//This is the function you should call in your game code. Its
//input is a function that takes a string and decides what to do with it
function waitForInput(handlerFunction){
    handleInput = handlerFunction;
}

function waitThenCall(target){
    setTimeout(target,2000);
}

function stayHere(){
    print("\nsorry, I don't understand your input. I'll assume you " +
        "want to stay here");
}