declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

declare module "*.svg" {
  const value: React.FC<React.SVGProps<SVGElement>>;
  export default value;
}
