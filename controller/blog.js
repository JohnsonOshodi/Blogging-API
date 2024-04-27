const Blog = require('../model/Article')

const createBlog = async (req, res, next) => {
  try {


    // Grab details from the request
    const { title, description, tags, body } = req.body


    // Create blog object
    const newBlog = new Blog({
      title,
      description: description || title,
      tags,
      author: req.user._id,
      body,
      owner: req.user.username,
    })



    // Save to database
    const createdBlog = await newBlog.save()



    // Save blog ID to user document
    req.user.articles = req.user.articles.concat(createdBlog._id)
    await req.user.save()



    // Return response
    return res.status(201).json({
      status: true,
      data: createdBlog,
    })
  } catch (e) {
    e.source = 'creating a blog'
    next(e)
  }
}

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog
      .find(req.findFilter)
      .select(req.fields)
      .populate('author', { username: 1 })
      .skip(req.pagination.start)
      .limit(req.pagination.sizePerPage)

    const pageInfo = req.pageInfo

    return res.json({
      status: true,
      pageInfo,
      data: blogs,
    })
  } catch (err) {
    err.source = 'get published blogs controller'
    next(err)
  }
}

const getBlog = async (req, res, next) => {
  try {
    const { id } = req.params
    const blog = await Blog.findById(id).populate('author', { username: 1 })

    if (blog.state !== 'published') {
      return res.status(403).json({
        status: false,
        error: 'Requested article is not published',
      })
    }


  
    // Update blog read count
    blog.read_count += 1
    await blog.save()

    return res.json({
      status: true,
      data: blog,
    })
  } catch (err) {
    err.source = 'get published blog controller'
    next(err)
  }
}

const updateblog = async (req, res, next) => {
  try {


    const updatedarticle= {
      ...req.body
    
    }
    const { id } = req.params
    const article= await Blog.findById(id)
    const author= article.author
    const authorid= req.user.id
    console.log(authorid, author)
    if (!article) {
      return res.status(403).json({
        status: false,
        error: 'Requested article is not available',
      })

    }
     if (authorid.toString() !== author.toString()) {
      return res.status(403).json({
        status: false,
        error: 'You are not permitted to edit this article',
      })
    
    }
    Object.assign(article, updatedarticle)

    const savedarticle =await article.save()

    return res.status(200).json({
      status: "success",
      message: savedarticle
      
    })}
    
    catch(error) {
      return res.status(403).json({
        status: false,
        error: error.message
      })
    }}


    

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateblog

}