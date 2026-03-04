// Global variables
let haveCup = false;
let cupIsFull = false;
let day = 0;
let minutes = 0;
let gameActive = true;
let commonsDiscovered = true;
let outsideDiscovered = false;
let cafeteriaDiscovered = false;
let boxDiscovered = false;
let libraryDiscovered = false;
let portableDiscovered = false;
let rm511Discovered = false;
let bathroomDiscovered = false; 


// Game functions
function check_time() {
    clear();
    minutes++;
    
    if (minutes >= 15) {
        tardy();
        return false;
    } else {
        drawMap();
        print("---");
        print("It is 7:" + (45+minutes) + ". Class starts in " + (15 - minutes) + " minutes");
        print("---");
        return true;
    }
}

function drawMap(){
    let map = ``;

    if(boxDiscovered){
        map += `
                                         -------
                                         | Box |
                                         -------
                                             |`;
    }
    if(libraryDiscovered && commonsDiscovered && cafeteriaDiscovered){
        map += `
        -----------    -----------    -------------
        | Library |----| Commons |----| Cafeteria |
        -----------    -----------    -------------
                           |`;
    }else if(libraryDiscovered && commonsDiscovered){
        map += `
        -----------    -----------
        | Library |----| Commons |
        -----------    -----------
                           |`;
    }else if(cafeteriaDiscovered && commonsDiscovered){
        map += `
                       -----------    -------------
                       | Commons |----| Cafeteria |
                       -----------    -------------
                           |`;
    }else{
        map += `
                       -----------
                       | Commons |
                       -----------
                           |`;
    }
    map += `
                      -----------
                      | Outside |
                      -----------`;
    
    if(portableDiscovered && rm511Discovered && bathroomDiscovered){
        map += `
                           |
        ---------    ------------    ------------
        | rm511 |----| Portable |----| Bathroom |
        ---------    ------------    ------------`
    }else if(portableDiscovered && rm511Discovered){
        map += `
                           |
        ---------    ------------
        | rm511 |----| Portable |
        ---------    ------------`

    }else if(portableDiscovered && bathroomDiscovered){
        map += `
                           |
                     ------------    ------------
                     | Portable |----| Bathroom |
                     ------------    ------------`
    }else if(portableDiscovered){
        map += `
                           |
                     ------------
                     | Portable |
                     ------------`
    }

    printAscii(map);
}

function tardy() {
    print("You didn't make it to class on time, so you fail");
    
    if (day < 5) {
        print("\nwould you like to try again tomorrow? Say yes or no");
        function processInput(input){
            if (input.toLowerCase() === "yes") {
                day++;
                minutes = 0;
                haveCup = false;
                cupIsFull = false;
                start();
            } else if (input.toLowerCase() === "no") {
                print("\nok, better luck next time!");
                gameActive = false;
            } else {
                print("Please type 'yes' or 'no'");
            }
        }

        waitForInput(processInput);
    } else {
        gameActive = false;
    }
}

function start() {
    clear();
    print("Happy " + getDayName(day) + "!");
    printAscii(`
  __    ___  ___ 
 / _\\  / __)/ __)
/    \\( (__( (__ 
\\_/\\_/ \\___)\\___)`);
    
    print("\nYou've just arrived here at the Arlington Career Center. " +
            "It is currently 7:45am, so " +
            "class starts in 15 minutes");
    print("\nYou're sitting on the bus in front of the school. Your first" +
            "class of the day is web design with Chris Jones.");
    print("\nTo get off the bus, type Start");
    
    function processInput(input){
        if (input.toLowerCase() === "start") {
            commons();
        } else {
            print("\nThat's not an option. Are you trying to skip school? " +
                "You're going to have to get off the bus.");
            print("To get off the bus, type Start");
        }
    }

    waitForInput(processInput);
}

function getDayName(dayNum) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    return days[dayNum] || 'Unknown';
}

function box() {
    boxDiscovered = true;
    if (!check_time()) return;
    
    printAscii(` 
__  _.-"\` \`'-.
/||\\'.__ __{}_(
||||  |'--.__\\
|  L.(   ^_^|
\\ .-' |   _ |
| |   )\\___/
|  \\-'\`:._]
\\__/;      '-.
`);
    
    print("\nsomeone wearing a black shirt that says 'security' is standing in" +
         "the hallway. They say that the box isn't open right now.");
    print("\nPress enter to go back.");
    
    function processInput(input){
        commons();
    }

    waitForInput(processInput);
}

