const contactService = require('./contact.service')
const logger = require('../../services/logger.service')

module.exports = {
    getContact,
    addContact,
    getContacts,
    deleteContact,
    updateContact
}

async function getContact(req, res) {
    try {
        const contact = await contactService.getById(req.params.id)
        res.status(200).send(contact)

    } catch (err) {
        logger.error('Failed to get contact', err.message)
        res.status(400).send({message: 'Failed to get contact: '+err.message})
    }
}

async function addContact(req, res) {
    try {
        const contact = req.body
        const savedContact = await contactService.add(contact)
        res.status(200).send(savedContact)
    } catch (err) {
        logger.error('Failed to add contact', err.message)
        res.status(400).send({message: 'Failed to add contact: '+err.message})
    }
}

async function getContacts(req, res) {
    try {
        const contacts = await contactService.query()
        res.status(200).send(contacts)
    } catch (err) {
        logger.error('Failed to get contacts', err.message)
        res.status(400).send({message: 'Failed to get contacts: '+err.message})
    }
}
async function deleteContact(req, res) {
    try {
        await contactService.remove(req.params.id)
        res.status(200).send({message: 'Deleted successfully'})
    } catch (err) {
        logger.error('Failed to delete contact', err.message)
        res.status(400).send({message: 'Failed to delete contact: '+err.message})
    }
}

async function updateContact(req, res) {
    try {
        const {id} = req.params
        const contact = req.body
        const savedContact = await contactService.update(id,contact)
        res.status(200).send({contact: savedContact, message: 'Updated successfully'})
    } catch (err) {
        logger.error('Failed to update contact', err.message)
        res.status(400).send({message: 'Failed to update contact: '+err.message})
    }
}



