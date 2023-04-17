"use strict";
const marathonService = require('./marathon.service')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const {validateToken} = require("../auth/auth.service");

module.exports = {
    getMarathons,
    addMarathon,
    signToMarathon,
    getMyMarathons,
}

async function getMyMarathons(req, res) {
    try {
        const user = validateToken(req.session.loginToken); // get the user from the token
        // find if user is in students array
        const marathons = await marathonService.query({students: user._id})
        logger.debug('marathons: ', marathons);
        res.json(marathons);
    } catch (err) {
        logger.error('Failed to get marathons', err.message)
        res.status(400).send({message: 'Failed to get marathons: ' + err.message})
    }
}

async function getMarathons(req, res) {
    try {
        const marathons = await marathonService.query()
        logger.debug('marathons: ', marathons);
        res.json(marathons);
    } catch (err) {
        logger.error('Failed to get marathons', err.message)
        res.status(400).send({message: 'Failed to get marathons: ' + err.message})
    }
}

async function addMarathon(req, res) {
    try {
        const marathon = req.body
        const user = validateToken(req.session.loginToken); // get the user from the token
        marathon.teacherId = user._id;
        logger.debug('marathon added', marathon);
        const addedMarathon = await marathonService.addMarathon(marathon)
        res.json(addedMarathon)
    } catch (err) {
        logger.error('Failed to add marathon', err.message)
        res.status(400).send({message: 'Failed to add marathon: ' + err.message})
    }
}

async function signToMarathon(req, res) {
    try {
        const user = validateToken(req.session.loginToken); // get the user from the token
        const {marathonId} = req.params;
        const signedMarathon = await marathonService.signToMarathon(marathonId, user._id);
        res.json(signedMarathon)
    } catch (err) {
        logger.error('Failed to sign to marathon', err.message)
        res.status(401).send({message: 'Failed to sign to marathon' + err.message})
    }
}
