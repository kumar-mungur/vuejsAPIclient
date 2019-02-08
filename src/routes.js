import Home from "./views/Home.vue";
import UserNotes from "./views/UserNotes.vue";
import SingleNote from "./views/SingleNote.vue";
import LoginPage from "./views/Login.vue";
import RegisterPage from "./views/Register.vue";
import Logout from "./components/Logout.vue";
import DashboardPage from "./views/Dashboard.vue";

export default [
  { path: "/", name: "home", component: Home, props: true },
  {
    path: "/my-notes",
    name: "userNotes",
    component: UserNotes,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  { path: "/note/:id", name: "viewNote", component: SingleNote },
  {
    path: "/note/edit/:id",
    name: "editNote",
    component: SingleNote,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardPage,
    meta: {
      requiresAuth: true
    }
  },
  { path: "/logout", name: "logout", component: Logout }
];
