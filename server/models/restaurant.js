import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  id: { type: String, required: true },
  photoURL: { type: String },
  name: { type: String, required: true },
  address: { type: String, required: true },
  telephone: { type: String },
  clicked: { type: Boolean, required: true },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
