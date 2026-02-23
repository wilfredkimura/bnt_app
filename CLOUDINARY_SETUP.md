# Cloudinary Image Upload Guide

This guide outlines how to integrate Cloudinary for profile pictures and gallery uploads.

## 1. Cloudinary Setup
1. Create a free account at [Cloudinary.com](https://cloudinary.com).
2. Go to Settings > Upload > Upload Presets and create an **unsigned** preset (e.g., `bnt_unsigned`).

## 2. Frontend Implementation
Use the Cloudinary Upload Widget or direct API calls.
Example using `fetch`:

```ts
const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'bnt_unsigned');

  const response = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  return data.secure_url;
}
```

## 3. Update Profile & Stories
- Update `Profile.tsx` to include a file input.
- Call `uploadImage` and save the resulting URL to the `photoUrl` field in the database.
