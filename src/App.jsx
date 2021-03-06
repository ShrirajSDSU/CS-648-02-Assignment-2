let productArray = []

const ProductTable = ({ products }) => {
  return (
    <div>
      <h1>My Company Inventory</h1>
      <p>Showing all available products</p>
      <hr />
      <table>
        <thead>
          <tr>
            <th className="table-col">Product Name</th>
            <th className="table-col">Price</th>
            <th className="table-col">Category</th>
            <th className="table-col">Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return <ProductRow product={product} index={index} key={product.id} />
          })}
        </tbody>
      </table>
    </div>
  )
}

const ProductRow = ({ index, product }) => {
  return (
    <tr key={index}>
      <th className="table-col">{product.name}</th>
      <th className="table-col">${product.price}</th>
      <th className="table-col">{product.category}</th>
      <th className="table-col">
        <a href={product.image} target="_blank">
          View
        </a>
      </th>
    </tr>
  )
}

class ProductAdd extends React.Component {
  constructor() {
    super()
    this.state = { price: '$' }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const form = document.forms.productAdd

    let priceNum = form.price.value.replace(/\$/g, '')
    const product = {
      name: form.name.value,
      price: priceNum,
      category: form.category.value,
      image: form.imageurl.value
    }

    this.props.createProduct(product)
    form.name.value = ''
    form.price.value = ''
    form.category.value = ''
    form.imageurl.value = ''
  }

  handlePriceChange() {
    this.setState({ price: document.forms.productAdd.price.value })
  }

  render() {
    return (
      <div>
        <p>Add a new product to Inventory</p>
        <hr />
        <form name="productAdd" onSubmit={this.handleSubmit}>
          <div className="formContainer">
            <div className="formCol">
              Category <br />
              <select name="category">
                <option value=""></option>
                <option value="Shirts">Shirts</option>
                <option value="Jeans">Jeans</option>
                <option value="Jackets"> Jackets</option>
                <option value="Sweaters">Sweaters </option>
                <option value="Accessories">Accessories</option>
              </select>
              <br />
              Product Name <br />
              <input type="text" name="name" />
              <br />
            </div>
            <div className="formCol">
              Price Per Unit <br />
              <input type="text" name="price" value={this.state.price} onChange={this.handlePriceChange} />
              <br />
              Image URL <br />
              <input type="text" name="imageurl" />
              <br />
            </div>
          </div>
          <input type="submit" value="Add Product" className="submitButton" />
        </form>
      </div>
    )
  }
}

class ProductList extends React.Component {
  constructor() {
    super()
    this.state = { products: [] }
    this.createProduct = this.createProduct.bind(this)
  }

  componentDidMount() {
    this.setState({ products: productArray })
  }

  createProduct(product) {
    product.id = this.state.products.length + 1
    const newProductList = this.state.products.slice()

    newProductList.push(product)
    this.setState({ products: newProductList })
  }

  render() {
    return (
      <div style={{ color: 'black' }}>
        <ProductTable products={this.state.products} />
        <ProductAdd createProduct={this.createProduct} />
      </div>
    )
  }
}

const element = <ProductList />

ReactDOM.render(element, document.getElementById('contents'))
