import { Link } from 'react-router-dom';

const Home = () => {

    const styles = {
        container: ' max-w-[1200px] w-[100%] mx-auto py-10 h-[100vh] overflow-hidden relative max-h-[1200px] flex justify-around flex-col',
        content: 'flex justify-between mx-auto items-center py-4  text-primary-50 max-h-[10vh]  w-full absolute top-6',
        // text_bg_liner:"[&::selection]:text-base-content relative col-start-1 row-start-1 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text [-webkit-text-fill-color:transparent] [&::selection]:bg-blue-700/20 [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]"
    }
    return (
        <main className={styles.container}>
        <nav className={styles.content} data-aos="zoom-in-down">
            {/* <img src={logo} alt='logo' className='h-16' /> */}
            <h3 className={`text-2xl font-semibold font-Syne text-white`}>StuVotes</h3>
            <Link to='/login' className='text-2xl font-medium font-Syne flex items-center text-white'>Login</Link>
        </nav>
        <div className='flex text-white font-Syne'>
            <div className='flex flex-col justify-center gap-8'>
                <h3 className='text-5xl  font-[700]'>Siz o’z <span>o’qituvchingizga ovoz berish</span>ingiz mumkin!</h3>
                <div className='font-[600] home-alert-msg' data-aos="fade-right">
                    <p><span>Barcha ovozlar </span>:<span> anonim saqlanadi</span></p>
                    <p><span>Sizdan iltimos</span>: <span>Faqatgina haqqoniy baholang</span></p>
                    <p><span>Taʼlim</span>: <span>sizning bahoyingizga bog'liq.</span></p>
                </div>
                {/* <button className={`font-Syne bubbly-button flex gap-3 items-center uppercase text-base max-w-[200px] mt-3 ${animate ? 'animate' : ''}`} onClick={handleButtonClick}>
                    ovoz berish <MdArrowOutward />
                </button> */}
            </div>
            <div data-aos="zoom-in-up" >
                {/* <img src={homePng} alt="homepng" /> */}
            </div>
        </div>
        <footer className='absolute bottom-[10px] text-black font-Syne right-0'>tolipovjs.uz tomonidan ishlab chiqildi.</footer>
    </main>
    )
}

export default Home