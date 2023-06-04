import Search from "./components/Search";
import Result from "./components/Result";
import { useState, useEffect } from "react";
import services from "./services/search";

function App() {
  const [search, setSearchValue] = useState("");
  const [countriesList, setList] = useState(null);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    services.getAll().then((data) => {
      setList(data);
    });
  }, []);

  const handleChange = (event) => {
    let value = event.target.value;
    setSearchValue(value);
    let regex = new RegExp(value, "i");
    let listResult = countriesList.filter(function (country) {
      return regex.test(country.name.common);
    });
    setFilteredList(listResult);
  };

  const handleClick = (name) => {
    services.getCountry(name).then((data) => {
      const result = [];
      result.push(data);
      setFilteredList(result);
    });
  };

  if (countriesList) {
    return (
      <>
        <Search search={search} handler={handleChange} />
        <Result list={filteredList} search={search} handleClick={handleClick} />
      </>
    );
  } else {
    return null;
  }
}

export default App;
