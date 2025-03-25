import { useBlockProps } from '@wordpress/block-editor';

const Save = () => {
    return (
        <div {...useBlockProps()}>
            <p>WooCommerce Featured Products will be displayed here.</p>
        </div>
    );
};

export default Save;
