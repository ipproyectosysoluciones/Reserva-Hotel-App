const express = require("express");
const router = express.Router();
const { createTravel, updateTravel, deleteTravel, getAllTravels } = require('../controllers/travelControllers')

router.post('/', async (req, res) => {
    try {
        const { photo_small, big_photo, title, description } = req.body;
        const newTravel = await createTravel(photo_small, big_photo, title, description);

        if (newTravel.error) {
            res.render('pages/404.ejs', { newTravel, title: 'Hotel Backend' });
        } else {
            const travels = await getAllTravels();
            res.render('pages/travel.ejs', { newTravel, travels, title: 'Hotel Backend' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { photo_small, big_photo, title, description } = req.body;

        const updatedTravel = await updateTravel(id, photo_small, big_photo, title, description);
        if (updatedTravel.error) {
            res.render('pages/404.ejs', { updatedTravel, title: 'Hotel Backend' });
        } else {
            const travels = await getAllTravels();
            res.render('pages/travel.ejs', { updatedTravel, travels, title: 'Hotel Backend' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTravel = await deleteTravel(id);
        if (deletedTravel.error) {
            res.render('pages/404.ejs', { deletedTravel, title: 'Hotel Backend' });
        } else {
            const travels = await getAllTravels();
            res.render('pages/travel.ejs', { deletedTravel, travels, title: 'Hotel Backend' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const travels = await getAllTravels();
        if (travels.error) {
            res.status(400).json({ error: travels.error });
        } else {
            res.render('pages/travel.ejs', { travels, title: 'Hotel Backend' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
