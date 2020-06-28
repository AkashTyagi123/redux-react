const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

router.use(express.json());
const Item = require('../../models/Items');
//@route GET /api/items
//@desc Get all items
//@acess public
router.get('/',(req,res)=>{
  Item.find()
  .sort({date:-1})
  .then(item=>res.json(item));
});

//@route POST /api/items
//@desc Post a item
//@acess private
router.post('/',auth,(req,res)=>{
    
   const name = req.body.name;
   
   const newItem = new Item({name});
   newItem.save()
   .then(item=>res.json(item))
   .catch(err=>console.log(err));
  });

//@route delete /api/items
//@desc delete a item
//@acess private
router.delete('/:id',auth,(req,res)=>{
 Item.findByIdAndDelete(req.params.id)
 .then(item=>res.json({"success":"true"}))  
 .catch(err=>res.status(404).json("Id is not value")); 
});
module.exports = router; 