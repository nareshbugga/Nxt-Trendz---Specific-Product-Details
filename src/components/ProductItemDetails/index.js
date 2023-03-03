// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const viewsList = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {productDetails: {}, count: 1, listView: '', similarProductList: ''}

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    this.setState({listView: viewsList.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        description: data.description,
        brand: data.brand,
        availability: data.availability,
        price: data.price,
        rating: data.rating,
        totalReviews: data.total_reviews,
        similarProducts: data.similar_products,
      }
      const {similarProducts} = updatedData
      const updateSimilarProducts = similarProducts.map(eachProduct => ({
        id: eachProduct.id,
        title: eachProduct.title,
        imageUrl: eachProduct.image_url,
        rating: eachProduct.rating,
        brand: eachProduct.brand,
        price: eachProduct.price,
      }))
      console.log(updatedData)
      console.log(updateSimilarProducts)
      this.setState({
        productDetails: updatedData,
        listView: viewsList.success,
        similarProductList: updateSimilarProducts,
      })
    } else {
      this.setState({listView: viewsList.failure})
    }
  }

  onIncrease = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onDecrease = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    } else {
      this.setState({count: 1})
    }
  }

  onShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderNoProducts = () => (
    <div className="no-product-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="no-product-view"
      />
      <h1 className="no-product-heading">Product Not Found</h1>
      <button
        type="button"
        className="continue-shopping"
        onClick={this.onShopping}
      >
        Continue Shopping
      </button>
    </div>
  )

  renderProducts = () => {
    const {productDetails, count, similarProductList} = this.state
    const {
      imageUrl,
      title,
      price,
      rating,
      totalReviews,
      description,
      availability,
      brand,
    } = productDetails

    return (
      <>
        <div className="main-container">
          <div className="product-details-container">
            <div>
              <img src={imageUrl} alt="product" className="detail-image" />
            </div>
            <div>
              <h1 className="product-detail-heading">{title}</h1>
              <p className="product-detail-price">Rs {price}/-</p>
              <div className="product-review-container">
                <div className="product-rating-container">
                  <p className="product-rating">{rating}</p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                    className="product-star"
                  />
                </div>
                <p className="review">{totalReviews} Reviews</p>
              </div>
              <p className="description">{description}</p>
              <div className="product-review-container">
                <p className="available">Available:</p>
                <p className="span-element">{availability}</p>
              </div>
              <div className="product-review-container">
                <p className="available">Brand:</p>
                <p className="span-element">{brand}</p>
              </div>
              <hr />
              <div className="icons-container">
                <button
                  type="button"
                  onClick={this.onDecrease}
                  className="button-icon"
                  data-testid="minus"
                >
                  <BsDashSquare className="icons-style" />
                </button>

                <p className="count">{count}</p>
                <button
                  type="button"
                  onClick={this.onIncrease}
                  className="button-icon"
                  data-testid="plus"
                >
                  <BsPlusSquare className="icons-style" />
                </button>
              </div>
              <button type="button" className="add-to-cart">
                ADD TO CART
              </button>
            </div>
          </div>
          <div>
            <h1 className="similar-product-detail-heading">Similar Products</h1>
            <ul className="unOrder-list-product">
              {similarProductList.map(eachProduct => (
                <SimilarProductItem
                  eachProduct={eachProduct}
                  key={eachProduct.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  loadingRender = () => (
    <div data-testid="loader" className="no-product-container">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  ResultView = () => {
    const {listView} = this.state
    switch (listView) {
      case viewsList.success:
        return this.renderProducts()
      case viewsList.failure:
        return this.renderNoProducts()
      case viewsList.inProgress:
        return this.loadingRender()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.ResultView()}
      </>
    )
  }
}

export default ProductItemDetails
