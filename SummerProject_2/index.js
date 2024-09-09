let currentGuess = 0;
let pressedEnter = false; 
let answer; 
let wordleDictionary;
const alphabetButtons = Array.from({ length: 26 }, (_, i) => document.getElementById(`button${i + 1}`));


document.addEventListener('DOMContentLoaded', function() {
    const fileUrl = 'WordleDictionary.txt'; 

    fetch(fileUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {  
            wordleDictionary = text.split(" ");
            const answerIndex = Math.floor(Math.random() * wordleDictionary.length);
            answer = wordleDictionary[answerIndex];
            console.log(answer);
        })
        .catch(error => {
            console.error('Error fetching the file:', error);
        });
});


function pressedKey(button){
    const output = document.getElementById("output");
    const key = button.textContent; 

    const letterBoxes = Array.from({ length: 30 }, (_, i) => document.getElementById(`letterBox${i + 1}`));
    const guess1 = letterBoxes.slice(0, 5);
    const guess2 = letterBoxes.slice(5, 10);
    const guess3 = letterBoxes.slice(10, 15);
    const guess4 = letterBoxes.slice(15, 20);
    const guess5 = letterBoxes.slice(20, 25);
    const guess6 = letterBoxes.slice(25, 30);


    // const letterBox1 = document.getElementById("letterBox1");
    // const letterBox2 = document.getElementById("letterBox2");
    // const letterBox3 = document.getElementById("letterBox3");
    // const letterBox4 = document.getElementById("letterBox4");
    // const letterBox5 = document.getElementById("letterBox5");
    // const letterBox6 = document.getElementById("letterBox6");
    // const letterBox7 = document.getElementById("letterBox7"); 
    // const letterBox8 = document.getElementById("letterBox8");
    // const letterBox9 = document.getElementById("letterBox9");
    // const letterBox10 = document.getElementById("letterBox10");
    // const letterBox11 = document.getElementById("letterBox11");
    // const letterBox12 = document.getElementById("letterBox12");
    // const letterBox13 = document.getElementById("letterBox13");
    // const letterBox14 = document.getElementById("letterBox14");
    // const letterBox15 = document.getElementById("letterBox15");
    // const letterBox16 = document.getElementById("letterBox16");
    // const letterBox17 = document.getElementById("letterBox17");
    // const letterBox18 = document.getElementById("letterBox18");
    // const letterBox19 = document.getElementById("letterBox19");
    // const letterBox20 = document.getElementById("letterBox20");
    // const letterBox21 = document.getElementById("letterBox21");
    // const letterBox22 = document.getElementById("letterBox22");
    // const letterBox23 = document.getElementById("letterBox23");
    // const letterBox24 = document.getElementById("letterBox24");
    // const letterBox25 = document.getElementById("letterBox25");
    // const letterBox26 = document.getElementById("letterBox26");
    // const letterBox27 = document.getElementById("letterBox27");
    // const letterBox28 = document.getElementById("letterBox28");
    // const letterBox29 = document.getElementById("letterBox29");
    // const letterBox30 = document.getElementById("letterBox30");

    // const guess1 = [letterBox1, letterBox2, letterBox3, letterBox4, letterBox5];
    // const guess2 = [letterBox6, letterBox7, letterBox8, letterBox9, letterBox10];
    // const guess3 = [letterBox11, letterBox12, letterBox13, letterBox14, letterBox15];
    // const guess4 = [letterBox16, letterBox17, letterBox18, letterBox19, letterBox20];
    // const guess5 = [letterBox21, letterBox22, letterBox23, letterBox24, letterBox25];
    // const guess6 = [letterBox26, letterBox27, letterBox28, letterBox29, letterBox30];

    const totalGuesses = [guess1, guess2, guess3, guess4, guess5, guess6]; 
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    for(let i = 0; i < answer.length; i++){
        if(totalGuesses[currentGuess][i].textContent===""){
            if(alphabet.includes(key)){
                totalGuesses[currentGuess][i].textContent = key;
                break;
            }
            if(key===""){
                totalGuesses[currentGuess][i-1].textContent = ""; 
            }
        }
    }    

    if(key===""){
        if(totalGuesses[currentGuess][guess1.length - 1] !== ""){
            totalGuesses[currentGuess][guess1.length - 1].textContent = ""; 
        }
    }

    if(key==="Enter" && !pressedEnter){
        let concatenatedWord = "";
        for(let i  = 0; i < 5; i++){
            concatenatedWord += totalGuesses[currentGuess][i].textContent.trim();
            totalGuesses[currentGuess][i].style.color = 'white';
        }
        if(concatenatedWord === answer){
            output.textContent = "That is a match.";
            for(let i = 0; i < answer.length; i++){
            totalGuesses[currentGuess][i].style.backgroundColor = '#70ac64';
            }
        } 
        else if (!wordleDictionary.includes(concatenatedWord)){
            output.textContent = "That is not a word.";
            for(let i  = 0; i < 5; i++){
                totalGuesses[currentGuess][i].style.color = 'black';
            }
        }
        else{
            output.textContent = "That is not a match.";
            let processedLetters = new Set();
            for(let i = 0; i < answer.length; i++){
                if(concatenatedWord[i] === answer[i]){
                    totalGuesses[currentGuess][i].style.backgroundColor = '#70ac64';
                    const greenLetters = totalGuesses[currentGuess][i].textContent;
                    for(let i = 0; i < alphabetButtons.length; i++){
                        if(greenLetters === alphabetButtons[i].textContent){
                            alphabetButtons[i].style.backgroundColor = '#70ac64';
                        }
                    }
                }
                else if(answer.includes(concatenatedWord[i])){
                    if (!processedLetters.has(concatenatedWord[i])){
                        totalGuesses[currentGuess][i].style.backgroundColor = '#d0b45c';
                        const yellowLetters = totalGuesses[currentGuess][i].textContent;
                        for(let i = 0; i < alphabetButtons.length; i++){
                            if(yellowLetters === alphabetButtons[i].textContent){
                                alphabetButtons[i].style.backgroundColor = '#d0b45c';
                            }
                        }
                        processedLetters.add(concatenatedWord[i]);
                    }
                }
                else{
                    totalGuesses[currentGuess][i].style.backgroundColor = '#807c7c';
                    const notInWord = totalGuesses[currentGuess][i].textContent;                    
                    for(let i = 0; i < alphabetButtons.length; i++){
                        if(notInWord === alphabetButtons[i].textContent){
                            alphabetButtons[i].style.backgroundColor = '#807c7c';
                        }
                    }
                }
            }
            currentGuess++;
            if(currentGuess === totalGuesses.length){
                output.textContent = `You lost. The word was ${answer}.` ; 
                currentGuess = totalGuesses.length - 1; 
            }
        }
        pressedEnter = true;
    }

    if(key!=="Enter") {
        pressedEnter = false;
    }
    
}