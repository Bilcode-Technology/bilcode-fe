import { forwardRef } from "react";

const FullScreenTransition = forwardRef(({ textRefs, text = "bilcode.id" }, ref) => {
  return (
    <div
      ref={ref}
      className="fixed inset-0 bg-white flex justify-center items-center z-50"
    >
      <h1 className="text-4xl font-bold text-black">
        {text.split("").map((char, i) => (
          <span
            key={i}
            ref={textRefs[i]}
            style={{ display: "inline-block", opacity: 0 }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
});

export default FullScreenTransition;