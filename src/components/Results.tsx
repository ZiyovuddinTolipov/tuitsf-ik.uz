import { FaUserCheck ,FaUserClock } from "react-icons/fa";
const Results = () => {
    return (
        <div className="text-primary-200 results">
            <h2 className="text-3xl font-semibold text-primary-200 text-center">Lavozimlarga tayinlov.</h2>
            <ul className="results_list">
                <li  data-aos="flip-down"><FaUserCheck />Direktor Lavozimiga</li>
                <li  data-aos="flip-down"><FaUserClock /> Paxtachi lavozimiga</li>
                <li  data-aos="flip-up"><FaUserClock /> Dekan lavozimiga</li>
                <li  data-aos="flip-up"><FaUserCheck /> Ilmiy kafedra boshlig'i lavozimiga</li>
            </ul>
        </div>
    )
}

export default Results