export function allAccess(request, response) {
  return response.status(200).send("page/index");
};
  
export function userBoard (request, response) {
  return response.status(200).send("User Content.");
};
  
export function adminBoard(request, response) {
  return response.status(200).render("admin/index");
};
  
export function moderatorBoard(request, response) {
  return response.status(200).send("moderator/index");
};