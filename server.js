var express = require('express'),
app = express(),
mongoose = require('mongoose'),
cors = require('cors'),
bodyParser = require('body-parser'),
jwt = require('jsonwebtoken');

app.use(cors({
    origin:'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
mongoose.Promise = require('q').Promise;

mongoose.connect('mongodb://localhost:27017/users', function(err){
    if(err){
        console.log("Connection not established");
    }
    else{
        console.log("Connection established");
    }
});

var Schema = mongoose.Schema;

var reg_product_schema = new Schema({
    username: String,
    password: String,
    address: String,
    city: String,
    state: String,
    zip: String
});

var addproducts_schema = new Schema({
    productId: String,
    productName: String,
    productCode: String,
    releaseDate: String,
    description: String,
    price: String,
    starRating: String,
    imageUrl: String
});


var user_product_reg = mongoose.model('user_products', reg_product_schema);
var products_schema = mongoose.model('products', addproducts_schema);


//registration of the user 
app.post('/registration', function(req, res){
    //console.log(req.body);
    var userRegistration = new user_product_reg({
        username: req.body.username,
        password: req.body.password,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    });

    userRegistration.save(function(err) {
        if (!err){
           console.log("Document saved");
           res.send({
                isRegistered: true,
                message: 'registered'
            });
        }
        else{
            res.send({
                isRegistered:false,
                message: 'Registration error'
            })
        } 
    });

});

//login user check
app.post('/authenticate', function(req, res){
    var token = jwt.sign({'uname': req.body.username}, 'debashish-secret-key', {
            expiresIn: '1h'
    });
    //console.log(req.body);
    var username =  req.body.username;
    var password = req.body.password;
    console.log("sdsd"+ username);
    console.log("sdsd"+ password);

    user_product_reg.findOne({username: username, password: password}, function(err, user){
        if(err){
            //console.log(err);
            return res.status(500).send();
        }
        if(!user){
            return res.send({
                isRegistered: false,
                message: "Not Registered"
            });
        }
        return res.send({
            isRegistered: true,
            message: "Registered",
            data: user,
            token: token
        });
    });
});

app.post('/addproducts', function(req, res){
        console.log(req.body);

        var addproducts = new products_schema({
            productId: req.body.id,
            productName: req.body.name,
            productCode: req.body.code,
            releaseDate: req.body.availability,
            description: req.body.description,
            price: req.body.price,
            starRating: req.body.starRating,
            imageUrl: req.body.imageUrl
        });

        addproducts.save(function(err) {
            if (!err){
               console.log("Product saved");
               res.send({
                    productSaved: true,
                    message: 'product saved successfully'
                });
            }
            else{
                res.send({
                    productSaved:false,
                    message: 'product not saved'
                });
            } 
        });
});

app.use(function(req, res, next){
    // to get the token from client we need to req through header
    var token = req.body.authtoken || req.body.authtoken || req.headers['authtoken'];
    jwt.verify(token, 'debashish-secret-key', function(err, decoded){
        if(err){
            res.send({
                err: true,
                msg: 'Invalid Request'
            });
        } else {
            req.decoded = decoded
            next();
        }
    });
});

app.get('/getproducts', function(req, res){
    console.log(req.decoded);
    products_schema.find(function(err, product){
        if(err){
            return res.status(500).send();
        }
        if(!product){
            return res.send({
                Found: false,
                message: "Product Not Found"
            });
        }
        return res.send({
            Found: true,
            message: "Product Found",
            data: product
        });
    });

});

// app.get('/getproducts', function(req, res){
//     res.send([
//         {
//         "productId": 1,
//         "productName": "Leaf Rake",
//         "productCode": "GDN-0011",
//         "releaseDate": "March 19, 2016",
//         "description": "Leaf rake with 48-inch wooden handle.",
//         "price": 19.95,
//         "starRating": 3.2,
//         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
//       },
//     {
//         "productId": 2,
//         "productName": "Garden Cart",
//         "productCode": "GDN-0023",
//         "releaseDate": "March 18, 2016",
//         "description": "15 gallon capacity rolling garden cart",
//         "price": 32.99,
//         "starRating": 4.2,
//         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
//     },
//     {
//         "productId": 5,
//         "productName": "Hammer",
//         "productCode": "TBX-0048",
//         "releaseDate": "May 21, 2016",
//         "description": "Curved claw steel hammer",
//         "price": 8.9,
//         "starRating": 4.8,
//         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
//     },
//     {
//         "productId": 8,
//         "productName": "Saw",
//         "productCode": "TBX-0022",
//         "releaseDate": "May 15, 2016",
//         "description": "15-inch steel blade hand saw",
//         "price": 11.55,
//         "starRating": 3.7,
//         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
//     },
//     {
//         "productId": 10,
//         "productName": "Video Game Controller",
//         "productCode": "GMG-0042",
//         "releaseDate": "October 15, 2015",
//         "description": "Standard two-button video game controller",
//         "price": 35.95,
//         "starRating": 4.6,
//         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
//     }
//   ]);
// });


app.listen(3000, function(){
    console.log("Server running @ localhost:3000")
});