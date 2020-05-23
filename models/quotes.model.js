import mongoose from '../database/mongoose.db';

const { Schema } = mongoose;

const QuoteModel = {}

const quoteSchema = new Schema({
  message: String,
  author: String
});

const Quote = mongoose.model('Quotes', quoteSchema);

quoteSchema.set('toJSON', { virtuals: true });

QuoteModel.createQuote = (quoteData) => {
  const quote = new Quote(quoteData);
  return quote.save();
};

QuoteModel.list = (perPage, page) => new Promise((resolve, reject) => {
  Quote.find().limit(perPage).skip(perPage * page).exec((err, quotes) => {
    if (err) {
      reject(err);
    } else {
      resolve(quotes);
    }
  });
});

QuoteModel.findById = (id) => new Promise((resolve) => {
  Quote.findById(id).then((result) => {
    resolve(result);
  });
});

export default QuoteModel;