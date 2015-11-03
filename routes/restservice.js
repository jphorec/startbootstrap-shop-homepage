/**
 * Created by josh.horecny on 11/3/15.
 */
var express = require('express');
var router = express();


router.param('collectionName', function(req, res, next, collectionName){
    req.collection = db.collection(collectionName)
    return next()
})

router.get('/', function(req, res, next) {
    res.send('Must Include Collection Name')
})

router.get('/collections/:collectionName', function(req, res, next) {
    req.collection.find({} ,{limit:10, sort: [['_id',-1]]}).toArray(function(e, results){
        if (e) return next(e)
        res.send(results)
    })
})

router.post('/collections/:collectionName', function(req, res, next) {
    req.collection.insert(req.body, {}, function(e, results){
        if (e) return next(e)
        res.send(results)
    })
})

router.get('/collections/:collectionName/:id', function(req, res, next) {
    req.collection.findById(req.params.id, function(e, result){
        if (e) return next(e)
        res.send(result)
    })
})

router.put('/collections/:collectionName/:id', function(req, res, next) {
    req.collection.updateById(req.params.id, {$set:req.body}, {safe:true, multi:false}, function(e, result){
        if (e) return next(e)
        res.send((result===1)?{msg:'success'}:{msg:'error'})
    })
})

router.delete('/collections/:collectionName/:id', function(req, res, next) {
    req.collection.removeById(req.params.id, function(e, result){
        if (e) return next(e)
        res.send((result===1)?{msg:'success'}:{msg:'error'})
    })
})