import mongoose, { Schema } from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: {type: Number},
      price: {type: Number},
    },
  ],
});

purchaseSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

export const PurchaseModel = mongoose.model('Purchase', purchaseSchema);
