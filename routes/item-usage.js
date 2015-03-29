var ItemUsage = require('../lib/item-usage.js');

function decorate(app){
    app.get('/api/items/:item_id/usage', getAll);
    app.post('/api/items/:item_id/usage', create);
    app.put('/api/items/:item_id/usage/:id', update);
    app.delete('/api/items/:item_id/usage/:id', deleteUsage);
}

function getAll(req, res) {
    ItemUsage.find({ item_id: req.params.item_id }, function(err, uses) {
        if (err)
        res.send(err)

        res.json(uses);
    });
}

function create(req, res) {
    ItemUsage.create({
        date : req.body.date,
        amount: req.body.amount,
        item_id: req.params.item_id
    }, function(err, usage) {
        if (err)
        return res.send(err);

        res.json(usage);
    });
}

function update(req, res) {
    ItemUsage.findById(req.params.id, function(err, usage){
        if(err){
            return res.send(err);
        }
        res.json(usage);
    });
}

function deleteUsage(req, res) {
    ItemUsage.remove({
        _id : req.params.id
    }, function(err, todo) {
        if (err)
        res.send(err);

        getAll(req, res);
    });
}

module.exports = {
    decorate: decorate
}
