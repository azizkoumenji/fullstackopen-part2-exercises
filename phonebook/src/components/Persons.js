const Persons = ({ list, filtered, handleDelete }) => {
  let result = [];
  if (filtered.length === 0) {
    result = list;
  } else {
    result = filtered;
  }
  let endResult = result.map((person) => (
    <div key={`${person.name}div`}>
      <li key={person.name}>
        {person.name} {person.number}
      </li>
      <button onClick={() => handleDelete(person.id, person.name)}>
        Delete
      </button>
    </div>
  ));

  return (
    <>
      <ul>{endResult}</ul>
    </>
  );
};

export default Persons;
