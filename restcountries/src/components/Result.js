import View from "./View";

export default function Result({ list, search, handleClick }) {
  let render = list.map((country) => (
    <div key={country.name.common}>
      <li>{country.name.common}</li>
      <button onClick={() => handleClick(country.name.common)}>Show</button>
    </div>
  ));

  if ((render.length === 0 && search.length === 0) || render.length === 250) {
    return <p>Use the searchbox to find a country</p>;
  } else if (render.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (render.length === 1) {
    return <View list={list} />;
  } else {
    return <ul>{render}</ul>;
  }
}
