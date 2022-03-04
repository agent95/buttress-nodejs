const mongoose=require("mongoose");

// const taskSchema = new mongoose.Schema({
//     tradeCategory: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'trade_categories'
//     }, 
//     taskDescription: {
//         type: String
//     }
// });

// const taskSchema = new mongoose.Schema({
//     tradeCategory: {
//         type: String
//     }, 
//     taskDescription: {
//         type: String
//     },
//     taskTime:{
//         type: String
//     }
// });

let workerStatusSchema= new mongoose.Schema({
    worker_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
    },
    constructionSite_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'siteinfo'
    },
    site_address:{
        type:String
    },
    start_time:{
        type:String
    },
    end_time:{
        type:String
    },
    status:{
        type:String
    },
    total_working_hours:{
        type:String
    },
    note:{
        type:String
    },
    tasks:[],
    time_zone:{
        type:String
    },
    start_Date:{
        type:String
    }
},{versionKey:false,timestamps:true});

module.exports=mongoose.model('workerStatus',workerStatusSchema);