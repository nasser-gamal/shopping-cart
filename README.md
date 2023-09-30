<h1 align='center'>
  <a href='https://github.com/Braineanear/EcommerceAPI'>
      <img src="https://hackernoon.com/hn-images/1*lAR9Uh_gJ7dp23e0vhy5Hg.png" alt="Logo" width="200" height="200">
  </a>
  <h3 align='center'>Ecommerce API</h3>
  <p align='center'>E-commerce API built using NodeJS & MongoDB</p>
<h1>


## Installation
1. Clone the repository.
2. Run `yarn install` to install dependencies.
3. Create a `.env.development` file in the root directory and paste the following:

```
  PORT=
  DB_USER=
  DB_PASSWORD=
  JWT_SECRET_TOKEN=
  STRIPE_SECRET=
  STRIPE_WEBHOOK_SECRET=
  EMAIL_HOST=
  EMAIL_PORT=
  EMAIL_USER=
  EMAIL_PASSWORD=
```
  
  - **`PORT`** The PORT your Server Will Run
  - **`DB_USER`** The username for your MongoDB 
  - **`DB_PASSWORD`** The password for your MongoDB 
  - **`JWT_SECRET_TOKEN`** jsonwebtoken secret key
  - **`STRIPE_SECRET`** your Stripe Secret Key
  - **`STRIPE_WEBHOOK_SECRET`** your Stripe Webhook Secret Key
  - **`EMAIL_HOST`** The Host for Emails Service
  - **`EMAIL_PORT`** The PORT for Emails Service
  - **`EMAIL_USER`** The User for Emails Service
  - **`EMAIL_PASSWORD`** The user for Emails Service

  
4. Run `yarn start:dev` or `npm run start:dev` depending on which package manager you use to start the project in development mode.

## API Usage

Check [Ecommerce API Documentation](https://documenter.getpostman.com/view/22369261/2s9YJaZ4ZQ) for more info.

## Key Features

* Authentication
  * Login [public]
  * Register [public]
  * Token [Public]
* Password Management
  * forgetPassword [public]
  * verifyResetPassPode [public]
  * resetPassword [Public]
* Email Managment
  * Send Email Code [Public]
* User
  * Create New User [Admin]
  * Get All Users [Admin]
  * Get User [Admin]
  * Change User Password [Admin]
  * Update User [Admin]
  * Delete User [Admin]
  * Get User Logged [User]
  * Update User Logged [User]
  * Change User Logged Password [User]
* Categories Service
  * Create New Category [Admin]
  * Get All Categories [Public]
  * Update Category [Admin]
  * Delete Category [Admin]
* SubCategories Service
  * Create New SubCategory [Admin]
  * Get All SubCategories [Public]
  * Update SubCategory [Admin]
  * Delete SubCategory [Admin]
* Brands Service
  * Create New Brand [Admin]
  * Get All Brands [Public]
  * Update Brand [Admin]
  * Delete Brand [Admin]
* Brands Service
  * Create New Brand [Admin]
  * Get All Brands [Public]
  * Update Brand [Admin]
  * Delete Brand [Admin]
* Products Service
  * Create New Product [Admin]
  * Get All Products [Public]
  * Update Product [Admin]
  * Delete Product [Admin]
* Review Services
  * Create New Review [User]
  * Get All Reviews [Public]
  * Get Review [Public]
  * Update Review [User]
  * Delete Review [User]
* wishlist Services
  * Get wishlist Products List [User]
  * Add Product to wishlist List [User]
  * Remove Product From wishlist List [User]
* Coupon Services
  * Create New Coupon [User]
  * Get Coupons [Admin]
  * Get Coupon  [User]
  * Update Coupon [Admin]
  * Update Coupon [Admin]
* Cart Services
  * Add Product To Cart [User]
  * Get Cart [User]
  * remove Product From Cart [User]
  * Increment Product In Cart [User]
  * Decrement Product In Cart [User]
  * Apply Coupon [User]
  * Clear Cart [User]
* Order Services
  * Create New Order [User]
  * Get Orders [User]
  * Get Order Using It's ID [User]
  * Update Order Paid [Admin]
  * Update Order Delivered [Admin]
* Payment Service 
  * Pay By Stripe [User]



<!-- CONTACT -->
## Contact

Email - [nassergamal2222@gmail.com]()

Facebook [NasserGamal](https://www.facebook.com/anaaym)

LinkedIn [NasserGamal](https://www.linkedin.com/in/nasser-gamal-2082b9243/)