function cafeteria() {
    cafeteriaDiscovered = true;
    if (!check_time()) return;
    
    print("\nYou eat some food. And you're a good student so you put your " +
        "trash in the trash can and don't bring it to Chris's room.");
    print("\nWhat would you like to do next? Say one of these choices:" +
        "\n\tcommons\n\tbox\n\tstay here");
    
    function processInput(input){
        if (input.toLowerCase() === "commons") {
            commons();
        } else if (input.toLowerCase() === "stay here") {
            cafeteria();
        } else if (input.toLowerCase() === "box") {
            box();
        } else {
            stayHere();
            waitThenCall(cafeteria);
        }
    }

    waitForInput(processInput);
}

function portable() {
    portableDiscovered = true;
    if (!check_time()) return;
    
    print('you have entered the <span class="location">portable</span>. ' +
        "A toddler runs past you, and " +
        "you're distracted by all the cool student art on the walls! ");
    print("\nWhere would you like to go next? Say one of these choices:" +
        "\n\toutside\n\tbathroom\n\trm511");
    
    function processInput(input){
        if (input.toLowerCase() === "bathroom") {
            bathroom();
        } else if (input.toLowerCase() === "rm511") {
            rm511();
        } else if (input.toLowerCase() === "outside") {
            outside();
        } else {
            stayHere();
            waitThenCall(portable);
        }
    }

    waitForInput(processInput);
}

function outside() {
    outsideDiscovered = true;
    if (!check_time()) return;
    
    print('You are <span class="location">outside!</span>. ' + 
        "The busses have left, so there's not much to do " +
        "out here." );
    print("\nWhere would you like to go next? Say one of these choices:" +
        "\n\tcommons\n\tportable\n\tMcDonalds");
    
    function processInput(input){
        if (input.toLowerCase() === "commons") {
            commons();
        } else if (input.toLowerCase() === "portable") {
            portable();
        } else if (input.toLowerCase() === "mcdonalds") {
            mcdonalds();
        } else {
            stayHere();
            waitThenCall(outside);
        }
    }

    waitForInput(processInput);
}

function mcdonalds() {
    if (!check_time()) return;
    
    printAscii(` 
__  _.-"\` \`'-.
/||\\'.__ __{}_(
||||  |'--.__\\
|  L.(   ^_^|
\\ .-' |   _ |
| |   )\\___/
|  \\-'\`:._]
\\__/;      '-.
`);
    
    print("\nYou got caught by Mr. Mainor.");
    print("\nHe calls your parents and sends you home.");
    print("\nTry to make it to class tomorrow.");

    tardy();
}

function rm511() {
    rm511Discovered = true;
    if (!check_time()) return;

    if (!haveCup) {
        printAscii(`

            _____|~~\\_____      _____________
        _-~               \\    |    \\
        _-    | )     \\    |__/   \\   \\
        _-         )   |   |  |     \\  \\
        _-    | )     /    |--|      |  |
    __-_______________ /__/_______|  |_________
    (                |----         |  |
    \`---------------'--\\\\\\\\      .\`--'
                                 \`||||
`);
        
        print("\nChris is asleep - class can't start if "+
            "the teacher is asleep!");
        print("\nYou notice an empty coffee cup on Chris's desk, "+
            "so you pick it up");
        print("\nYou know that the library has coffee for teachers, so you'll "+
            "have to go there, get the cup filled, and bring it back... "+
            "all before the bell rings!");
        print("\nPress enter to go back out to the hallway");
        
        function processInput(input){
            haveCup = true;
            portable();
        }

        waitForInput(processInput);
    } else if (haveCup && !cupIsFull) {
        printAscii(`

            _____|~~\\_____      _____________
        _-~               \\    |    \\
        _-    | )     \\    |__/   \\   \\
        _-         )   |   |  |     \\  \\
        _-    | )     /    |--|      |  |
    __-_______________ /__/_______|  |_________
    (                |----         |  |
    \`---------------'--\\\\\\\\      .\`--'
                                 \`||||
`);
        
        print("\nChris is still asleep! Chris needs coffee! What are you "+
             "waiting for??");
        print("\nPress enter to go back out to the hallway");
        
        function processInput(input){
            portable();
        }

        waitForInput(processInput);
    } else {
        print("You hand Chris the coffee.");
        setTimeout(function() {
            print("Chris slowly looks at you and takes a few sips");
            setTimeout(function() {
                print("And wakes up! Your class can begin on time!");
                print("Congrats, you saved the day!");
                gameActive = false;
            },2000);
        },2000);
    }
}

