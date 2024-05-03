import React, { useRef } from 'react';
import ApiService from '../api/ApiService';
import {toast} from 'react-hot-toast';

const AddNewDoc: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null);

    // Ma'lumotlarni yuborish funksiyasi
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Formdagi ma'lumotlarni olish
        const formData = new FormData(event.currentTarget);
        const file = formData.get('file') as File;
        const description = formData.get('description') as string;

        try {
            const res= await ApiService.AddFile(file, description);
            console.log(res);
            toast.success("Hujjat qo'shildi!");
            if (formRef.current) {
                formRef.current.reset();
            }
        } catch (error) {
            toast.error("Hujjat qo'shishda xatolik");
            // console.error("Failed to add file:", error);
        }
    };

    return (
        <form ref={formRef} className="flex flex-col items-start justify-start text-left" onSubmit={handleSubmit}>
            <label htmlFor='file' className="text-primary-200 my-2 ">Hujjatni tanlang</label>
            <input id="file" name="file" type="file" className="file-input bg-transparent file-input-bordered file-input-primary w-full max-w-xs" accept="application/msword,application/vnd.ms-powerpoint,application/pdf" required/>
            <h2 className="text-primary-200 my-2 ">Hujjat haqida izoh</h2>
            <input name="description" type="text" placeholder="izoh yozish uchun" className="input input-bordered input-primary w-full max-w-xs bg-primary-50 text-primary-300" required/>
            <button className="btn btn-primary block max-w-xs w-full my-3" type="submit">Saqlash</button>
        </form>
    );
}

export default AddNewDoc;
