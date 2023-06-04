export default function Search({ search, handler }) {
  return (
    <>
      <p>
        Find Countries: <input value={search} onChange={handler}></input>
      </p>
    </>
  );
}
