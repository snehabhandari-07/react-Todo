export default function Navbar(){
    return (
        <>
        <nav className='flex justify-between bg-slate-700 text-white px-3 mb-3'>
            <span className="font-bold text-xl">Taskly</span>
            <ul className="flex gap-9">
                <li className="cursor-pointer hover:font-bold transition-duration-1000">Home</li>
                <li className="cursor-pointer hover:font-bold transition-duration-1000">Your Tasks</li>
            </ul>
        </nav>
        </>
    )
}