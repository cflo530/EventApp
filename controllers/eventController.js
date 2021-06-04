const Event = require('../models/event');
const {genImage} = require('../services/image');

exports.createNewEvent = (req, res) => {
    try {
        const { title, cost, category } = req.body
        const imageUrl = genImage(category)
    
        let newEvent = Event.create({ title, cost, category })
        res.json({message: `Event successfully created!`, newEvent})
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
    
};

exports.fetchEvents = (req, res) => {
    let conditions = {};

    if(req.query.category){
        conditions.category = req.query.category;
    }

    Event.find(conditions, (err, events) => {
        if(err){
            return res.status(500).json({message: err});
        }
        else{
            return res.status(200).json({events});
        }
    });
};

exports.fetchSingleEvent = (req, res) => {
    Event.findById(req.params.id, (err,  event) => {
        if(err){
            return res.status(500).json({message: err});
        }
        else if(!event){
            return res.status(404).json({message: 'Event not found'});
        }
        else{
            return res.status(200).json({event});
        }
    });
};

exports.updateSingleEvent = (req, res) => {
    Event.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        cost: req.body.cost,
        category: req.body.category
    }, (err, event) => {
        if(err){
            return res.status(500).json({message: err});
        }
        else if(!event){
            return res.status(404).json({message: 'Event not found'});
        }
        else{
            event.save((err, savedEvent) => {
                if(err){
                    return res.status(400).json({message: err});
                }
                else{
                    return res.status(200).json({message: 'Event updated'});
                }
            });
        }
    })
};

exports.deleteSingleEvent = (req, res) => {
    Event.findByIdAndDelete(req.params.id, (err, event) => {
        if(err){
            return res.status(500).json({message: err});
        }
        else if(!event){
            return res.status(404).json({message: 'Event not found'});
        }
        else{
            return res.status(200).json({message: 'Event deleted'});
        }
    });
};