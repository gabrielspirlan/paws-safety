"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Imagem } from "@/types/imagem";

type ImageUploadWithDeleteProps = {
    initialImages: Imagem[];
    onUpload: (files: File[]) => void;
    onDelete: (imageIds: string[]) => void;
};

export const ImageUploadWithDelete = ({
    initialImages,
    onUpload,
    onDelete,
}: ImageUploadWithDeleteProps) => {
    const [previewImages, setPreviewImages] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<Imagem[]>([...initialImages]);
    const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

    const handleFileUpload = (files: FileList | null) => {
        if (!files) return;
        const newFiles = Array.from(files).slice(0, 5 - (existingImages.length + previewImages.length));
        setPreviewImages((prev) => [...prev, ...newFiles]);
        onUpload(newFiles);
    };

    const removePreviewImage = (index: number) => {
        if (existingImages.length + previewImages.length === 1) {
            alert("É necessário ter ao menos uma imagem.");
            return;
        }
        setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    };

    const markImageForDeletion = (id: string) => {
        if (existingImages.length + previewImages.length === 1) {
            alert("É necessário ter ao menos uma imagem.");
            return;
        }
        setImagesToDelete((prev) => [...prev, id]);
        setExistingImages((prev) => prev.filter((image) => image.id !== id));
        onDelete([...imagesToDelete, id]);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <label className="w-full flex items-center justify-center aspect-square bg-sand-300 rounded-lg cursor-pointer text-sand-600 hover:bg-sand-400 transition-all border-2 border-dashed border-sand-600">
                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileUpload(e.target.files)}
                />
                <FontAwesomeIcon icon={faCloudUploadAlt} className="text-5xl" />
            </label>

            <div className="w-full mt-4 grid grid-cols-5 gap-2">
                {existingImages.map((image) => (
                    <div key={image.id} className="relative aspect-square">
                        <img
                            src={image.src}
                            alt="Imagem cadastrada"
                            className="w-full object-cover aspect-square rounded-md"
                        />
                        <FontAwesomeIcon
                            icon={faTimesCircle}
                            className="absolute -top-2 -right-2 text-red-600 text-lg cursor-pointer"
                            onClick={() => markImageForDeletion(image.id)}
                        />
                    </div>
                ))}
                {previewImages.map((file, index) => (
                    <div key={index} className="relative aspect-square">
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            className="w-full object-cover aspect-square rounded-md"
                        />
                        <FontAwesomeIcon
                            icon={faTimesCircle}
                            className="absolute -top-2 -right-2 text-red-600 text-lg cursor-pointer"
                            onClick={() => removePreviewImage(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
