const { useState } = React

export function LongTxt({ txt, length = 100 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleExpansion(){
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded ? txt : txt.slice(0, length);
  const buttonText = 'Read ' + (isExpanded ? 'less' : 'more');

  return (
    <div>
      <p>{displayText}</p>
      {/* {txt.length > length && (
        <button onClick={toggleExpansion}>{buttonText}</button>
      )} */}
    </div>
  );
};


