import { useBlockProps, RichText } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { Spinner } from "@wordpress/components";

const Edit = (props) => {
  const { attributes, setAttributes } = props;
  const { title, numProducts } = attributes;
  const blockProps = useBlockProps();

  // Fetch products
  const { products, isLoading } = useSelect(
    (select) => {
      const { getEntityRecords } = select("core");
      const query = {
        per_page: numProducts,
        featured: true,
        _embed: true, // Include featured media
      };

      return {
        products: getEntityRecords("postType", "product", query),
        isLoading: !select("core").hasFinishedResolution("getEntityRecords", [
          "postType",
          "product",
          query,
        ]),
      };
    },
    [numProducts]
  );

  const handleTitleChange = (newTitle) => {
    setAttributes({ title: newTitle });
  };

  return (
    <section {...blockProps}>
      <RichText
        tagName="h3"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter a title"
      />

      {isLoading ? (
        <Spinner />
      ) : products?.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <figure>
                {product._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                  <img
                    src={product._embedded["wp:featuredmedia"][0].source_url}
                    alt={product.title.rendered}
                    width="100"
                  />
                )}
              </figure>
              <p dangerouslySetInnerHTML={{ __html: product.title.rendered }} />
              <a href={product.link} target="_blank" rel="noopener noreferrer">
                View Product
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </section>
  );
};

export default Edit;
