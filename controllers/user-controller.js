const { User } = require('../models/User');

const userController = {
    getAllUser(req, res) {
        User.find({})
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    getUserById({ params }, res){
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'freinds',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.join(dbUserData))
        .catch(err => res.json(err));
    },
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'no user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({_id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = userController;