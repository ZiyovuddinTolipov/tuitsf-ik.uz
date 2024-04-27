import { FiDownload } from "react-icons/fi";

const AllDocs = () => {
    return (
        <div className="text-primary-200 results">
        <h2 className="text-3xl font-semibold text-primary-200 text-center">Hujjatlarni yuklab olish</h2>
        <ol className="results_list" >
            <li  data-aos="flip-down" className=" flex justify-between"><span>1-saylovching hujjatlari.</span> <button className="btn btn-primary text-primary-50"><FiDownload /> Yuklab olish</button></li>
            <li  data-aos="flip-down" className=" flex justify-between"><span>Saylov Nizomi</span> <button className="btn btn-primary text-primary-50"><FiDownload /> Yuklab olish</button></li>
            <li  data-aos="flip-up"className=" flex justify-between"><span>Barcha hujjatlar</span> <button className="btn btn-primary text-primary-50"><FiDownload /> Yuklab olish</button></li>
            <li  data-aos="flip-up"className=" flex justify-between"><span>Sh.Mirziyoyev</span> <button className="btn btn-primary text-primary-50"><FiDownload /> Yuklab olish</button></li>
        </ol>
    </div>
    )
}

export default AllDocs