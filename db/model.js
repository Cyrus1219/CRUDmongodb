
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/practice1', {useNewUrlParser: true, useUnifiedTopology: true});
// const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));




