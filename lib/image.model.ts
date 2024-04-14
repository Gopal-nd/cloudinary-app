import mongoose, { Model, Document } from "mongoose";

// Define the schema
const Schema = new mongoose.Schema({
    image_url: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Define the interface for the document
interface ImageDocument extends Document {
    image_url: string;
    public_id: string;
}

// Define the model type
type ImageModelType = Model<ImageDocument>;

// Define the ImageGallaryModel variable with the correct type
let ImageGallaryModel: ImageModelType;

try {
    // Attempt to retrieve the model from Mongoose's model registry
    // If the model already exists, use it
    ImageGallaryModel = mongoose.model<ImageDocument, ImageModelType>("images");
} catch (error) {
    // If the model doesn't exist, define it
    ImageGallaryModel = mongoose.model<ImageDocument, ImageModelType>("images", Schema);
}

// Export the model
export { ImageGallaryModel };
