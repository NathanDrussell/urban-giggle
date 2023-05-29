import React, { ReactElement } from "react";

const CardTitle: React.FC<{ title: string; color?: "default" | "subdued" }> = (props) => {
  return <h1>{props.title}</h1>;
};
const CardImage: React.FC<{ image: string; alt: string }> = ({ image, alt }) => {
  return <img src={image} alt={alt} />;
};
const CardContent: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

type ReduceNoise<T> = { [K in keyof T]: T[K] } & {};
type PropsOf<T> = T extends React.FC<infer P> ? P : never;
type PrefixedOrIgnore<TPrefix extends string, key> = key extends TPrefix ? TPrefix : `${TPrefix & string}${Capitalize<key & string>}`;

type CombineProps<Pfx extends string, Props> = (Pfx extends keyof Props ? { [K in Pfx]: Props[K] | React.ReactElement } : {}) & {
  [K in Exclude<keyof Props, Pfx> as PrefixedOrIgnore<Pfx, K>]: Props[K];
};

type ParentProps<T extends { [K: string]: PropsOf<any> }> = { [K in keyof T]: ReduceNoise<CombineProps<K & string, T[K]>> }[keyof T];

type Abc = {
  title: PropsOf<typeof CardTitle>;
  image: PropsOf<typeof CardImage>;
  content: PropsOf<typeof CardContent>;
};

// type ParentPropsFrom<Pfx extends string, Props> = Pfx extends keyof Props
//   ? Props[Pfx] extends ReactElement
//     ? { [K in Pfx]: ReactElement } & { [K in Exclude<keyof Props, Pfx> as PrefixedOrIgnore<Pfx, K>]: never }
//     : { [K in Pfx]: Props[Pfx] } & { [K in Exclude<keyof Props, Pfx> as PrefixedOrIgnore<Pfx, K>]: Props[K] }
//   : never;

export type CardProps = ReduceNoise<CombineProps<"title", PropsOf<typeof CardTitle>>> & ReduceNoise<CombineProps<"image", PropsOf<typeof CardImage>>>;

type AAA = ReduceNoise<CombineProps<"content", PropsOf<typeof CardContent>>>;

export function Card(props: CardProps) {
  const validTitleElement = React.isValidElement(props.title);
  // const validImageElement = React.isValidElement(props.image);

  return (
    <div className="border rounded m-4 p-2">
      {!validTitleElement ? <CardTitle title="Hello world" color="default" /> : props.title}
      <div className="i-logos-vue text-3xl" />
      {/* {!validImageElement ? <CardImage image={props.image as string} alt="abc" /> : props.image} */}
      <CardContent>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, sint!</CardContent>
    </div>
  );
}

Card.Title = CardTitle;
Card.Image = CardImage;
Card.Content = CardContent;
