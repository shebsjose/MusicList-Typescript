import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Album from "../components/Album";
import NavBar from "../components/NavBar";
import NotFound from "../components/NotFound";
import { useEffect } from "react";
import { useAppDispatch } from '../redux/hooks'
import { setAlbums } from "../redux/features/albumSlices";
import Details from "../components/Details";
import axios from "axios";

const Routers: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    handleApi();
  }, []);

  const handleApi = async () => {
    const { data } = await axios("https://jsonplaceholder.typicode.com/users");
    dispatch(setAlbums(data));
  };
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Album />}/>
        <Route path="/details/:id" element={<Details/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Routers;