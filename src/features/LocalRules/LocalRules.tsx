import LibraryResult from "./LibraryResult";
import SearchRule, { FieldType } from "./SearchLibrary";
import { useSearch } from "./useSearch";

function LocalRules() {
  const { isSearching, searchLibrary, searchLibraryResult } = useSearch();

  const handleSearch = async (searchValues: FieldType) => {
    await searchLibrary({
      libraryName: searchValues.libraryName!,
      propertyName: searchValues.propertyName!,
    });
  };

  return (
    <>
      <SearchRule isSearching={isSearching} onSearch={handleSearch} />
      <hr className="border-slate-300" />
      <LibraryResult searchLibraryResult={searchLibraryResult ?? {}} />
    </>
  );
}

export default LocalRules;
