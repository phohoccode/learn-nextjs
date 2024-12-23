export type LinkMap = {
  label: string;
  href: string;
};

export type Blog = {
  id: number;
  username: string;
  title: string;
  content: string;
  time: string;
};

export type Product = {
  name: string;
  description: string;
  url?: string;
  time: string;
  link: string;
};
