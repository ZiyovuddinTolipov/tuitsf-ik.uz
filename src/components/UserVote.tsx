
const Results = () => {
    return (
        <div className="text-primary-200 results">
            <h2 className="text-3xl font-semibold text-primary-200 text-center">Lavozimlarga tayinlov.</h2>
            <ul className="results_list">
                <li data-aos="flip-down" >Muhammadali Aliksey </li>
                <li data-aos="flip-down" >Aliksey Aliksey 2</li>
                <li data-aos="flip-up" >Abdurashid Ummarov</li>
                <li data-aos="flip-up" >Aliksey Tolik 2</li>
            </ul>
            <button className="btn btn-primary max-w-48">Yuborish</button>
        </div>
    )
}

export default Results;