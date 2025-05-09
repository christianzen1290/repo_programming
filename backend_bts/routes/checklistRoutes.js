const express = require('express');
const checklistController = require('../controllers/checklistController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//no 1.2.1
router.get('/', authMiddleware.authenticateToken, checklistController.getAllChecklists);
// no 1.2.2
router.post('/', authMiddleware.authenticateToken, checklistController.createChecklist);
//no 1.2.3
router.delete('/:checklistId', authMiddleware.authenticateToken, checklistController.deleteChecklist);

//no 1.3.1
router.get('/:checklistId/item', authMiddleware.authenticateToken, checklistController.getItemsByChecklistId);
//no 1.3.2
router.post('/:checklistId/item', authMiddleware.authenticateToken, checklistController.createChecklistItem);
//no 1.3.3
router.get('/:checklistId/item/:checklistItemId', authMiddleware.authenticateToken, checklistController.getChecklistItem);
//no 1.3.4
router.put('/:checklistId/item/:checklistItemId', authMiddleware.authenticateToken, checklistController.updateChecklistItemStatus);
//no 1.3.5
router.delete('/:checklistId/item/:checklistItemId', authMiddleware.authenticateToken, checklistController.deleteChecklistItem);
//no 1.3.6
router.put('/:checklistId/item/rename/:checklistItemId', authMiddleware.authenticateToken, checklistController.updateChecklistItemText);



module.exports = router;