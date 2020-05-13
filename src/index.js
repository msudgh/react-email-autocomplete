import React, { useState, useRef } from 'react';
import { emailServicesDomains, protectedKeyCodes } from './constants';

const Email = (props) => {
  const [value, setValue] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [valid, setValid] = useState(true);
  const inputRef = useRef();

  const replaceLast = (value, what, replacement) => {
    let pieces = value.split(what);
    let lastPiece = pieces.pop();
    return pieces.join(what) + replacement + lastPiece;
  };

  const handleChange = (event) => {
    const { value: emailAddress } = event.target;
    const suggest = suggestFormatter(emailAddress);

    if (typeof suggest === 'undefined' || suggest.length < 1) {
      setValue(emailAddress);
      setSuggestion(suggest);
      selectText();
    } else {
      setValue(`${emailAddress}${suggest}`);
      setSuggestion(suggest);
      selectText();
    }

    props.onChange && props.onChange(event);
  };

  const selectText = () => {
    if (typeof suggestion !== 'undefined' && suggestion.length > 0) {
      let startPos = value.lastIndexOf(suggestion);
      let endPos = startPos + suggestion.length;

      inputRef.setSelectionRange(startPos, endPos);
    }
  };

  const getSuggest = (event) => {
    if (protectedKeyCodes.indexOf(event.keyCode) >= 0) return;
    const { value } = event.target;

    if (event.keyCode === 8) {
      setValue(replaceLast(value, suggestion, ''));
    }
  };

  const suggestFormatter = (string) => {
    let strArr = string.split('@');

    if (strArr.length > 0) {
      string = strArr.pop();

      const { domains } = props;

      let match =
        domains
          .filter((domain) => {
            return domain.indexOf(string) === 0;
          })
          .shift() || '';

      return match.replace(string, '');
    }

    return;
  };

  useEffect(() => {
    const { domains, value } = props;
    if (typeof domains === 'string') {
      throw new Error('Domains props should be array not string!');
      setValid(false);
    }

    setValue(value);
  }, []);

  if (valid) {
    throw new Error(
      'Unable to render component! Please, Check out developer tools of your browser.'
    );
  }

  return (
    <div className="rea-wrapper">
      <input
        {...props}
        autoCapitalize="none"
        type="text"
        inputMode="email"
        value={value || ''}
        onChange={handleChange}
        onKeyUp={getSuggest}
        ref={inputRef}
      />
    </div>
  );
};

Email.defaultProps = {
  domains: emailServicesDomains,
};

export default Email;
