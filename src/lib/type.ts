export type LinkMap = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  demo: string;
  create_at: string;
};

export type response = {
  status: "success" | "error";
  message: string;
};
