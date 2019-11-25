import React from "react";

/**
 * A card is just a bordered &lt;div&gt; to wrap a set of
 * related elements.
 */
export default function Card(props) {
  const { title, children, style } = props;

  return (
    <div className="card" style={style}>
      {title ? (
        <h5 style={{ paddingBottom: '0.3em', borderBottom: '2px solid #db625c'}}>
          {title}
        </h5>
      ) : (
        ""
      )}
      {children}
    </div>
  );
}
