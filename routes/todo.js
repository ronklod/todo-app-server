var express = require('express');
var router = express.Router();
var sequelize = require('../DAL/sequelizeObj');
const {QueryTypes} = require("sequelize");

/* save a new task in the DB. */
router.post('/', async function(req, res, next) {
    //Performs a sync betweent the DB and our model, check for example the the table exsits,etc..
    await sequelize.sync();

    //create a new row in the DB
    await sequelize.models.todo.create({
        title: req.body.title,
        content: req.body.content,
        isCompleted: req.body.isCompleted,
        dueDate: req.body.dueDate
    }).then(result =>{
       res.send(JSON.stringify(result));
    });
});

//adding the ability to update a task status, to complete
router.put('/:taskId', async function(req, res, next) {
    await sequelize.models.todo.update(
        { isCompleted:true },
        {
            where: {id: req.params['taskId']}
        }).then(result =>{
              res.send(204);
        }).catch(err =>{
            res.send(500);
    })
});

// router.get('/maxId',async function(req,res) {
//
//     await sequelize.models.todo.findAll({
//         attributes: [[sequelize.fn('max', sequelize.col('id')),'id']]
//     }).then(result => {
//         let maxId = JSON.stringify(result);
//         res.send(maxId);
//     })
//});


//Get all the tags from the DB
router.get('/',async function(req,res) {
    await sequelize.models.todo.findAll().then(result => {
        let todos = JSON.stringify(result);
        console.log(todos)
        res.send(todos);
    }).catch((error) => {
        console.error(error.message);
        res.send(500);
    });
});

//delete a task in the DB
router.delete('/:taskId',async function(req,res) {
    let x = req.params['taskId'];
    await sequelize.models.todo.destroy({
        where: {
            id: x
        }
    });
    res.send('200');
});

module.exports = router;

//Additional example of using sequelize
// try {
//     //this is a 'managed' transaction, meaning if all is good - sequelize will commit it, if there is an error sequelize will roll it back
//     const result = await sequelize.transaction(async (t) => {
//         await sequelize.models.todo.destroy({
//                      where: {
//                          id: x
//                      }
//                  });
//
//         await sequelize.models.todo.findAll({
//             attributes: [sequelize.fn('max', sequelize.col('id'))],
//             raw: true,
//         }).then(result => {
//             let maxId = JSON.stringify(result);
//             res.send(maxId);
//         })
//
//         // await sequelize.query("select max(id) from dbo.todo",{transaction: t},{type: QueryTypes.SELECT}).then((result)=>{
//         //         let todos = JSON.stringify(result);
//         //         console.log(todos)
//         //         res.send(todos);
//         //     })
//     });
// } catch (error) {
//     // If the execution reaches this line, an error occurred.
//     // The transaction has already been rolled back automatically by Sequelize!
//     console.log(error);
// }
