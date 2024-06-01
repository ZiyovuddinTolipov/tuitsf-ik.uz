import React, { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import ApiService from "../api/ApiService";
import toast from "react-hot-toast";

interface DocInterfaces {
    file: string;
    description: string;
    id: number;
}

const AllDocs: React.FC = () => {
    const [documents, setDocuments] = useState<DocInterfaces[]>([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response: DocInterfaces[] = await ApiService.GetAllFiles();
                setDocuments(response);
            } catch (error) {
                console.error("Failed to fetch documents:", error);
            }
        };
        fetchDocuments();
    }, []);

    const handleDownload = (url: string) => {
        if (url) {
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = url;
            anchor.click();
        } else {
            toast.error('Hujjat topilmadi!');
        }
    };
    const handleDeletedFile = async (id: number) => {
        const confirmed = window.confirm("O'chirishni tasdiqlang");
        if (confirmed) {
            try {
                const response = await ApiService.DeleteFile(id);
                if (response.status === 200) {
                    toast.success("Hujjat o'chirildi!");
                    window.location.reload();
                }
                // console.log(response);
            } catch (error) {
                toast.error("Hujjat o'chirishda xatolik yuz berdi!");
                console.error("Failed to fetch documents:", error);
            }
        }
    }

    return (
        <div className="text-primary-200 results">
            <h2 className="text-3xl font-semibold text-primary-200 text-center">Hujjatlarni yuklab olish</h2>
            <ol className="results_list">
                {documents.map((doc: DocInterfaces, index: number) => (
                    <li key={index} data-aos="flip-down" className="flex justify-between">
                        <span>{doc.description}</span>
                        <div >
                            <button className="btn btn-error text-primary-50 mr-5" onClick={() => doc.file && handleDeletedFile(doc.id)}>
                                <MdDelete /> {doc.id}
                            </button>
                            <button className="btn btn-primary text-primary-50" onClick={() => doc.file && handleDownload(doc.file)}>
                                <FiDownload /> Yuklab olish
                            </button>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default AllDocs;