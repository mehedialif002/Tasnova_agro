// **text** likhle bold hobe, ==text== likhle লাল hobe
// example: "Amader dudh **100% khati** ebong ==kono bishakto rasayon nei==."

export default function FormattedText({ text }) {
  if (!text) return null;

  const pattern = /(\*\*[^*]+\*\*|==[^=]+==)/g;
  const parts = text.split(pattern).filter((part) => part !== "");

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("==") && part.endsWith("==")) {
          return (
            <span key={i} className="font-semibold text-red-600">
              {part.slice(2, -2)}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}