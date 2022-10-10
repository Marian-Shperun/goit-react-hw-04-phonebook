import PropTypes from 'prop-types';
import { formatPhoneNumber } from 'react-phone-number-input';

const ContactList = ({ visibleLIst, deleteIt }) => {
  return (
    <>
      <ul>
        {visibleLIst.map(({ id, name, number }) => {
          return (
            <li key={id}>
              <a href={`tel:${number}`}>
                {name}: <span>{formatPhoneNumber(number)}</span>
              </a>
              <button
                key={id}
                onClick={() => {
                  deleteIt(id);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default ContactList;

ContactList.propTypes = {
  visibleLIst: PropTypes.array.isRequired,
  deleteIt: PropTypes.func.isRequired,
};
