export const newsReducer = (state, action) => {
  switch (action.type) {
    case "HOME":
      return "/home";
    case "WORLD":
      return "/world";
    case "POLITICS":
      return "/politics";
    case "BUSINESS":
      return "/business";
    case "TECHNOLOGY":
      return "/technology";
    case "SPORTS":
      return "/sports";
    default:
      return "/home";
  }
};
