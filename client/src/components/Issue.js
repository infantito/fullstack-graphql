import React from 'react';
import css from 'emotion';

export default function Issue(props) {
  return (
    <div
      className={css`
        color: #d8000c;
        background-color: #ffbaba;
        padding: 1rem;
        font-size: 1rem;
        border-radius: 0.5rem;
      `}
    >
      <details>
        <summary>
          <span>🚫</span> This is an error message.
        </summary>
        <p>{props.message}</p>
      </details>
    </div>
  );
}
