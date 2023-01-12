/* 
	Copyright © 2022 Kevin Daniel Taylor & Mateo José Roca 
        <<kevinmusic123@gmail.com>> <<mateojoserocaclemntis17@gmail.com>>
	Instancia de Final de Analisis Matemático II del ISFT 151.
	Profesor a cargo Julio E. Riera.

	Este código utiliza la regla del trapecio https://es.wikipedia.org/wiki/Regla_del_trapecio
*/
const limitA 	 = document.getElementById("limitA");
const limitB 	 = document.getElementById("limitB");
const expression = document.getElementById("expression");
const buttonForm = document.getElementById("sendForm");

function trapezoidRule(h1, h2, length) {
	return ((h1 + h2) / 2) * length;
}

function evaluateEquation( x, equation ) {
	return eval( equation );
}

const parseExpression = function( anExpression ) {
	let equation = anExpression.value
		.replaceAll("pi","Math.PI")
		.replace("^", "**")
		.replace("sin", "Math.sin")
		.replace("cos", "Math.cos");
	
	return equation;
}

function integrate( from, to, equation, stepSize ) {
	var area = 0;
	for ( var i = from * 1.0 ; i < to; i += stepSize ) {
		var h1 = evaluateEquation( i, equation );
		var h2 = evaluateEquation( i + stepSize, equation );
		area += trapezoidRule( h1, h2, stepSize );
	}
	return area;
}

let counter = 0;

function displayResult( limA, limB, equation, result ) {
	if(counter != 0)
	{
		const element = document.getElementById("callableDiv");
		element.remove();
	}
	document.getElementById("result")
		.innerHTML = 
			`<div id="resultdiv">
				<i id="result-title">Resultado</i>
					<p>Resultado: &#x222b;
						<span>
							<sup>${limB}</sup>
							<sub>${limA}</sub>
						</span>
					<i>(${equation})dx = </i>${result} </p>
			</div>`;
					/* &#x222b is the html code for the Integral */

	counter = counter + 1;
}

buttonForm.addEventListener("click", () => {
	
    const limA = limitA.value.replaceAll("pi", "Math.PI");
	const limB = limitB.value.replaceAll("pi", "Math.PI");
    
    let equation = parseExpression( expression );

    const result = integrate( limA, limB, equation, 0.001 );

	displayResult( limA, limB, expression.value, result );

});

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};