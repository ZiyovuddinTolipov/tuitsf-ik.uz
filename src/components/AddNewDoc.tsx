import React from 'react';

// AddNewDoc komponentini TypeScriptga moslashtirish
const AddNewDoc: React.FC = () => {
    // Ma'lumotlarni yuborish funksiyasi
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Formdagi ma'lumotlarni olish
        const formData = new FormData(event.target as HTMLFormElement);
        // FormData obyektini obyekt ko'rinishida chiqarish
        console.log(Object.fromEntries(formData.entries()));
    };

    return (
        <form className="flex flex-col items-start justify-start text-left" onSubmit={handleSubmit}>
            {/* Label for file input */}
            <label htmlFor='file' className="text-primary-200 my-2 ">Hujjatni tanlang</label>
            {/* File input */}
            <input id="file" name="file" type="file" className="file-input bg-transparent file-input-bordered file-input-primary w-full max-w-xs" accept="application/msword,application/vnd.ms-powerpoint,application/pdf" />
            {/* Description input */}
            <h2 className="text-primary-200 my-2 ">Hujjat haqida izoh</h2>
            <input name="description" type="text" placeholder="izoh yozish uchun" className="input input-bordered input-primary w-full max-w-xs bg-primary-50 text-primary-300" />
            {/* Submit button */}
            <button className="btn btn-primary block max-w-xs w-full my-3" type="submit">Saqlash</button>
        </form>
    );
}

export default AddNewDoc;
