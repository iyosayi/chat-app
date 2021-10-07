import { MdSearch } from "react-icons/md";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full h-12 rounded-lg bg-[#3C393F] flex items-center px-3 gap-2">
      <MdSearch className="text-3xl mt-1" />
      <input
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full h-full bg-transparent focus:outline-none"
      />
    </div>
  );
};

export default Search;
