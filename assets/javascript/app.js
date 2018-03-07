var panel = $('#quiz-area');
var countStartNumber = 30;


////////////////////////////// ////////////////////////////// ///////////////////

//CLICK EVENTS

////////////////////////////// ////////////////////////////// ///////////////////

$(document).on('click', '#start-over', function (e) {
    game.reset();
});

$(document).on('click', '.answer-button', function (e) {
    game.clicked(e);
});

$(document).on('click', '#start', function (e) {
    $('#subwrapper').prepend('<h2> Time Remaining: <span id="counter-number">30</span>Seconds</h2>');
game.loadQuestion();
});

////////////////////////////// ////////////////////////////// ///////////////////


//Question set


////////////////////////////// ////////////////////////////// ///////////////////

var questions = [{
    question: "What was the name of the lead singer of the band \"the Gorilla Biscuits\"?",
    answers: ["Civ", "Chuck", "Alan", "Cinderblock"],
    correctAnswer: "Civ",
    image: "///Users/justinhalladay/Desktop/Homework/triviagame/assets/images/gorillabiscuits.jpg"
}, {
    question: "What band gave \"Rod Stewart\" his start?",
    answers: ["Small Faces", "The Faces", "They Guess Who", "The Who"],
    correctAnswer: "The Faces",
    image: "///Users/justinhalladay/Desktop/Homework/triviagame/assets/images/thefaces.jpg"
}, {
    question: "What popular Hip Hop group was once a punk rock band?",
    answers: ["Gang Starr", "Heiroglyphics", "Beastie Boys", "Wu Tang Clan"],
    correctAnswer: "Beastie Boys",
        image: "///Users/justinhalladay/Desktop/Homework/triviagame/assets/images/beastieboys.jpg"
}, {
    question: "What band tipified the \"Two Tone\" era and had a number one hit in the UK with \"Too Much Too Young\"?",
    answers: ["The Specials", "English Beat", "004", "No Doubt"],
    correctAnswer: "The Specials",
    image: "///Users/justinhalladay/Desktop/Homework/triviagame/assets/images/thespecials.jpg"
}, {
    question: "What band has a documentary called \"The Godfathers of Hardcore\" coming out in 2018?",
    answers: ["Black Flag", "Circle Jerks", "Trial", "Agnostic Front"],
    correctAnswer: "Agnostic Front",
    image: "///Users/justinhalladay/Desktop/Homework/triviagame/assets/images/af.jpg"
}, {
    question: "Often considered the \"first\" punk band, this band was formed in a shop called \"Sex\"?",
    answers: ["Sex Pistols", "The Clash", "The Buzzcocks", "Cock Sparer"],
    correctAnswer: "Sex Pistols",
    image: "///Users/justinhalladay/Desktop/Homework/triviagame/assets/images/sexpistols.png"
}, {
    question: "Finish the song lyric, \"...do the dog, not the \"\"",
    answers: ["Banana", "Old Man", "Donkey", "Monkey"],
    correctAnswer: "Monkey",
    image: "///Users/justinhalladay/Desktop/Homework/triviagame/assets/images/monkey.jpg"
}, {
    question: "Who is the greatest \"Southern Rock\" band of all time?",
    answers: ["Michael Bubble", "Michael Jackson", "The Doors", "Lynyrd Skynyrd"],
    correctAnswer: "Lynyrd Skynyrd",
    image: "///Users/justinhalladay/Desktop/Homework/triviagame/assets/images/lynyrdskynyrd.jpg"
}];




var game = {
    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,
    countdown: function () {
        game.counter--;
        $('#counter-number').html(game.counter);

        if (game.counter === 0) {
            console.log('TIME UP');
            game.timeUp();
        }
    },
    loadQuestion: function () {
        timer = setInterval(game.countdown, 1000);
        panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>');
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            panel.append('<button class="answer-button" id="button"' + 'data-name="' +
                questions[this.currentQuestion].answers[i] + '">' + questions[this.
                    currentQuestion].answers[i] + '</button>');
        }
    },
    nextQuestion: function () {
        game.counter = countStartNumber;
        $('#counter-number').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function () {
        clearInterval(timer);
        $('#counter-number').html(game.counter);

        panel.html('<h2>Out of Time!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion
        ].correctAnswer);
        panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    results: function () {
        clearInterval(timer);

        panel.html('<h2>All done, heres how you did!</h2>');
        $('#counter-number').html(game.counter);
        panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
        panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
        panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
        panel.append('<br><button id="start-over">Start Over?</button>');
    },
    clicked: function (e) {
        clearInterval(timer);

        if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },
    answeredIncorrectly: function () {
        game.incorrect++;
        clearInterval(timer);
        panel.html('<h2>Nope!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    answeredCorrectly: function () {
        clearInterval(timer);
        game.correct++;
        panel.html('<h2>Correct!</h2>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    reset: function () {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
}; ß