function bathroom() {
    bathroomDiscovered = true;
    if (!check_time()) return;
    
    print("");
    print("༼ ºل͟º༼ ºل͟º ༽ºل͟º ༽");
    print('\nYou are now in the <span class="location">bathroom</span>. ' + 
        "There are like 20 people just " +
        "standing around in there.");
    print("\nWhy? Is this really the best place for them to hang out?");
    print("\nDo you want to join them? Say yes or no");
    
    function processInput(input){
        if (input.toLowerCase() === "yes") {
            print("\nyou step into the group and a trance comes over you");
            print("\nyou stare at yourself in the mirror and " +
                "lose track of time");
            setTimeout(function() {
                print("...");
                setTimeout(function() {
                    print("...");
                    setTimeout(function() {
                        print("\nhow long have you been here?");
                        setTimeout(function() {
                            minutes = minutes + 5;
                            bathroom();
                        },2000);
                    },2000);
                },2000);
            },2000);
        } else if (input.toLowerCase() === "no") {
            print("\nYou try to back away, but the tallest person in the " +
                "room locks eyes with you");
            print("\nYou feel yourself being drawn toward the group, and " +
                "a trance comes over you");
            print("\nyou stare at yourself in the mirror and lose track " +
                "of time");
            setTimeout(function() {
                print("...");
                setTimeout(function() {
                    print("...");
                    setTimeout(function() {
                        print("whoa, how long have you been here?");
                        setTimeout(function() {
                            print("you turn around and run out");
                            setTimeout(function() {
                                minutes = minutes + 5;
                                portable();
                            },1000);
                        },2000);
                    },2000);
                },2000);
            },2000);
        } else {
            stayHere();
            waitThenCall(bathroom);
        }
    }

    waitForInput(processInput);
}

function library() {
    libraryDiscovered = true;
    if (!check_time()) return;
    
    if (!haveCup) {
        print('Welcome to the <span class="location">library</span>. ' + 
        "What would you like to do here?");
    } else if (haveCup && !cupIsFull) {
        printAscii(`
        )  (
    (   ) )
    ) ( (
    _______)_
.-'---------|  
( C| CHRIS   |
'-.         |
    '_________'
    '-------'
`);
        
        print("\nMs. Martin, the librarian, sees you walk in and instantly " +
            "recognizes Chris's favorite mug.");
        print("\nShe takes it, fills it with some hot coffee, and hands " +
            "it back to you.");
        cupIsFull = true;
        print("What would you like to do next?");
    } else {
        print("The coffee is getting colder, and you're still in the library. " +
            "What would you like to do next?");
    }

    print("\nSay one of these choices:\n\tread a book\n\tleave");
    
    function processInput(input){
        if (input.toLowerCase() === "read a book") {
            print("you cozy into a chair, open a good book, " +
                "and lose track of time");
            setTimeout(function() {
                print("...");
                setTimeout(function() {
                    print("...");
                    setTimeout(function() {
                        minutes = minutes + 5;
                        library();
                    },1000);
                },1000);
            },1000);
        } else if (input.toLowerCase() === "leave") {
            commons();
        } else {
            stayHere();
            waitThenCall(library);
        }
    }

    waitForInput(processInput);
}


function commons() {
    commonsDiscovered = true;


    if (!check_time()) return;


    if(minutes == 1){
        print("On the way into the building, you show your phone " +
            "pouch to the people standing outside the door. It's clearly " +
            "empty, but nobody stops you."
        )
    }
    
    print('\nYou are in the <span class="location">commons</span>. ' + 
        "Someone is on a megaphone saying that " +
        "everyone needs to get to class, but you think you still " +
        "have plenty of time.");
    print("\nWhere would you like to go? Say one of these choices: " +
        "\n\tlibrary\n\tcafeteria\n\toutside " +
        "\n\tstay in commons");
    
    function processInput(input){
        if (input.toLowerCase() === "library") {
            library();
        } else if (input.toLowerCase() === "cafeteria") {
            cafeteria();
        } else if (input.toLowerCase() === "outside") {
            outside();
        } else if (input.toLowerCase() === "stay in commons") {
            commons();
        } else {
            stayHere();
            waitThenCall(commons);
        }
    }

    waitForInput(processInput);
}