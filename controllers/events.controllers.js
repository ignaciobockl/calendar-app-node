const { response, request } = require('express');

const Event = require('../models/Event.model');



const createEvent = async( req = request, res = response ) => {

    const newEvent = new Event( req.body );

    try {

        newEvent.user = req.uid;

        const eventCreated = await newEvent.save();

        return res.status(201).json({
            ok: true,
            msg: 'Event created successfully.',
            event: eventCreated
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false, 
            msg: 'Error, event creation, review logs.',
            error
        });
    }

}

const deleteEvent = async( req = request, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;
    
    try {

        const event = await Event.findById( eventId );
        if( !event ) {
            return res.status(404).json({ 
                ok: false, 
                msg: 'There is no event with the entered id.' 
            });
        }

        // check if the user that is going to modify is the same that created the event
        if ( event.user.toString() !== uid ) {
            res.status(401).json({
                ok: false,
                msg: 'User does not have privilege to deletee this event.'
            });
        }

        await Event.findByIdAndDelete( eventId );

        return res.status(200).json({
            ok: true,
            msg: 'Event deleted successfully.',
            deletedEvent: event
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error, delete event, review logs.',
            error
        });
    }

}

const getEvents = async( req = request, res = response ) => {

    const events = await Event.find()
        .populate('user', '_id name');

    if ( events.length === 0 ) 
        return res.status(400).json({ ok: false, msg: 'There are no events stored in the database.'});

    return res.status(200).json({
        ok: true,
        quantity: events.length,
        events
    });

}

const updateEvent = async( req = request, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );
        if( !event ) {
            return res.status(404).json({ 
                ok: false, 
                msg: 'There is no event with the entered id.' 
            });
        }

        // check if the user that is going to modify is the same that created the event
        if ( event.user.toString() !== uid ) {
            res.status(401).json({
                ok: false,
                msg: 'User does not have privilege to update this event.'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        return res.status(200).json({
            ok: true,
            msg: 'Event updated successfully.',
            event: updatedEvent
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error, update event, review logs.',
            error
        });
    }

}



module.exports = {
    createEvent,
    deleteEvent,
    getEvents,
    updateEvent
}