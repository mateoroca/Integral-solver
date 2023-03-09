/* 
	Copyright © 2022 Kevin Daniel Taylor & Mateo José Roca 
        <<kevinmusic123@gmail.com>> <<mateojoserocaclemntis17@gmail.com>>
	Instancia de Final de Analisis Matemático II del ISFT 151.
	Profesor a cargo Julio E. Riera.

	Este código utiliza la regla del trapecio https://es.wikipedia.org/wiki/Regla_del_trapecio
*/
const limitA 	 = document.getElementById("limitA");
const limitB 	 = document.getElementById("limitB");
const step 	     = document.getElementById("stepSize");
const expression = document.getElementById("expression");
const buttonForm = document.getElementById("sendForm");

function trapezoidRule( h1, h2, length ) {
	var result = (( ( h1 + h2 ) / 2 ) * length );
	return (result < 0 ) ? result *= -1 : result;
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

function isNegative( area ) {
	return area < 0;
}

function integrate( from, to, equation, stepSize ) {
	var area = 0.0;
	for ( var i = from * 1.0 ; i < to; i += stepSize ) {
		var h1 = evaluateEquation( i, equation );
		var h2 = evaluateEquation( i + stepSize, equation );
		area += trapezoidRule( h1, h2, stepSize );
	}
	return area;
}

function displayResult( limA, limB, equation, result ) {
	let tmplimA = limA.value.replaceAll('/360*2*Math.PI', 'degrees');
	let tmpLimB = limB.value.replaceAll('/360*2*Math.PI', 'degrees');
	document.getElementById("result")
		.innerHTML = 
			`<div id="resultdiv">
				<i id="result-title">Resultado</i>
					<p>Resultado: desde ${tmplimA} hasta ${tmpLimB}: &#x222b;
						<i>(${equation})dx = </i> <i id = "resultArea">${result} </i></p> 
			</div>`;
			/* &#x222b is the html code for the Integral */
}

buttonForm.addEventListener("click", () => {
	
    const limA = limitA.value.replaceAll("pi", "Math.PI")
		.replace("°", "/360*2*Math.PI");
	const limB = limitB.value.replaceAll("pi", "Math.PI")
		.replace("°", "/360*2*Math.PI");
    
    const stepOfIteration = step.value;
	
	let equation = parseExpression( expression );

    const result = integrate( eval(limA), eval(limB), equation, parseFloat(stepOfIteration) );

	displayResult( limitA, limitB, expression.value, result );

});

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};