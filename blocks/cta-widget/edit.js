import { useBlockProps, RichText, MediaUpload, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, ToolbarButton, ToolbarGroup } from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
    const { title, paragraph, bgImage, buttonText, buttonUrl } = attributes;

    return (
        <div {...useBlockProps()}>
            {/* Toolbar for Adding/Removing Links */}
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        label="Add Link"
                        onClick={() => {
                            const newUrl = prompt("Enter button link:", buttonUrl || "https://");
                            if (newUrl !== null) {
                                setAttributes({ buttonUrl: newUrl });
                            }
                        }}
                    >
                        Link
                    </ToolbarButton>

                    {buttonUrl && (
                        <ToolbarButton
                            label="Remove Link"
                            onClick={() => setAttributes({ buttonUrl: "" })}
                        >
                            Unlink
                        </ToolbarButton>
                    )}
                </ToolbarGroup>
            </BlockControls>

            {/* Sidebar Settings */}
            <InspectorControls>
                <PanelBody title="Background Image">
                    <MediaUpload
                        onSelect={(media) => setAttributes({ bgImage: media.url })}
                        allowedTypes={['image']}
                        render={({ open }) => (
                            <Button onClick={open} variant="primary">
                                {bgImage ? "Change Background Image" : "Upload Background Image"}
                            </Button>
                        )}
                    />
                </PanelBody>
                <PanelBody title="Button Settings">
                    <TextControl
                        label="Button Text"
                        value={buttonText}
                        onChange={(value) => setAttributes({ buttonText: value })}
                        placeholder="Enter button text"
                    />
                </PanelBody>
            </InspectorControls>

            {/* CTA Layout */}
            <div className="block md:flex">
                
                {/* Left Column: Background Image */}
                <div
                    className="flex-1 bg-cover bg-no-repeat bg-center"
                    style={{ minHeight: '400px', backgroundImage: bgImage ? `url(${bgImage})` : "none" }}
                >
                </div>

                {/* Right Column: Content */}
                <div className="flex-1 flex justify-center items-center bg-white p-10 md:p-0">
                    <div className="text-center md:text-left w-full md:w-5/6">
                        <RichText
                            tagName="h2"
                            className="font-serif text-2xl md:text-3xl"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder="Enter Title"
                        />
                        <RichText
                            tagName="p"
                            className="text-gray-700"
                            value={paragraph}
                            onChange={(value) => setAttributes({ paragraph: value })}
                            placeholder="Enter Description"
                        />
                        
                        {/* Button */}
                        {buttonText && (
                            <a
                                href={buttonUrl || "#"}
                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-bold hover:text-white py-2 px-4 my-4 border border-blue-500 rounded inline-flex items-center"
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
        </div>
    );
};

export default Edit;
