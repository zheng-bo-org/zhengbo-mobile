export type API = string;

//lisp like router definition.
//(get path)
//(post path)
//(put path)
//(delete path)
export type SystemAPI = API | "(get /system/roles)";
export type UserAPI = API | "(get /system/roles)"