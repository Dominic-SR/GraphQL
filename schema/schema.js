const graphql = require('graphql');
//const _ = require('lodash'); 
const { GraphQLObjectType, GraphQLString,GraphQLID,GraphQLInt,GraphQLList, GraphQLSchema  } = graphql

const Book = require('../models/book');
const Author = require('../models/author');
const products = require('../models/products');

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent,args){
               // return _.find(authors,{id:parent.authorId});
               return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
               // return _.filter(books, {authorId: parent.id});
               return Book.find({authorId: parent.id});
            }
        }
    })
});

const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        price: {type: GraphQLString},
        countInStock: {type: GraphQLString},
        imageUrl: {type: GraphQLString},
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {

    //Get Book Data By ID    
        
        book:{
            type: BookType,
            args: { id:{type: GraphQLID} },
            resolve(parent, args){//return _.find(books,{id: args.id});
                return Book.findById(args.id);
            }
        },

    //Get Books Data By List

        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
               // return books;
               return Book.find();
            }
        },
    
    //Get Author Data By ID

        author:{
            type: AuthorType,
            args: { id:{type: GraphQLID} },
            resolve(parent, args){
                //return _.find(authors,{id: args.id});
                return Author.findById(args.id);
            }
        },
    
    //Get Authors Data By List

        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
               // return authors;
               return Author.find();
            }
        },
        product:{
            type: ProductType,
            args: {id: {type:GraphQLString}},
            resolve(parent,args){
                return products.findById(args.id);
            }
        },
        products:{
            type: new GraphQLList(ProductType),
            resolve(parent,args){
                return products.find();
            }
        }   
    }
});


const Muatation = new GraphQLObjectType ({
    name: "Muatation",
    fields:{
        addAuthor: {
            type:AuthorType,
            args:{
                name:{type: GraphQLString},
                age:{type: GraphQLInt}
            },
            resolve(parent,args){
               
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
               return author.save();
            }
        },
        addBook:{
            type: BookType,
            args:{
                name:{type: GraphQLString},
                genre:{type: GraphQLString},
                authorId:{type: GraphQLID}
            },
            resolve(parent,args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        },
        addProduct:{
            type:ProductType,
            args:{
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                price: {type: GraphQLString},
                countInStock: {type: GraphQLString},
                imageUrl: {type: GraphQLString},
            },
            resolve(parent,args){
               
                let product = new products({
                    name: args.name,
                    description: args.description,
                    price: args.price,
                    countInStock: args.countInStock,
                    imageUrl: args.imageUrl
                });
                console.log(product);
               return product.save();
            }
        },
        updateProduct:{
            type:ProductType,
            args:{
                id: {type: GraphQLString},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                price: {type: GraphQLString},
                countInStock: {type: GraphQLString},
                imageUrl: {type: GraphQLString},
            },
            resolve(parent,args){
               
                return products.findByIdAndUpdate(args.id,{$set:{ name: args.name,
                description: args.description,
                price: args.price,
                countInStock: args.countInStock,
                imageUrl: args.imageUrl}});

            }
        },
        RemoveProduct:{
            type: ProductType,
            args:{
                id: {type: GraphQLString},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                price: {type: GraphQLString},
                countInStock: {type: GraphQLString},
                imageUrl: {type: GraphQLString},
            },
            resolve(parent,args){
                return products.findByIdAndRemove(args.id).exec();
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Muatation
});