jQuery(document).ready(function($){
	// Here is the script for the Quiz
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
		  
		  var questionCounter = 0; //Tracks question number
		  var selections = []; //Array containing user choices
		  var quiz = $('#quiz'); //Quiz div object
		  
		  $('#start').hide();
		  
		  // Display initial question
		  displayNext();
		  
		  // Click handler for the 'next' button
		  $('#next').on('click', function (e) {
		    e.preventDefault();
		    
		    // Suspend click listener during fade animation
		    if(quiz.is(':animated')) {        
		      return false;
		    }
		    choose();
		    
		    // If no user selection, progress is stopped
		    if (isNaN(selections[questionCounter])) {
		      alert('Please make a selection!');
		    } else {
		      questionCounter++;
		      displayNext();
		    }
		  });
		  
		  // Click handler for the 'prev' button
		  $('#prev').on('click', function (e) {
		    e.preventDefault();
		    
		    if(quiz.is(':animated')) {
		      return false;
		    }
		    choose();
		    questionCounter--;
		    displayNext();
		  });
		  
		  // Click handler for the 'Start Over' button
		  $('#start').on('click', function (e) {
		    e.preventDefault();
		    
		    if(quiz.is(':animated')) {
		      return false;
		    }
		    questionCounter = 0;
		    selections = [];
		    displayNext();
		    $('#start').hide();
		  });
		  
		  // Animates buttons on hover
		  $('.button').on('mouseenter', function () {
		    $(this).addClass('active');
		  });
		  $('.button').on('mouseleave', function () {
		    $(this).removeClass('active');
		  });
		  
		  // Creates and returns the div that contains the questions and 
		  // the answer selections
		  function createQuestionElement(index) {
		    var qElement = $('<div>', {
		      id: 'question'
		    });
		    
		    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
		    qElement.append(header);
		    
		    var question = $('<h3>').append(questions[index].question);
		    qElement.append(question);
		    
		    var radioButtons = createRadios(index);
		    qElement.append(radioButtons);
		    
		    return qElement;
		  }
		  
		  // Creates a list of the answer choices as radio inputs
		  function createRadios(index) {
		    var radioList = $('<ul>');
		    var item;
		    var input = '';
		    for (var i = 0; i < questions[index].choices.length; i++) {
		      item = $('<li>');
		      input = '<input type="radio" name="answer" value=' + i + ' />';
		      input += questions[index].choices[i];
		      item.append(input);
		      radioList.append(item);
		    }
		    return radioList;
		  }
		  
		  // Reads the user selection and pushes the value to an array
		  function choose() {
		    selections[questionCounter] = +$('input[name="answer"]:checked').val();
		  }
		  
		  // Displays next requested element
		  function displayNext() {
		    quiz.fadeOut(function() {
		      $('#question').remove();
		      
		      if(questionCounter < questions.length){
		        var nextQuestion = createQuestionElement(questionCounter);
		        quiz.append(nextQuestion).fadeIn();
		        if (!(isNaN(selections[questionCounter]))) {
		          $('input[value='+selections[questionCounter]+']').prop('checked', true);
		        }
		        
		        // Controls display of 'prev' button
		        if(questionCounter === 1){
		          $('#prev').show();
		        } else if(questionCounter === 0){
		          
		          $('#prev').hide();
		          $('#next').show();
		        }
		      }else {
		        var scoreElem = displayScore();
		        quiz.append(scoreElem).fadeIn();
		        $('#next').hide();
		        $('#prev').hide();
		        $('#start').show();
		      }
		    });
		  }
		  
		  // Computes score and returns a paragraph element to be displayed
		  function displayScore() {
		  	var scoreCont = $('<div>',{id: 'question'});
		    var score = $('<p>');
		    var scorePercent = $('<p>');
		    scoreCont.append(score);
		    scoreCont.append(scorePercent);
		    
		    var numCorrect = 0;
		    for (var i = 0; i < selections.length; i++) {
		      if (selections[i] === questions[i].correctAnswer) {
		        numCorrect++;
		      }
		    }

		    var percentage = Math.round((numCorrect/questions.length)*100);
		    
		    score.append('You got ' + numCorrect + ' questions out of ' +
		                 questions.length + ' right!!!');
		    scorePercent.append('Your percentage is ' + percentage + "!");
		    return scoreCont;
		  }
		})();
});