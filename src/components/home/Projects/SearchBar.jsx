import searchIcon from "../../../images/search.svg"

function SearchBar( {onSearch} ) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onChange={(e) => onSearch(e)} onSubmit={handleSubmit}>
      <div className="search-bar-wrapper">
        <div className="search-bar-container">
            <input className="search-text" type="text" placeholder="Search..." />
          <div className="search-icon">
            <img className="search-icon-img" src={searchIcon}></img>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SearchBar