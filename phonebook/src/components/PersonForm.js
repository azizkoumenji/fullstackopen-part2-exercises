const PersonForm = ({
  newName,
  handleNameChange,
  handleNumberChange,
  number,
  handleSubmit,
}) => (
  <>
    <form>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          Add
        </button>
      </div>
    </form>
  </>
);

export default PersonForm;
