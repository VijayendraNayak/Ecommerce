const { asyncErrHandler } = require('../middleware/asyncerrorHandler')
const Product = require('../models/productmodel')
const { errorHandler } = require('../utils/errorHandler')

//for users to get the product
exports.getallproducts = async (req, res) => {
    const product = await Product.find()
    res.status(200).json({ message: "This api is working", product,success:true })
}
//for admin to post the product
exports.createProduct = asyncErrHandler(async (req, res, next) => {
    req.body.user=req.body.id
    const product = await Product.create(req.body)
    res.status(200).json({ success: true, product })
})
//Only for admin

exports.updateProduct = async (req, res, next) => {
  const { id, name, price, category, stock, ratings } = req.body;

  try {
    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Update only the provided fields
    if (name) product.name = name;
    if (price) product.price = price;
    if (category) product.category = category;
    if (stock) product.stock = stock;
    if (ratings) product.ratings = ratings;

    // Save the updated product
    await product.save();

    res.status(200).json({ success: true, message: 'Product updated successfully', product });
  } catch (error) {
    // Handle any errors that may occur during the update process
    next(error);
  }
};

//Only for admin
exports.deleteProduct = async (req, res, next) => {
    const {id}=req.body
    let product = await Product.findById(id)
    if (!product) { return res.status(404).json({ success: false, message: "Product not found" }) }
    await Product.findByIdAndDelete(id).then(() => {
        res.status(200).json({ succses: true, message: "Product deleted successfully" })
    })
}
//for user
exports.getProduct = async (req, res, next) => {
    const {id}=req.body
    let product = await Product.findById(id)
    if (!product) { return res.status(404).json({ success: false, message: "Product not found" }) }
    res.status(200).json({ success: true, product })
}

//for search filter
exports.getSearch = asyncErrHandler(async (req, res, next) => {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = req.query.searchTerm || " ";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    let ratings = req.query.ratings;
    if (ratings === undefined || ratings === "all") {
        ratings = { $gte: 0 }; // You can set a default value or adjust it based on your requirement
    } else {
        ratings = { $gte: parseInt(ratings) };
    }

    let price = req.query.price;
    if (price === undefined || price === "all") {
        price = { $gte: 0 }; // You can set a default value or adjust it based on your requirement
    } else {
        price = { $gte: parseInt(price) };
    }

    let category = req.query.category || "all";
    if (category === "all") {
        category = { $exists: true }; // You can adjust this based on your requirement
    } else {
        category = { $regex: category, $options: 'i' };
    }

    const products = await Product.find({
        name: { $regex: searchTerm, $options: 'i' },
        category,
        price,
        ratings
    })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
        if(products.length<1){return next(errorHandler(404,"Product not found"))}
    return res.status(200).json({success:true,products,count:products.length});
})
exports.ReviewProduct = asyncErrHandler(async (req, res, next) => {
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: req.body.reviews[0].rating,
        comment: req.body.reviews[0].comment
    };

    const ruser = review.user;
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(errorHandler(404, "Product not found"));
    }

    let rating = 0;
    let userAlreadyReviewed = false;

    
    product.reviews.forEach(rev => {
        rating += rev.rating;
        if (rev.user.equals(ruser)) {
            userAlreadyReviewed = true;
            return; // Exit the loop if user has already reviewed
        }
    });
    
    if (userAlreadyReviewed) {
        return next(errorHandler(401, "User has already reviewed this product"));
    }
    
    rating+=review.rating
    product.reviews.push(review);

    product.ratings = rating / product.reviews.length;
    product.numOfReviews = product.reviews.length;

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product, { new: true });

    res.status(200).json({ success:true,message: "Review uploaded successfully", product: updatedProduct });
});
 
exports.getallcount = asyncErrHandler(async (req, res, next) => {
    const length = await Product.countDocuments()
    const products = await Product.find()
    if (!length) { return next(errorHandler(403, "There are no users in the database")) }
    res.status(200).json({ message: "Num of users:", length, products })
})