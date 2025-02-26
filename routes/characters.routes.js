const router = require("express").Router();
const axios = require("axios");

const charactersApi = require('./../services/characters-api.service')
const api = new charactersApi()

/* GET home page */
router.get("/", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
        .then(responseFromAPI => {
            // console.log(responseFromAPI)
            res.render("characters/list", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

router.get('/crear', (req, res, next) => {
    res.render('characters/create')
})

router.post('/crear', (req, res, next) => {

    const { name, occupation, weapon } = req.body

    api
        .createCharacter({ name, occupation, weapon })
        .then(() => res.redirect('/personajes'))
        .catch(err => console.log(err))
})

router.get("/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {
            // console.log("details: ", responseFromAPI.data)
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
})

router.get('/:id/editar', (req, res, next) => {

    const { id: character_id } = req.params

    api
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit', { character: response.data }))
        .catch(err => console.log(err))
})

router.post('/:id/editar', (req, res, next) => {

    const { id: character_id } = req.params
    const { name, occupation, weapon } = req.body

    api
        .editCharacter(character_id, { name, occupation, weapon })
        .then(() => res.redirect('/personajes'))
        .catch(err => console.log(err))
})

router.post('/:id/eliminar', (req, res, next) => {

    const { id: character_id } = req.params

    api
        .deleteCharacter(character_id)
        .then(() => res.redirect('/personajes'))
        .catch(err => console.log(err))
})

module.exports = router;
