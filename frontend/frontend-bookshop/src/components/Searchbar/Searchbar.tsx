import './Searchbar.scss';

export const Searchbar = () => {
    return (
        <div className='search-container'>
            <input className='search-container_input' type="text" placeholder='Search a Book'/>
            <button className='search-container_button'>Search</button>
        </div>
    );
};
