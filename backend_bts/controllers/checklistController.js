const ChecklistModel = require('../models/checklistModel');

exports.createChecklist = (req, res) => {
  console.log('Received POST request at /checklist with body:', req.body);

  const { name, namelist } = req.body;

  if (!name || !Array.isArray(namelist)) {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  try {
    const newChecklist = ChecklistModel.createChecklist(name, namelist);
    res.status(201).json(newChecklist);
  } catch (error) {
    console.error('Error creating checklist:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteChecklist = (req, res) => {
  const checklistId = parseInt(req.params.checklistId, 10);

  if (isNaN(checklistId)) {
    return res.status(400).json({ message: 'Invalid checklist ID' });
  }

  const deletedChecklist = ChecklistModel.deleteChecklist(checklistId);

  if (!deletedChecklist) {
    return res.status(404).json({ message: 'Checklist not found' });
  }

  res.status(200).json({ message: 'Checklist deleted successfully', deletedChecklist });
};

exports.getAllChecklists = (req, res) => {
    try {
      const allChecklists = ChecklistModel.getAllChecklists();
      res.status(200).json(allChecklists);
    } catch (error) {
      console.error('Error retrieving checklists:', error);
      res.status(500).json({ message: error.message });
    }
  };

exports.getChecklistItem = (req, res) => {
    const { checklistId, checklistItemId } = req.params;
  
    try {
      const item = ChecklistModel.getChecklistItem(Number(checklistId), Number(checklistItemId));
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({ message: 'Checklist item not found' });
      }
    } catch (error) {
      console.error('Error retrieving checklist item:', error);
      res.status(500).json({ message: error.message });
    }
};

exports.getItemsByChecklistId = (req, res) => {
    const { checklistId } = req.params;
  
    try {
      const items = ChecklistModel.getItemsByChecklistId(Number(checklistId));
      if (items.length > 0) {
        res.status(200).json(items);
      } else {
        res.status(404).json({ message: 'No items found for this checklist' });
      }
    } catch (error) {
      console.error('Error retrieving checklist items:', error);
      res.status(500).json({ message: error.message });
    }
  };

  exports.updateChecklistItemStatus = (req, res) => {
    const { checklistId, checklistItemId } = req.params;
  
    try {
      // Retrieve the checklist to find the item and its current status
      const checklist = ChecklistModel.getChecklistById(Number(checklistId));
      if (!checklist) {
        return res.status(404).json({ message: 'Checklist not found' });
      }
  
      const item = checklist.namelist.find(i => i.checklistItemId === Number(checklistItemId));
      if (!item) {
        return res.status(404).json({ message: 'Checklist item not found' });
      }
  
      // Toggle the isChecklisted status
      item.isChecklisted = !item.isChecklisted;
  
      // Update the checklist with the new status
      ChecklistModel.updateChecklist(checklist);
  
      res.status(200).json(item);
    } catch (error) {
      console.error('Error updating checklist item status:', error);
      res.status(500).json({ message: error.message });
    }
  };

  exports.deleteChecklistItem = (req, res) => {
    const { checklistId, checklistItemId } = req.params;
  
    try {
      const updatedChecklist = ChecklistModel.deleteChecklistItem(Number(checklistId), Number(checklistItemId));
      if (updatedChecklist) {
        res.status(200).json({ message: 'Checklist item deleted successfully', checklist: updatedChecklist });
      } else {
        res.status(404).json({ message: 'Checklist item not found' });
      }
    } catch (error) {
      console.error('Error deleting checklist item:', error);
      res.status(500).json({ message: error.message });
    }
  };

  exports.updateChecklistItemText = (req, res) => {
    const { checklistId, checklistItemId } = req.params;
    const { itemName } = req.body;
  
    if (!itemName) {
      return res.status(400).json({ message: 'Item name is required' });
    }
  
    try {
      const updatedChecklist = ChecklistModel.updateChecklistItemText(Number(checklistId), Number(checklistItemId), itemName);
      if (updatedChecklist) {
        res.status(200).json({ message: 'Checklist item updated successfully', checklist: updatedChecklist });
      } else {
        res.status(404).json({ message: 'Checklist item not found' });
      }
    } catch (error) {
      console.error('Error updating checklist item text:', error);
      res.status(500).json({ message: error.message });
    }
  };

  exports.createChecklistItem = (req, res) => {
    const { checklistId } = req.params;
    const { itemName } = req.body;
  
    if (!itemName) {
      return res.status(400).json({ message: 'Item name is required' });
    }
  
    try {
      const newItem = ChecklistModel.createChecklistItem(Number(checklistId), { itemName });
      if (newItem) {
        res.status(201).json({ message: 'Checklist item created successfully', item: newItem });
      } else {
        res.status(404).json({ message: 'Checklist not found' });
      }
    } catch (error) {
      console.error('Error creating checklist item:', error);
      res.status(500).json({ message: error.message });
    }
  };