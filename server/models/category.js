import mongoose from "mongoose";

// 동그라미 탭 같은 역할
const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    default: "미분류",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

const Category = mongoose.model("category", CategorySchema);

export default Category;
