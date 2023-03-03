// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {eachProduct} = props
  const {imageUrl, title, brand, price, rating} = eachProduct
  return (
    <li className="similar-product-list">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similar-product-image"
      />
      <h1 className="similar-product-heading">{title}</h1>
      <p className="similar-product-brand">by {brand}</p>
      <div className="product-price-container">
        <p className="price-value">Rs {price}/-</p>
        <div className="similar-product-rating-container">
          <p className="similar-product-rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="similar-product-star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
