import PropTypes from 'prop-types';

const Filter = ({ title, onChange, contacts }) => {
  return (
    <>
      {title && <h3>{title}</h3>}
      <input
        type="text"
        name="filter"
        placeholder="Find a contact"
        onChange={onChange}
      />
      {contacts().length === 0 && <p>not found</p>}
    </>
  );
};
export default Filter;

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  contacts: PropTypes.func.isRequired,
};
