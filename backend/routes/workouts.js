const express = require("express");
const {
    getAllWorkout,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require("../controllers/wordoutControllers");
const requireAuth = require("../middleware/requireAuth")

const router = express.Router();

router.use(requireAuth)

router.get('/', getAllWorkout);

router.get('/:id', getWorkout);

router.post('/', createWorkout);

router.delete('/:id', deleteWorkout);

router.patch('/:id', updateWorkout);

module.exports = router;