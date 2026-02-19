import React, { useState, useEffect } from 'react';
import { getAllGalleryItems, createGalleryItem, deleteGalleryItem } from '../../lib/api';
import type { GalleryItem } from '@prisma/client';

export function AdminGallery() {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const [uploadForm, setUploadForm] = useState({
        imageUrl: '',
        caption: '',
        location: '',
        tags: '',
    });

    useEffect(() => {
        loadGallery();
    }, []);

    const loadGallery = async () => {
        try {
            const data = await getAllGalleryItems();
            setImages(data);
        } catch (error) {
            console.error('Failed to load gallery:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            const newImage = await createGalleryItem({
                imageUrl: uploadForm.imageUrl,
                caption: uploadForm.caption || undefined,
                location: uploadForm.location || undefined,
                tags: uploadForm.tags ? uploadForm.tags.split(',').map(t => t.trim()) : [],
            });

            setImages([newImage, ...images]);
            setUploadForm({ imageUrl: '', caption: '', location: '', tags: '' });
        } catch (error) {
            console.error('Failed to upload image:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        try {
            await deleteGalleryItem(id);
            setImages(images.filter(img => img.id !== id));
        } catch (error) {
            console.error('Failed to delete image:', error);
            alert('Failed to delete image');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="font-hand text-2xl text-brand-brown">Loading gallery...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-marker text-5xl text-brand-brown mb-2">
                    Manage Gallery
                </h1>
                <p className="font-hand text-xl text-brand-brown/70">
                    Upload and manage gallery images
                </p>
            </div>

            {/* Upload Form */}
            <div className="bg-brand-cream p-6 rounded-lg shadow-lg border-2 border-brand-brown/20 mb-8">
                <h2 className="font-marker text-3xl text-brand-brown mb-4">
                    Upload New Image
                </h2>
                <form onSubmit={handleUpload} className="space-y-4">
                    <div>
                        <label className="font-hand text-lg text-brand-brown block mb-2">
                            Image URL *
                        </label>
                        <input
                            type="url"
                            value={uploadForm.imageUrl}
                            onChange={(e) => setUploadForm({ ...uploadForm, imageUrl: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border-2 border-brand-brown/30 focus:border-brand-burgundy focus:outline-none font-hand text-lg"
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="font-hand text-lg text-brand-brown block mb-2">
                                Caption *
                            </label>
                            <input
                                type="text"
                                value={uploadForm.caption}
                                onChange={(e) => setUploadForm({ ...uploadForm, caption: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border-2 border-brand-brown/30 focus:border-brand-burgundy focus:outline-none font-hand text-lg"
                                placeholder="Image description"
                                required
                            />
                        </div>
                        <div>
                            <label className="font-hand text-lg text-brand-brown block mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                value={uploadForm.location}
                                onChange={(e) => setUploadForm({ ...uploadForm, location: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border-2 border-brand-brown/30 focus:border-brand-burgundy focus:outline-none font-hand text-lg"
                                placeholder="e.g., Nairobi"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="font-hand text-lg text-brand-brown block mb-2">
                            Tags (comma-separated)
                        </label>
                        <input
                            type="text"
                            value={uploadForm.tags}
                            onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border-2 border-brand-brown/30 focus:border-brand-burgundy focus:outline-none font-hand text-lg"
                            placeholder="Book Distribution, Reading Sessions"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={uploading}
                        className="font-hand text-xl bg-brand-burgundy text-brand-cream px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-brand-brown transition-all disabled:opacity-50"
                    >
                        {uploading ? 'Uploading...' : '📸 Upload Image'}
                    </button>
                </form>
            </div>

            {/* Gallery Grid */}
            {images.length === 0 ? (
                <div className="bg-brand-cream p-12 rounded-lg shadow-lg border-2 border-brand-brown/20 text-center">
                    <p className="font-hand text-2xl text-brand-brown">
                        No images yet. Upload your first one!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="bg-brand-cream rounded-lg shadow-lg border-2 border-brand-brown/20 overflow-hidden"
                        >
                            <img
                                src={image.imageUrl}
                                alt={image.caption || 'Gallery image'}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-hand text-lg text-brand-brown font-bold mb-2">
                                    {image.caption}
                                </h3>
                                {image.location && (
                                    <p className="font-hand text-sm text-brand-brown/70 mb-2">
                                        📍 {image.location}
                                    </p>
                                )}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {image.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-brand-orange/20 text-brand-brown px-2 py-1 rounded text-xs font-hand"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    onClick={() => handleDelete(image.id)}
                                    className="w-full font-hand text-sm bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-all"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
