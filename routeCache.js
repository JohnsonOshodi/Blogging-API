const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Mock data
const BLOG_POSTS = {
    1: { id: 1, title: 'First Post', content: 'This is the first post.' },
    2: { id: 2, title: 'Second Post', content: 'This is the second post.' },
};

// Connect to Redis
const redisClient = redis.createClient();

// Middleware
app.use(bodyParser.json());

// Cache middleware
const cache = (req, res, next) => {
    if (req.method !== 'GET') {
        return next();
    }

    const key = `blog_post_${req.params.postId}`;
    redisClient.get(key, (err, data) => {
        if (err) {
            return next(err);
        }
        if (data) {
            return res.status(200).json(JSON.parse(data));
        }
        return next();
    });
};

// Utility function to get blog post from "database"
const getBlogPostFromDb = (postId) => {
    return BLOG_POSTS[postId];
};

// Endpoint to get a blog post with cache middleware
app.get('/blog/:postId', cache, (req, res) => {
    const postId = req.params.postId;
    const post = getBlogPostFromDb(postId);

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    // Save to cache and return
    const key = `blog_post_${postId}`;
    redisClient.setex(key, 60, JSON.stringify(post));
    return res.status(200).json(post);
});

// Endpoint to create a blog post
app.post('/blog', (req, res) => {
    const { title, content } = req.body;
    const postId = Object.keys(BLOG_POSTS).length + 1;
    const newPost = { id: postId, title, content };
    BLOG_POSTS[postId] = newPost;

    // Invalidate cache (depending on how you handle cache invalidation)
    redisClient.flushall();

    return res.status(201).json(newPost);
});

// Export the app for testing or other purposes
module.exports = app;

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

