
const Results = () => {
    return (
        <div className="text-primary-200 results">
            <h2 className="text-3xl font-semibold text-primary-200 text-center">Lavozimlarga tayinlov.</h2>
            <ul className="results_list">
                <li  data-aos="flip-down" className=" flex justify-between"><span>Muhammadali Aliksey</span> <span>12</span></li>
                <li  data-aos="flip-down" className=" flex justify-between"><span>Aliksey Aliksey 2</span> <span>11</span></li>
                <li  data-aos="flip-up"className=" flex justify-between"><span>Abdurashid Ummarov</span> <span>11</span></li>
                <li  data-aos="flip-up"className=" flex justify-between"><span>Aliksey Tolik 2</span> <span>11</span></li>
            </ul>
        </div>
    )
}

export default Results;