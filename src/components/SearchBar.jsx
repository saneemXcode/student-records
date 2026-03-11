function SearchBar({search,setSearch}) {

return (

<input
placeholder="Search student..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{padding:"8px",marginBottom:"10px"}}
/>

);

}

export default SearchBar;