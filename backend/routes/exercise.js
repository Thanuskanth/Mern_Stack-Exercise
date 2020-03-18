const router = require('express').Router();
let Exercise = require('../models/exersice.model');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exersice => res.json(exersice))
        .catch(err => res.status(400).json('error' + err));
});
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const exersice = new Exercise({ username, description, duration, date });
    exersice.save()
        .then(() => res.json('Exersice added successfully'))
        .catch(err => res.status(400).json("Error " + err));
});
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exersice => res.json(exersice))
        .catch(err => res.status(400).json("Error " + err));
});
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then((exersice) => {
            exersice.username = req.body.username;
            exersice.description = req.body.description;
            exersice.duration = req.body.duration;
            exersice.date = req.body.date;
            exersice.save()
                .then(res.json('Exersice updated successfully'))
                .catch(err => res.status(400).json("Error " + err));

        })
        .catch(err => res.status(400).json("Error " + err));
});
router.route('/:id').delete((req, res) => {

    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exersice deleted successfully'))
        .catch(err => res.status(400).json("Error " + err));
});
module.exports = router;