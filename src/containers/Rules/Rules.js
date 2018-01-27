import React from "react";
import './Rules.css';


const Rules = (props) => (
	

			<div>
				<div className="header">
					<h1>Rules!</h1>
		
				</div>
				<br/>
				<div className="content">
		
					<p>	   The goal of the game is to correctly spelling a word without ending the word.</p>
					<p>If you complete a word, then the next player can declare your word completed and you will be docked points 
					equivalent to the number of letters in the word. If they prematurely declared your word compelted, they will 
					be docked the points.</p>
					<p>    If you spell a word incorrectly, the next player can challenge your spelling and you must prove 
					that you were spelling an actual word.</p>
					<p>    If you've successfully entered the word you had been spelling, the challenger will be docked points equivalent to the number of 
					letters in the word. If your word was incorrect, then you will lose the points.</p>
					
					<p>Happy Spelling!</p>
				</div>
			</div>

);

export default Rules;


