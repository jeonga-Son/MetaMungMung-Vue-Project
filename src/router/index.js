import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/index.vue";
import Signup from "../pages/member/signup.vue";
import Login from "../pages/member/login.vue";
import Modify from "../pages/member/modify.vue";
import Register from "../pages/member/pet/register.vue";
import MyPage from "../pages/member/myPage.vue";
import OffMeeting from "../pages/meeting/offMeeting/index.vue";
import OnMeeting from "../pages/meeting/onMeeting/index.vue";
import RegisterModal from '../pages/meeting/onMeeting/board/index.vue'
import ProductPage from "../pages/store/product/index.vue";
import ProductDetail from "../pages/store/product/detail/_id.vue";
import ProductReviews from "../pages/store/product/review/index.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/members/signup",
      name: "Signup",
      component: Signup,
    },
    {
      path: "/members/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/members/modify",
      name: "Modify",
      component: Modify,
    },
    {
      path: "/members/pet/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/members/myPage",
      name: "MyPage",
      component: MyPage,
    },
    {
      path: "/offMeeting",
      name: "OffMeeting",
      component: OffMeeting,
    },
    {
      path: "/onMeeting",
      name: "OnMeeting",
      component: OnMeeting,
    },
    {
      path: '/onMeeting/board',
      name: 'RegisterModal',
      component: RegisterModal
    },
    {
      path: "/products",
      name: "ProductPage",
      component: ProductPage,
    },
    {
      path: "/products/:id",
      name: "ProductDetail",
      component: ProductDetail,
    },
    {
      path: "/products/:id/reviews",
      name: "ProductReviews",
      component: ProductReviews,
    },
  ],
});

export default router;
