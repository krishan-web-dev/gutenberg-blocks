import { useBlockProps, RichText, MediaUpload, BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
    return (
        <div {...useBlockProps({ className: "block--hero-backend bg-gray-100 p-6 rounded-lg shadow-lg" })}>
            {/* Block Toolbar with Only "Link" and "Unlink" */}
            <BlockControls>
                <ToolbarGroup>
                    {/* Add Link (Text Button) */}
                    <ToolbarButton
                        label="Link"
                        onClick={() => {
                            const newUrl = prompt("Enter button link:", attributes.buttonUrl || "https://");
                            if (newUrl !== null) {
                                setAttributes({ buttonUrl: newUrl });
                            }
                        }}
                    >
                        Link
                    </ToolbarButton>

                    {/* Remove Link (Text Button) */}
                    {attributes.buttonUrl && (
                        <ToolbarButton
                            label="Unlink"
                            onClick={() => setAttributes({ buttonUrl: "" })}
                        >
                            Unlink
                        </ToolbarButton>
                    )}
                </ToolbarGroup>
            </BlockControls>

            <div className="flex flex-col md:flex-row bg-gray-100">
                <div className="basis-1/2 content">
                    <RichText
                        tagName="h2"
                        className="text-2xl font-bold"
                        value={attributes.title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder="Enter Title"
                        allowedFormats={[]}  // ✅ Disables extra formatting like Bold, Italic
                    />

                    <RichText
                        tagName="p"
                        className="text-gray-700"
                        value={attributes.paragraph}
                        onChange={(value) => setAttributes({ paragraph: value })}
                        placeholder="Enter Description"
                        allowedFormats={[]}  // ✅ Disables extra formatting
                    />                    

                    {/* Button in Editor (Using a Div) */}
                    <div className="btn-style-1">
                        <RichText
                            tagName="span"
                            value={attributes.buttonText}
                            onChange={(value) => setAttributes({ buttonText: value })}
                            placeholder="Shop"
                            keepPlaceholderOnFocus
                            allowedFormats={[]}  // ✅ Disables extra formatting
                        />
                    </div>
                </div>

                {/* Image Preview */}
                {attributes.imageUrl && (
                    <div className="basis-1/2 image">
                        <img src={attributes.imageUrl} alt="Hero Image" className="object-cover" />

                        <MediaUpload
                        onSelect={(media) => setAttributes({ imageUrl: media.url })}
                        allowedTypes={['image']}
                        render={({ open }) => (
                            <button onClick={open} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
                                Upload Image
                            </button>
                        )}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Edit;
