import React, { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import ApiService, { Document } from "../api/ApiService";
import toast from "react-hot-toast";

const AllDocs: React.FC = () => {
    const [documents, setDocuments] = useState<Document>([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await ApiService.GetAllFiles();
                console.log(response);
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

    return (
        <div className="text-primary-200 results">
            <h2 className="text-3xl font-semibold text-primary-200 text-center">Hujjatlarni yuklab olish</h2>
            <ol className="results_list">
                {documents.map((doc: Document, index: number) => (
                    <li key={index} data-aos="flip-down" className="flex justify-between">
                        <span>{doc.description}</span>
                        <button className="btn btn-primary text-primary-50" onClick={() => doc.file && handleDownload(doc.file)}>
                            <FiDownload /> Yuklab olish
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default AllDocs;
