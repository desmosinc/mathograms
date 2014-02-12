//this file generates and returns a random inspirational math quote,
//used when you share by e-mail

var quotes = [
	'\"Pure mathematics is, in its way, the poetry of logical ideas.\" - Albert Einstein',
	'\"God used beautiful mathematics in creating the world.\" - Paul Dirac',
	'\"The true spirit of delight, the exaltation, the sense of being more than Man, which is the touchstone of the highest excellence, is to be found in mathematics as surely as poetry.\" - Bertrand Russell',
	'\"One of the most amazing things about mathematics is the people who do math aren\'t usually interested in application, because mathematics itself is truly a beautiful art form. It\'s structures and patterns, and that\'s what we love.\" - Danica McKellar',
	'\"Mathematics is, as it were, a sensuous logic, and relates to philosophy as do the arts, music, and plastic art to poetry.\" - Karl Wilhelm Friedrich Schlegel',
	'\"You want to know how to rhyme, then learn how to add. It\'s mathematics.\" - Mos Def',
	'\"Mathematics is the most beautiful and most powerful creation of the human spirit.\" - Stefan Banach',
	'\"Life is good for only two things, discovering mathematics and teaching mathematics.\" - Simeon Poisson',
	'\"There should be no such thing as boring mathematics.\" - Edsger Dijkstra',
	'\"Mathematics is the study of problems so simple that they have good solutions.\" - Whitfield Diffie',
	'\"The essence of mathematics lies in its freedom.\" - Georg Cantor',
	'\"Mathematics is a place where you can do things which you can\'t do in the real world.\" - Marcus du Sautoy',
	'\"Out of an infinity of designs a mathematician chooses one pattern for beauty\'s sake and pulls it down to earth.\" - Marston Morse',
	'\"Mathematics is the music of reason.\" - James Joseph Sylvester',
	'\"Beauty is the first test: there is no permanent place in the world for ugly mathematics.\" - Godfrey Harold Hardy',
	'\"The mathematician does not study pure mathematics because it is useful; he studies it because he delights in it and he delights in it because it is beautiful.\" - J.H. Poincare',
	'\"My work always tried to unite the true with the beautiful, but when I had to choose one or the other, I usually chose the beautiful.\" - Herman Weyl'
]

var sample = function(){
	var index = Math.floor(Math.random()*this.quotes.length);
	return this.quotes[index];
}

module.exports =  {quotes: quotes, sample: sample};