interface Props {
  text: string;
}

export function Heading({ text }: Props) {
  return <h1 className="text-3xl font-bold text-gray-800 mb-2">{text}</h1>;
}

export function Paragraph({ text }: Props) {
  return <p>{text}</p>;
}