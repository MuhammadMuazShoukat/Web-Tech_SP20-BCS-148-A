const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGO_URI; 
  

const mongoDB = async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connected");
      const fetchedData = await mongoose.connection.db.collection("food_items");
      fetchedData.find({}).toArray(async(err,data)=>{
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
          foodCategory.find({}).toArray((err,catData)=>{
            if(err){
                console.log(err);
            }else{
                // console.log(data);
                global.food_items = data;
                global.foodCategory = catData;
            }
          })
      })
    }
  });
};

module.exports = mongoDB;
