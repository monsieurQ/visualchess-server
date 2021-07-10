const express = require('express');
const cors = require('cors');
const fs = require('fs');
const url = require('url');
const fetch = require('node-fetch');
const app = express(); 

app.use(cors());
app.listen(3001, () => {
	console.log("Running!");
}); 


app.get('/game', (req, res) => {
	console.log(req.query);

	console.log('------------ FILES --------------');
	let files = fs.readdirSync('./pgn').filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
	console.log(files);
	console.log('------------  --------------');

	let id = req.query.id ? req.query.id : 0;  
	let data = [];
	try {
		files.forEach(file => {
			data.push(fs.readFileSync('./pgn/'+file, 'utf8').toString());
		});
	} catch(e) {
	    console.log('Error:', e.stack);
	}

	console.log(data);

	res.set('Content-Type', 'application/json');
	res.send(JSON.stringify(data));
});