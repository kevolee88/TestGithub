jQuery(document).ready(function($){
	(function() {
		var questions = [{
			question: "What house was Harry in?",
			choices: ["Hufflepuff", "Gryffindor", "Slytherin", "Ravenclaw"],
			correctAnswer: 1
		}, {
			question: "What is the name of the sweet that Dudley eats when the Weasleys visit Private Drive in Harry Potter and the Goblet of Fire?",
			choices: ["Ton-Tongue Toffee", "A Fainting Fancy", "Nosebleed Nougat", "A Puking Pastille"],
			correctAnswer: 0
		}, {
			question: "Who was Dumbledor's immediate predecessor as Headmaster or Headmistress at Hogwarts?",
			choices: ["Phineas Nigellus Black", "Dexter Fortescue", "Armando Dippet", "Dilys Derwent"],
			correctAnswer: 2
		}, {
			question: "Wich of the following posts has Albus Dumbledor never held?",
			choices: ["Cheif Warlock of the Wizengamot", "Supreme Mugwump", "Head of the Department of International Magical Cooporation", "Professor of Transfiguration at Hogwarts School of Witchcraft and Wizardry"],
			correctAnswer: 2
		}, {
			question: "Who tells Harry and Ron that people can be a 'bit stupid' about their pets?",
			choices: ["Hagrid", "Hermione", "Professor Dumbledor", "Professor Lupin"],
			correctAnswer: 0
		}, {
			question: "Who destroyed the last remaining Horcux?",
			choices: ["Ginny Weasley", "Neville Longbottom", "Severus Snape", "Viktor Krum"],
			correctAnswer: 1
		}];

		var questionCounter = 0; // Tracks question number
		var selections = []; // Array containing user choices
		var quiz = $('#quiz'); // Quiz div object

		displayNext(); //Displays initial question
		$('#start').hide();

		// Click handler for the 'next' button
		$('#next').on('click', function(e){
			e.preventDefault();

			//Suspend click listener during fade animation
			if (quiz.is(':animated')) {
				return false;
			}
			choose();

			// If no user selection, pregress is stopped
			if (isNaN(selections[questionCounter])) {
				alert('Please make a selection!');
			} else {
				questionCounter++;
				displayNext();
			}
		});

		// Click handler for the 'prev' button
		$('#prev').on('click', function(e){
			e.preventDefault();

			//Suspend click listener during fade animation
			if (quiz.is(':animated')) {
				return false;
			}
			choose();
			questionCounter--;
			displayNext();
		});

		// Click handler for the 'Start Over' button
		$('#start').on('click', function(e){
			e.preventDefault();

			//Suspend click listener during fade animation
			if (quiz.is(':animated')) {
				return false;
			}
			questionCounter = 0;
			selections = [];
			displayNext();
			$('#start').hide();
		});

		// Creates and returns the div that contains the questions and 
  		// the answer selections
  		function createQuestionElement(index) {
  			var qElement = $('<div>', {
  				id: "question",
  			});

  			var header = $('<h2>Question ' + (index + 1) + "</h2>");
  			qElement.append(header);

  			var question = $('<p>').append(questions[index].question);
  			qElement.append(question);

  			var radioButtons = createRadios(index);
  			qElement.append(radioButtons);

  			return qElement;
  		};

  		// Creates a list of the answer choices as radio inputs
  		function createRadios(index) {
  			var radioList = $('<ul>');
  			var item;
  			var input = '';

  			for(var i = 0, i < questions[index].choices.length, i++) {
  				item = $('<li>');
  				input = '<input type="radio" name="answer" value=' + i + '/>';
  				item.append(input);
  				radioList.append(item);
  			}
  			return radioList;
  		};

  		// Reads the user selection and pushes the value to an array
  		function choose(){
  			selections[questionCounter] = +$('input[name="answer"]:checked').val();
  		};
	})();
});









