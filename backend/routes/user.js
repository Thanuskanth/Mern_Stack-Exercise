const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({ username });
    newUser.save()
        .then(() => res.json('user added successfully'))
        .catch(err => res.status(400).json('Error' + err));
});
router.route('/:id').delete((req, res) => {
    const user = User.findByIdAndDelete(req.params.id)
        .then(() => res.json("user delete succeefully"))
        .catch(err => res.status(400).json('error' + err))
});

router.route('/update/:id').post((req, res) => {
    const user = User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;

            user.save()
                .then(() => res.json("user updated"))
                .catch(err => res.status(400).json('error' + err))
        })
        .catch(err => res.status(400).json('error' + err))

});
router.route('/:id').get((req, res) => {
    const user = User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('error' + err))
});
module.exports = router;
