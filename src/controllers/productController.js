const fs = require('fs');
const path = require('path');
const { addAbortSignal } = require('stream');

function findAll () {
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/products.json'));
    const data = JSON.parse(jsonData);
    return data;
}

function writeFile (data) {
    const dataString = JSON.stringify(data, null, 4)
    fs.writeFileSync(path.join(__dirname, '../data/products.json'), dataString )

}

const controller = {
    list: function (req, res) {
        const data = findAll()
        console.log(data)
        res.render('menu-products', {products : data})
    },

    detail: function (req, res) {
        console.log(req.params)
        const data = findAll();
        const platoEncontrado = data.find(function (plato) {
            return plato.id == req.params.id
        })

        res.render('product-detail', {plato : platoEncontrado })
    },

    create: function (req, res) {
        res.render('product-create-form')
    },

    store: function (req, res) {
        const data = findAll();

        const newProduct = {
            id: data.length + 3,
            name: req.body.name,
            price: Number(req.body.price),
            description: req.body.description
        }

        data.push(newProduct);

        writeFile(data);

        res.redirect('/products/create')
    },

    edit: function(req, res) {

        const data = findAll();
        const platoEncontrado = data.find(function (plato) {
            return plato.id == req.params.id
        })
        res.render('product-update-form', {plato : platoEncontrado})
    },

    update: function (req, res) {

        const data = findAll();
        const platoEncontrado = data.find(function (plato) {
            return plato.id == req.params.id
        })

        platoEncontrado.name = req.body.name;
        platoEncontrado.price = req.body.price;
        platoEncontrado.description = req.body.description;

        writeFile(data);

        res.redirect('/products/list');
    }


}

module.exports = controller;