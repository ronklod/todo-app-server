var express = require('express');
var router = express.Router();
var fs = require('fs');
var sequelize = require('../DAL/sequelizeObj');
const {QueryTypes} = require("sequelize");
const BSON = require('bson');    

/* save a new task in the DB. */
router.post('/', async function(req, res, next) {

    await sequelize.sync();
    //getting the fileObj from the req.files, the req.files is added in app.js by the fileUpload library
    const fileObj = req.files;
    const formData = JSON.parse(req.body.task);
    let attachment_row = null;

    try {
        const result = await sequelize.transaction(async (t) => {
            //I'm serializing the entire file, with all it metadata
            if(fileObj != null){
                let buf = BSON.serialize(req.files);
                attachment_row = await sequelize.models.tasks_attachments.create({
                    attachment: Buffer.from(buf,"binary")
                },{transaction :t});
            }

            //create a new row in the DB
            const task = await sequelize.models.tasks.create({
                title: formData.title,
                content: formData.content,
                isCompleted: false,
                dueDate: formData.dueDate,
                attachment_id: (attachment_row != null) ? attachment_row.dataValues.id : null,
                category_id: formData.category_id
            },{transaction :t}).then(result =>{
               res.status(200).send(JSON.stringify(result));
            });
        });
        // If the execution reaches this line, the transaction has been committed successfully
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!
    }
});

//adding the ability to update a task status, to complete
router.put('/:taskId', async function(req, res, next) {
    await sequelize.models.tasks.update(
        { isCompleted:true },
        {
            where: {id: req.params['taskId']}
        }).then(result =>{
              res.send(204);
        }).catch(err =>{
            res.send(500);
    })
});

/*
* getting back an attachment from the DB
 */
router.get('/attachment/:id', async function (req,res) {
    await sequelize.models.tasks_attachments.findAll({
        where: {id: req.params['id']}
    }).then(result => {
        let x = result[0].dataValues.attachment;
        //desirialzing the file binary data as stored in the DB into the file object
        let obj = BSON.deserialize(x,'utf-8');
        const fileName = obj.file.name;
        const fileType = obj.file.mimetype;

        res.writeHead(200, {
            'Content-Disposition': `attachment; filename="${fileName}"`,
            'Content-Type': fileType,
        })
        const download = obj.file.data.buffer;
        res.end(download)
    });
});




//Get all the tags from the DB
router.get('/',async function(req,res) {

    await sequelize.sync();

    await sequelize.models.tasks.findAll().then(result => {
        let tasks = JSON.stringify(result);
        console.log(tasks)
        res.send(tasks);
    }).catch((error) => {
        console.error(error.message);
        res.send(500);
    });
});

//delete a task in the DB
router.delete('/:taskId',async function(req,res) {
    try {
        const result = await sequelize.transaction(async (t) => {
            let x = req.params['taskId'];
            let attchment_id = null;

            //finding if this task has an attchment
            await sequelize.models.tasks.findAll({
                where: {id: x}
            },{transaction: t}).then (result => {
                attchment_id = result[0].dataValues.attachment_id
            });

            //If a task has an attachment, we delete it and then we will deleted the task itself
            if(attchment_id != null){
                //deleting the attachment
                await sequelize.models.tasks_attachments.destroy({
                    where: {
                        id: attchment_id
                    }
                }, {transaction:t});
            }

            //deleting the tasks
            await sequelize.models.tasks.destroy({
                where: {
                    id: x
                }
            });
        });

        res.send(200);
        // If the execution reaches this line, the transaction has been committed successfully

    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!
    }

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


//not in use, playground for downloading the image as a file
// router.get('/attachment',async function(req,res) {
//
//     const fileData = xx.file.data;
//     const fileName = 'hello_world.jpeg'
//     const fileType = 'image/jpeg'
//
//     res.writeHead(200, {
//         'Content-Disposition': `attachment; filename="${fileName}"`,
//         'Content-Type': fileType,
//     })
//
//     const download = Buffer.from(fileData, 'base64');
//     res.end(download)
//     // var fileContents = Buffer.from(xx, "base64");
//     // var savedFilePath = '../temp/' + 'ron.jpeg'; // in some convenient temporary file folder
//     // fs.writeFile(savedFilePath, fileContents, function() {
//     //     response.status(200).download(savedFilePath, fileName);
//     // });
//
//    //  res.set('Content-Type', 'image/jpeg');
//    //  //res.set({'mimetype': 'image/jpeg'});
//    // res.status(200).send(xx);
// });


// router.get('/maxId',async function(req,res) {
//
//     await sequelize.models.todo.findAll({
//         attributes: [[sequelize.fn('max', sequelize.col('id')),'id']]
//     }).then(result => {
//         let maxId = JSON.stringify(result);
//         res.send(maxId);
//     })
//});
