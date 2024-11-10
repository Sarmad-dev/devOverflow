const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "sign-up",
  QUESTION: (_id: string) => `/question/${_id}`,
  TAGS: (_id: string) => `/tags/${_id}`,
};

export default ROUTES;
