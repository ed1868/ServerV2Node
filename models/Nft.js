const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nftSchema = new Schema(
  {
    userId: String,
    hash:String,
    url: String,
    transactions: Array,
    currentPrice:String
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const NFT = mongoose.model('NFT', nftSchema)
module.exports = NFT
