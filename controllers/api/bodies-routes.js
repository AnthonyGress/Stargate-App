const router = require('express').Router();
const { Bodies } = require('../../models');

router.get('/:name', async (req, res) => {
    try {
      const body = await Bodies.findOne({
        where: {
            name: req.params.name,
        },
      });
  
      if (!body) {
        res.status(404).json({ message: 'No space body found with this name!' });
        return;
      }
  
      const myBody = body.get({ plain: true });
      res.render("serched-body", {
      ...myBody,
      loggedIn: req.session.loggedIn,
    });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


router.get('/solar-system', async(req, res) =>{
  myId = [1,2,3]
  try{
    const body = await Bodies.findAll({
      where: {
          id:myId,
         
      },
     
    });

    if (!body) {
      res.status(404).json({ message: 'Where is our galaxy!?!?' });
      return;
    }

    res.status(200).json(body);

  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;