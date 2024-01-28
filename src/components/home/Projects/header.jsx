import Sort from "./Sort";
import SearchBar from "./SearchBar";

function Header({ onSearch, onFilter }) {
  return (
    <div className="projects-header">
      <p className="projects-header-title">My Projects</p>
      <Sort onFilter={onFilter}/>
      <SearchBar onSearch={onSearch}/>
    </div>
  );
}


export default Header