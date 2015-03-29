var Item = require('../lib/item.js');

function decorate(app){
    app.get('/api/items', getAll);
    app.get('/api/items/:id', getById);
    app.post('/api/items', create);
    app.put('/api/items/:id', update);
    app.delete('/api/items/:id', deleteItem);
}

function getAll(req, res) {
	Item.find(function(err, items) {
		if (err)
			res.send(err)

		res.json(items);
	});
}

function getById(req, res) {
	Item.findById(req.params.id, function(err, item) {
		if (err)
			res.send(err)

		res.json(item);
	});
}

function create(req, res) {
	Item.create({
		title : req.body.title,
		completed : false,
		board: [[null,null,null],[null,null,null],[null,null,null]],
		whosTurn: 'X'
	}, function(err, item) {
		if (err)
			return res.send(false);

		res.json(item);
	});
}

function update(req, res) {
	Item.findById(req.params.id, function(err, item){
		item.takeTurn(req.body.board, function(err){
			if(err){
				return res.status(500).send('Invalid Move');
			}
			console.log(item);
			res.json(item);
		});
	});
}

function deleteItem(req, res) {
	Item.remove({
		_id : req.params.id
	}, function(err, todo) {
		if (err)
			res.send(err);

		res.json({success: true});
	});
}

module.exports = {
    decorate: decorate
}
