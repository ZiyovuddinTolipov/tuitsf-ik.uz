
const AddNewDoc = () => {
    return (
        <form className="flex flex-col items-start justify-start text-left">
            <label htmlFor='file' className="text-primary-200 my-2 ">Hujjatni tanlang</label> 
            <input id="file" type="file" className="file-input bg-transparent file-input-bordered file-input-primary w-full max-w-xs" accept="application/msword,application/vnd.ms-powerpoint,application/pdf"/>
            <h2 className="text-primary-200 my-2 ">Hujjat haqida izoh</h2>
            <input type="text" placeholder="izoh yozish uchun" className="input input-bordered input-primary w-full max-w-xs bg-primary-50 text-primary-300" />
            <button className="btn btn-primary block max-w-xs w-full my-3" type="submit">Saqlash</button>
        </form>
    )
}

export default AddNewDoc;