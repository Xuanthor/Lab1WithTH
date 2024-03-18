
// import {
//   createBrowserRouter,
//   Outlet
// } from "react-router-dom";
// import ErrorPage from "../hepper/error-page";
// import UserPage from "../screens/user/users.page";
// import Header from "../components/header/Header.components";
// import { useEffect } from "react";
// import { message } from "antd";
// import { callLogin } from "../config/api";
// import { fetchAccount } from "../redux/slice/accountSlide";
// import { useAppDispatch, useAppSelector } from "../redux/hook";
// const LayoutAdmin = () => {
//   const dispatch = useAppDispatch();
//   const isLoading = useAppSelector(state => state.account.isLoading);
//   useEffect(() => {
//     if (
//       window.location.pathname === '/login'
//       || window.location.pathname === '/register'
//     )
//       return;
//     dispatch(fetchAccount())
//   }, [])

  
//   return (
//     <div>
//       <Header/>
//       <Outlet></Outlet>
//     </div>
//   )
// }
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LayoutAdmin />,
//     errorElement: <ErrorPage />,
//     children: [
//       { index: true, element: <UserPage></UserPage> },
//       {

//         path: "/users",
//         element: <UserPage />,
//       },
//     ]
//   }

// ]);
// export default router