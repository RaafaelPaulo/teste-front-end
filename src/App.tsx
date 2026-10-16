
import { useEffect, useState } from 'react'
import './App.scss'

type Product = {
  productName: string
  descriptionShort: string
  photo: string
  price: number
}

type ProductsResponse = {
  success: boolean
  products: Product[]
}
const PRODUCTS_URL = '/api/produtos'

const formatPrice = (price: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(PRODUCTS_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Não foi possível carregar os produtos.')
        }

        return response.json() as Promise<ProductsResponse>
      })
      .then((data) => {
        if (!data.success) {
          throw new Error('A lista de produtos não está disponível.')
        }

        setProducts(data.products)
      })
      .catch(() => {
        setError('Não conseguimos carregar os produtos. Tente novamente.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <main className="store">
      <header className="store-header">
        <p className="store-brand">ECONVERSE</p>
<h1>Vitrine de produtos</h1>
        <p className="store-description">
          Confira nossos produtos e encontre o que procura.
        </p>
      </header>

      <section className="products-section" aria-labelledby="products-title">
        <h2 id="products-title">Nossos produtos</h2>

        {loading && <p>Carregando produtos...</p>}

        {!loading && error && <p role="alert">{error}</p>}

        {!loading && !error && (
          <div className="products-grid">
            {products.map((product, index) => (
              <button
                className="product-card"
                key={`${product.productName}-${index}`}
                type="button"
                onClick={() => setSelectedProduct(product)}
                aria-label={`Ver detalhes de ${product.productName}`}
              >
                <img
                  className="product-image"
                  src={product.photo}
                  alt={product.productName}
                />

                <span className="product-name">{product.productName}</span>

                <span className="product-description">
                  {product.descriptionShort}
                </span>

                <span className="product-price">
                  {formatPrice(product.price)}
                </span>

                <span className="product-card-link">Ver detalhes</span>
              </button>
            ))}
          </div>
        )}
      </section>

      {selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <section
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setSelectedProduct(null)}
              aria-label="Fechar detalhes"
            >
              ×
            </button>

            <img
              className="modal-image"
              src={selectedProduct.photo}
              alt={selectedProduct.productName}
            />

            <h2 id="modal-title">{selectedProduct.productName}</h2>

            <p>{selectedProduct.descriptionShort}</p>

            <p className="product-price">
              {formatPrice(selectedProduct.price)}
            </p>
          </section>
        </div>
      )}
    </main>
  )
}

export default App
