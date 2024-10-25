import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Nombre es requerido'],
    unique: true,
  },
  description: String,
  category: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  tags: [String],
  brand: String,
  sku: String,
  weight: Number,
  dimensions: {
    width: Number,
    height: Number,
    depth: Number,
  },
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: String,
  reviews: [{
    id: String,
    comentId: String,
    rating: Number,
    comment: String,
    date: Date,
    reviewerName: String,
    reviewerEmail: String
 }],
  returnPolicy: String,
  minimumOrderQuantity: Number,
  meta: {
    createdAt: Date,
    updatedAt: Date,
    barcode: String,
    qrCode: String,
  },
  images: [String],
  thumbnail: String,
});

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret, options) {
    delete ret._id;
  }
})

export const ProductModel = mongoose.model('Product', productSchema);

