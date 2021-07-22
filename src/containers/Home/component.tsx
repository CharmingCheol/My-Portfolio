import React, { memo } from "react";

const Component = () => {
  return (
    <>
      {Array(30)
        .fill(0)
        .map(() => (
          <section key={Math.random()}>
            {Array(2)
              .fill(0)
              .map((_, index) => (
                <ul key={Math.random()} className={index === 0 ? "" : "odd"}>
                  {Array(17)
                    .fill(0)
                    .map(() => (
                      <li key={Math.random()}>
                        <div className="little-hexagon" />
                      </li>
                    ))}
                </ul>
              ))}
          </section>
        ))}
    </>
  );
};

export default memo(Component);
