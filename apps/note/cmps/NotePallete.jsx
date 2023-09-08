const { useState, useEffect, useRef } = React;

export function NotePallete({ onSetBackGroungColor }) {
  const firstButtonEl = useRef(null);
  const secondButtonEl = useRef(null);
  const thirdButtonEl = useRef(null);
  const fourthButtonEl = useRef(null);

  const handleButtonClick = (buttonEl) => {
    const computedStyles = window.getComputedStyle(buttonEl.current);
    const backgroundColor = computedStyles.backgroundColor;

    onSetBackGroungColor(backgroundColor);
  };

  return (
    <section className="color-pallete-wrapper">
      <button
        ref={firstButtonEl}
        className="btn-pallete first"
        onClick={() => handleButtonClick(firstButtonEl)}
      ></button>
      <button
        className="btn-pallete second"
        ref={secondButtonEl}
        onClick={() => handleButtonClick(secondButtonEl)}
      ></button>
      <button
        className="btn-pallete third"
        ref={thirdButtonEl}
        onClick={() => handleButtonClick(thirdButtonEl)}
      ></button>
      <button
        className="btn-pallete fourth"
        ref={fourthButtonEl}
        onClick={() => handleButtonClick(fourthButtonEl)}
      ></button>
    </section>
  );
}
