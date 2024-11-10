import { useNavigate } from "react-router-dom";
import "./Searchbar.scss";

export const Searchbar = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/shop"); // Navigate to the shop page
  };

  return (
    <button className="search-container_button" onClick={handleSearch}>
      Search
    </button>
  );
};
