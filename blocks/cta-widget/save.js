import { useBlockProps, RichText } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    const { title, paragraph, bgImage, buttonText, buttonUrl } = attributes;

    return (
        <section {...useBlockProps.save()} className="block__cta">
        <div className="container mx-auto">
            <div className="flex flex-col md:flex-row">
                
                {/* Left Column: Background Image */}
                <div
                    className="basis-1/2 bg-cover bg-no-repeat bg-center"
                    style={{ minHeight: '400px', backgroundImage: bgImage ? `url(${bgImage})` : "none" }}
                >
                </div>

                {/* Right Column: Content */}
                <div className="basis-1/2 content">
                    
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p className="text-lg text-gray-700">{paragraph}</p>
                    
                    {/* Button */}
                    {buttonText && (
                        <a
                            href={buttonUrl || "#"}
                            className="btn-style-1"
                        >
                            <span>{buttonText}</span>
                            <svg className="ml-2 w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    )}
                    
                </div>
                
            </div>
            </div>
        </section>
    );
};

export default Save;
