import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

const Edit = ({ attributes, setAttributes }) => {
    const { numProducts } = attributes;

    // Fetch featured products from WooCommerce
    const products = useSelect((select) => {
        const query = { featured: true, per_page: numProducts };
        return select('core').getEntityRecords('postType', 'product', query);
    }, [numProducts]);

    return (
        <div {...useBlockProps()}>
            {/* Sidebar Settings */}
            <InspectorControls>
                <PanelBody title="Settings">
                    <RangeControl
                        label="Number of Products"
                        value={numProducts}
                        onChange={(value) => setAttributes({ numProducts: value })}
                        min={1}
                        max={12}
                    />
                </PanelBody>
            </InspectorControls>

            <div className="wc-featured-products grid grid-cols-2 gap-4">
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="product-card bg-white p-4 shadow rounded">
                            <img src={product.images[0]?.src} alt={product.name} className="w-full h-40 object-cover" />
                            <h3 className="text-lg font-bold mt-2">{product.name}</h3>
                            <p className="text-green-600 font-bold">{product.price_html}</p>
                            <a href={product.permalink} className="block bg-blue-500 text-white px-4 py-2 mt-2 rounded text-center">
                                View Product
                            </a>
                        </div>
                    ))
                ) : (
                    <p>No featured products found.</p>
                )}
            </div>
        </div>
    );
};

export default Edit;
