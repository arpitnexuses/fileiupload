
var mongoose = require('mongoose');
var csvSchema = new mongoose.Schema({
    FirstName:{
        type: String
    }, 
    LastName: {
        type: String
    },
    Title: {
        type: String
    },
    CompanyNameforEmails: {
        type: String
    },
    Email:{
        type: String
    },
    EmailStatus:{
        type: String
    },
    Seniority:{
        type: String
    },
    Departments:{
        type: String
    },
    First_Phone:{
        type: String
    },
    Employee:{
        type: Number
    },
    Industry:{
        type: String
    },
    PersonLinkeddinUrl:{
        type: String
    },
    Website:{
        type: String
    },
    CompanylinkedinUrl:{
        type: String
    },
    Country:{
        type: String
    },
    AnnualRevenue:{
        type: Number
    }
})
module.exports = mongoose.model('userModel', csvSchema )