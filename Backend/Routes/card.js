const express = require("express")
const cardModel = require("../Collection/cardSchema")
const UsersSchema = require('../Collection/UsersSchema')

const router = express.Router()

router.post('/create-item', (req,res) => {
    cardModel.create({
        title : req.body.title,
        ratings : req.body.ratings,
        price : req.body.price,
        imageUrl : req.body.imageUrl,
        category : req.body.category,
        userId : req.body.userId
    }).then(result => {
        return res.json(result)
    }).catch(err => res.json(err))
})

router.get('/items', (req,res) => {
    cardModel.find()
    .then(items => {
        return res.json(items)
    }).catch(err => res.json(err))
})

router.get('/items-by-id/:id', (req, res) => {
    const id = req.params.id;
    cardModel.findById({_id : id})
    .then(result => {
        return res.json(result)
    }).catch(err => res.json(err))
})

router.get('/saved-Items/:userid' , (req,res) => {
    const userid= req.params.userid;
    UsersSchema.findById({_id : userid})
    .then(result => {
        return res.json({savedItems : result.savedItems})
    })
    .catch(err => res.json(err))
} )

router.get('/cart-Items/:userid' , (req,res) => {
    const userid= req.params.userid;
    UsersSchema.findById({_id : userid})
    .then(result => {
        return res.json({cartItems : result.cartItems})
    })
    .catch(err => res.json(err))
} )



router.get('/user-saved-Items/:userid' , async (req,res) => {
    const userid= req.params.userid;
    try {
        const user = await UsersSchema.findById({_id : userid})
        const items = await cardModel.find({
        _id : {$in : user.savedItems}
    })
    res.status(201).json(items)
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/user-cart-Items/:userid' , async (req,res) => {
    const userid= req.params.userid;
    try {
        const user = await UsersSchema.findById({_id : userid})
        const items = await cardModel.find({
        _id : {$in : user.cartItems}
    })
    res.status(201).json(items)
    } catch(err) {
        res.status(500).json(err)
    }
})

router.delete('/delete-item/:id' , (req,res ) => {
    const id = req.params.id;
    cardModel.findByIdAndRemove(id)
    .then(result => {
        return res.json(result)
    }).catch(err => res.json(err))
})

router.delete('/user-remove-item/:itemId/:userId', async (req, res) => {
    const { itemId, userId } = req.params;
  
    try {
      await UsersSchema.findByIdAndUpdate(userId, { $pull: { savedItems: itemId } });
      res.json({ success: true, message: 'Item removed from savedItems' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

  router.delete('/user-remove-cart-item/:itemId/:userId', async (req, res) => {
    const { itemId, userId } = req.params;
  
    try {
      await UsersSchema.findByIdAndUpdate(userId, { $pull: { cartItems: itemId } });
      res.json({ success: true, message: 'Item removed from cartItems' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  
router.route('/update-item/:id').get((req,res,next) => {
    const id = req.params.id;
    cardModel.findById(id , (err , data) => {
        if(err){
            console.log(err);
            return next(err);
        } else {
            return res.json(data);
        }
    }) 
})
.put((req,res,next) => {
    const id = req.params.id;
    cardModel.findByIdAndUpdate(id , { $set: req.body }, (err,data) => {
        if(err){
            console.log(err);
            return next(err);
        }else{
            return res.json(data);
        }
    })
})

router.put('/saved', async (req,res) => {
    const item = await cardModel.findById({_id : req.body.itemsid})
    const user = await UsersSchema.findById({_id : req.body.userid})
    try{
        user.savedItems.push(item)
        await user.save()
        return res.json({savedItems : user.savedItems})
    } catch (err) {
        return res.json(err)
    }
    
})
router.put('/cart', async (req,res) => {
    const item = await cardModel.findById({_id : req.body.itemsid})
    const user = await UsersSchema.findById({_id : req.body.userid})
    try{
        user.cartItems.push(item)
        await user.save()
        return res.json({cartItems : user.cartItems})
    } catch (err) {
        return res.json(err)
    }
    
})





  
module.exports = router;