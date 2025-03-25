import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    return (
        <section {...useBlockProps.save()} className="block--hero flex flex-col md:flex-row bg-gray-100">
            <div className="basis-1/2 md:p-25 content">
                <h2 className="text-3xl font-bold">{attributes.title}</h2>
                <p className="text-lg text-gray-700">{attributes.paragraph}</p>

                {/* Only Render Button if There is Text */}
                {attributes.buttonText && (
                    <a
                        href={attributes.buttonUrl || "#"}
                        className="btn-style-1"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {attributes.buttonText}
                    </a>
                )}
            </div>

            {/* Image Preview */}
            {attributes.imageUrl && (
                <div className="basis-1/2 image">
                    <img src={attributes.imageUrl} alt="Hero Image" className="object-cover" />
                </div>
            )}
        </section>
    );
};

export default Save;
