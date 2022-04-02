import Login from "../views/Login";
import Register from "../views/Register";
import Lessons from "../views/Lessons";
import Dictionary from "../views/Dictionary";
import Dashboard from "../views/Dashboard";
import Woops404 from "../views/404";
import LessonsList from "../views/LessonsList";
import Lesson from "../views/Lesson";
import PrivateRoute from "../components/routing/PrivateRoute";

export const ROUTES = {
  login: {
    alias: "login",
    path: "/login",
    name: "Login",
  },
  register: {
    alias: "register",
    path: "/register",
    name: "Register",
  },
  dashboard: {
    alias: "dashboard",
    path: "/",
    name: "Dashboard",
  },
  lessons: {
    alias: "lessons",
    path: "/lessons",
    name: "Lessons",
  },
  dictionary: {
    alias: "dictionary",
    path: "/dictionary",
    name: "Dictionary",
  },
};

const { dashboard, lessons, dictionary, login, register } = ROUTES;

export default [
  {
    ...login,
    element: <Login />,
  },
  {
    ...register,
    element: <Register />,
  },
  {
    ...dashboard,
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: lessons.path + "/*",
    element: (
      <PrivateRoute>
        <Lessons />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <LessonsList />,
      },
      {
        path: ":lessonId/*",
        element: <Lesson />,
      },
    ],
  },
  {
    ...dictionary,
    element: (
      <PrivateRoute>
        <Dictionary />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <Woops404 />,
  },
];
