import { useNavigate, NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { showFav } from "../redux/features/albumSlices";

const NavBar: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { showFav: isShowFav } = useAppSelector((state) => state.musicAlbum);

  const handleBack = () => {
    navigate("/");
  };
 
  return (
    <nav className="w-full dark:bg-slate-800 py-6 bg-white w-screen dark:bg-slate-800 dark:text-gray-400">
      <div className="flex items-center justify-between mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-3xl md:px-2 px-4">
        <section className="flex items-center text-orange-700 space-x-2">
          <label
            className="font-bold text-xl focus:ring focus:ring-orange-500 focus:ring-opacity-25 outline-none rounded-lg cursor-pointer"
            onClick={handleBack}
          >
            Music Album
          </label>
        </section>
        <section>
          <ul className="md:space-x-8 space-x-6 text-gray-900 font-semibold hidden md:flex">
                <li className="relative group">
                  <NavLink to="/">
                    <div
                      className="bg-orange-500 px-4 py-1 rounded-xl text-white hover:bg-orange-400 active:bg-orange-600 focus:ring focus:ring-orange-500 focus:ring-opacity-25 outline-none cursor-pointer"
                      onClick={() => {
                        dispatch(showFav());
                      }}
                    >
                      <span className="px-1.5">
                        {" "}
                        {isShowFav ? "Books" : "Favorites"}
                      </span>
                    </div>
                    <div className="w-full  bg-transparent group-hover:bg-purple-500 transition-al absolute bottom-0" />
                  </NavLink>
                </li>
          </ul>
        </section>
      </div>
    </nav>
  );
};
export default NavBar;
