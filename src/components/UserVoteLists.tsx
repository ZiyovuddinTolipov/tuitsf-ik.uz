import { FaUserClock } from "react-icons/fa";
import { Link } from 'react-router-dom'

const UserVoteLists = () => {
    return (
        <div className="text-primary-200 results">
            <h2 className="text-3xl font-semibold text-primary-200 text-center">Lavozimlarga tayinlov.</h2>
            <ul className="results_list">
                <Link to='results' data-aos="flip-down"><FaUserClock /> Paxtachi lavozimiga</Link>
                <Link to='results' data-aos="flip-up"><FaUserClock /> Dekan lavozimiga</Link>
            </ul>
        </div>
    )
}

export default UserVoteLists