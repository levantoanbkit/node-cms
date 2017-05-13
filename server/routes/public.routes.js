'use strict'
const PostController = require('../controllers/PostController.js');
const express = require('express');
const Post = require('../models/post.js');


module.exports = (function() {
    let PublicRoute = express.Router();

    PublicRoute.get('/', function(req, res) {
        Post.find(function(err, data) {
            res.render('pages/index', { posts: data })
        });
    });

    PublicRoute.get('/category/:name', (req, res) => {
        //TO DO -- check if category exists
        res.render(`pages/category-${req.params.name}`, function(err) {
            if (err) {
                return res.render('pages/category');
            }
        });
    });

    PublicRoute.get('/post/:slug', (req, res) => {
        var query = Post.findOne({
            slug: req.params.slug
        });
        query.exec(function(err, result) {
            if (err) {
                return res.sendStatus(400);
            }

            if (result != null) {
                result.update({
                    $inc: {
                        read: 1
                    }
                }, function(err, nbRows, raw) {
                    res.render('pages/single', { post: result });
                });
            } else {
                return res.sendStatus(400);
            }
        });
    });
    return PublicRoute;
})();