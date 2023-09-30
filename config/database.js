import mongoose from 'mongoose';

export const dbConnection = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pzqy7ju.mongodb.net/ecommerce`
    )
    .then((connect) => {
      console.log(`Database Connected ${connect.connection.host}`);
    })
    .catch((err) => {
      console.error(`Database Error ${err}`);
      process.exit(1);
    });
};
