const checklists = []; // This is just an example. Replace with your database logic.

const createChecklist = (name, namelist) => {
  const checklistId = checklists.length + 1; // Example ID generation
  const updatedNamelist = namelist.map((item, index) => ({
    ...item,
    checklistItemId: index + 1 // Example ID generation
  }));
  const newChecklist = { checklistId, name, namelist: updatedNamelist };
  checklists.push(newChecklist);
  return newChecklist;
};

const deleteChecklist = (checklistId) => {
    const index = checklists.findIndex(checklist => checklist.checklistId === checklistId);
    if (index === -1) return null; // Checklist not found
    return checklists.splice(index, 1)[0]; // Remove and return the deleted checklist
  };

// New method to get all checklists
const getAllChecklists = () => {
    return checklists;
  };

const getChecklistItem = (checklistId, checklistItemId) => {
  const checklist = checklists.find(cl => cl.checklistId === checklistId);
  if (!checklist) {
    return null;
  }
  const item = checklist.namelist.find(i => i.checklistItemId === checklistItemId);
  return item || null;
};

const getItemsByChecklistId = (checklistId) => {
    const checklist = checklists.find(cl => cl.checklistId === checklistId);
    return checklist ? checklist.namelist : [];
  };

const updateChecklistItemStatus = (checklistId, checklistItemId, isChecklisted) => {
    const checklist = checklists.find(cl => cl.checklistId === checklistId);
    if (!checklist) {
      return null;
    }
  
    const item = checklist.namelist.find(i => i.checklistItemId === checklistItemId);
    if (!item) {
      return null;
    }
    item.isChecklisted = isChecklisted;
    return item;
};

const getChecklistById = (checklistId) => {
    return checklists.find(cl => cl.checklistId === checklistId);
  };

  const updateChecklist = (updatedChecklist) => {
    const index = checklists.findIndex(cl => cl.checklistId === updatedChecklist.checklistId);
    if (index !== -1) {
      checklists[index] = updatedChecklist;
    }
  };

  const deleteChecklistItem = (checklistId, checklistItemId) => {
    const checklist = checklists.find(cl => cl.checklistId === checklistId);
    if (!checklist) {
      return null;
    }
  
    const itemIndex = checklist.namelist.findIndex(i => i.checklistItemId === checklistItemId);
    if (itemIndex === -1) {
      return null;
    }
  
    // Remove the item from the namelist
    checklist.namelist.splice(itemIndex, 1);
    return checklist;
  };

  const updateChecklistItemText = (checklistId, checklistItemId, newText) => {
    const checklist = checklists.find(cl => cl.checklistId === checklistId);
    if (!checklist) {
      return null;
    }
  
    const item = checklist.namelist.find(i => i.checklistItemId === checklistItemId);
    if (!item) {
      return null;
    }
  
    item.textChecklist = newText;
    return checklist;
  };

  const createChecklistItem = (checklistId, newItem) => {
  const checklist = checklists.find(cl => cl.checklistId === checklistId);
  if (!checklist) {
    return null;
  }

  const newItemId = Date.now();
  const newChecklistItem = {
    checklistItemId: newItemId,
    textChecklist: newItem.itemName,
    isChecklisted: false
  };

  checklist.namelist.push(newChecklistItem);
  return newChecklistItem;
};

module.exports = {
  createChecklist , deleteChecklist , getAllChecklists ,
  getChecklistItem , getItemsByChecklistId , updateChecklistItemStatus ,
  getChecklistById , updateChecklist , deleteChecklistItem , updateChecklistItemText,
  createChecklistItem
};