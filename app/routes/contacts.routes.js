const Router = require('express')
const router = new Router()

//link to contacts controller
const contactsController = require('../controllers/contacts.controller')

//GET
router.get('/contacts', contactsController.getContacts)
router.get('/contacts/:id', contactsController.getContactsById)
//POST
router.post('/contacts', contactsController.postContacts)
//PUT
router.put('/contacts/:id', contactsController.putContacts)
//DELETE
router.delete('/contacts/:id', contactsController.deleteContacts)



module.exports = router