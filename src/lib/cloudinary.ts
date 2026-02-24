/**
 * Centralized utility for Cloudinary image uploads
 */

interface CloudinaryUploadResponse {
    secure_url: string;
    public_id: string;
    [key: string]: any;
}

let cachedCloudName: string | null = null;

export const uploadToCloudinary = async (file: File): Promise<string> => {
    let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || cachedCloudName;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName) {
        try {
            const res = await fetch('/api/config/cloudinary');
            const data = await res.json();
            cloudName = data.cloudName;
            cachedCloudName = cloudName;
        } catch (err) {
            console.error('[Cloudinary] Failed to fetch config:', err);
        }
    }

    if (!cloudName || !uploadPreset) {
        throw new Error('Cloudinary configuration missing. Please check your environment variables.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Cloudinary upload failed');
        }

        const data: CloudinaryUploadResponse = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('[Cloudinary] Upload error:', error);
        throw error;
    }
};
