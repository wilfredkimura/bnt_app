import React, { useState, useEffect, useRef } from 'react';
import { getAllGalleryItems, createGalleryItem, deleteGalleryItem, updateGalleryItem } from '../../lib/api';
import type { GalleryItem } from '@prisma/client';
import { uploadToCloudinary } from '../../lib/cloudinary';

export function AdminGallery() {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [fileToUpload, setFileToUpload] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFileToUpload(e.target.files[0]);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            let finalImageUrl = uploadForm.imageUrl;

            if (fileToUpload) {
                finalImageUrl = await uploadToCloudinary(fileToUpload);
            }

            if (!finalImageUrl) {
                alert('Please provide an image URL or choose a file to upload.');
                setUploading(false);
                return;
            }

            const newImage = await createGalleryItem({
                imageUrl: finalImageUrl,
                caption: uploadForm.caption || undefined,
                location: uploadForm.location || undefined,
                tags: uploadForm.tags ? uploadForm.tags.split(',').map(t => t.trim()) : [],
            });

            setImages([newImage, ...images]);
            setUploadForm({ imageUrl: '', caption: '', location: '', tags: '' });
            setFileToUpload(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (error) {
            console.error('Failed to upload image:', error);
            alert('Failed to upload image. Please check your Cloudinary configuration.');
        } finally {
            setUploading(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingItem) return;

        setUploading(true);
        try {
            const updated = await updateGalleryItem(editingItem.id, {
                caption: editingItem.caption,
                location: editingItem.location,
                tags: typeof editingItem.tags === 'string'
                    ? (editingItem.tags as string).split(',').map(t => t.trim())
                    : editingItem.tags,
            });

            setImages(images.map(img => img.id === updated.id ? updated : img));
            setEditingItem(null);
        } catch (error) {
            console.error('Failed to update image:', error);
            alert('Failed to update image');
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

            {/* Edit Modal / Form Backdrop */}
            {editingItem && (
                <div className="fixed inset-0 bg-brand-brown/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-brand-cream w-full max-w-lg rounded-3xl border-4 border-brand-brown shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-brand-burgundy p-4 flex justify-between items-center text-brand-cream font-marker text-2xl">
                            <span>✏️ Edit Image Info</span>
                            <button onClick={() => setEditingItem(null)} className="hover:scale-110 transition-transform">✕</button>
                        </div>
                        <form onSubmit={handleUpdate} className="p-6 space-y-4">
                            <div className="aspect-video rounded-xl overflow-hidden border-2 border-brand-brown/20 mb-4">
                                <img src={editingItem.imageUrl} alt="Edit preview" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <label className="font-hand text-lg text-brand-brown block mb-1">Caption *</label>
                                <input
                                    type="text"
                                    value={editingItem.caption || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border-2 border-brand-brown/20 font-hand text-lg focus:border-brand-burgundy outline-none"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="font-hand text-lg text-brand-brown block mb-1">Location</label>
                                    <input
                                        type="text"
                                        value={editingItem.location || ''}
                                        onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border-2 border-brand-brown/20 font-hand text-lg focus:border-brand-burgundy outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="font-hand text-lg text-brand-brown block mb-1">Tags (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={Array.isArray(editingItem.tags) ? editingItem.tags.join(', ') : editingItem.tags}
                                        onChange={(e) => setEditingItem({ ...editingItem, tags: e.target.value as any })}
                                        className="w-full px-4 py-2 rounded-lg border-2 border-brand-brown/20 font-hand text-lg focus:border-brand-burgundy outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="flex-1 bg-brand-burgundy text-brand-cream py-3 rounded-xl font-marker text-xl shadow-lg hover:bg-brand-brown transition-all disabled:opacity-50"
                                >
                                    {uploading ? 'Saving...' : '💾 Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingItem(null)}
                                    className="px-6 py-3 border-2 border-brand-brown/20 text-brand-brown rounded-xl font-hand text-xl hover:bg-brand-brown/5 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Upload Form */}
            <div className="bg-brand-cream p-6 rounded-lg shadow-lg border-2 border-brand-brown/20 mb-8">
                <h2 className="font-marker text-3xl text-brand-brown mb-4">
                    Upload New Image
                </h2>
                <form onSubmit={handleUpload} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="font-hand text-lg text-brand-brown block mb-2">
                                Image URL
                            </label>
                            <input
                                type="url"
                                value={uploadForm.imageUrl}
                                onChange={(e) => setUploadForm({ ...uploadForm, imageUrl: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border-2 border-brand-brown/30 focus:border-brand-burgundy focus:outline-none font-hand text-lg bg-white/50"
                                placeholder="https://example.com/image.jpg"
                                disabled={!!fileToUpload}
                            />
                        </div>
                        <div>
                            <label className="font-hand text-lg text-brand-brown block mb-2">
                                Or Upload File
                            </label>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="w-full px-4 py-2 rounded-lg border-2 border-brand-brown/30 focus:border-brand-burgundy focus:outline-none font-hand text-lg bg-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-marker file:bg-brand-orange/20 file:text-brand-brown hover:file:bg-brand-orange/30"
                            />
                        </div>
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
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setEditingItem(image)}
                                        className="font-hand text-sm bg-brand-brown text-brand-cream px-3 py-2 rounded hover:bg-brand-burgundy transition-all"
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(image.id)}
                                        className="font-hand text-sm bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-all"
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
