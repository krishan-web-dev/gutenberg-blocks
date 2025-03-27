import { useBlockProps } from "@wordpress/block-editor";

const Save = (props) => {
  const { attributes } = props;
  const { title, products } = attributes;

  // If products are not available, show a fallback (empty content or a default message)
  if (!products || products.length === 0) {
    return (
      <section className="wp-block-hmdecor-featured-products">
        <h3>{title || "Featured Products"}</h3>
        <p>No products found.</p>
      </section>
    );
  }

  return (
    <section className="wp-block-hmdecor-featured-products">
      <h3>{title || "Featured Products"}</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <figure>
              <img src={product.image} alt={product.title} width="100" />
            </figure>
            <p>{product.title}</p>
            <a href={product.url} target="_blank" rel="noopener noreferrer">
              View Product
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Save;
