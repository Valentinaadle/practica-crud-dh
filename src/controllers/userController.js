const fs = require('fs');
const path = require('path');
const { addAbortSignal } = require('stream');

function findAll () {
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/users.json'));
    const data = JSON.parse(jsonData);
    return data;
}

function writeFile (data) {
    const dataString = JSON.stringify(data, null, 4)
    fs.writeFileSync(path.join(__dirname, '../data/users.json'), dataString )

}

const controller = {

    list: function (req, res) {
        const data = findAll()
        console.log(data)
        res.render('user-list', {products : data})
    },
    create: function (req, res) {
        res.render('user-register-form')
    },

    store: function (req, res) {
        const data = findAll();

        const newUser = {
            id: data.length + 3,
            name: req.body.name,
            surname: req.body.surname,
            age: Number(req.body.age)
        }

        data.push(newUser);

        writeFile(data);

        res.redirect('/users/list')
    },

    edit: function(req, res) {

        const data = findAll();
        const usuarioEncontrado = data.find(function (usuario) {
            return usuario.id == req.params.id
        })
        res.render('user-update-form', {usuario : usuarioEncontrado})
    },

    update: function (req, res) {

        const data = findAll();
        const usuarioEncontrado = data.find(function (usuario) {
            return usuario.id == req.params.id
        })


        usuarioEncontrado.name = req.body.name;
        usuarioEncontrado.surname = req.body.surname;
        usuarioEncontrado.age = req.body.age;

        writeFile(data);

        res.redirect('/users/list');
    }


}

module.exports = controller;
