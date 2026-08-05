import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Equipment from "./pages/Equipment/Equipment";
import Welcome from "./pages/Welcome";
import Brand from "./pages/Brand/Brand";
import Center from "./pages/Center/Center";
import Electrician from "./pages/Electrician/Electrician";
import Material from "./pages/Material/Material";
import Team from "./pages/Team/Team";
import Transfer from "./pages/Transfer/Transfer";
import Users from "./pages/Users/Users";
import CreateBrand from "./pages/Brand/CreateBrand/CreateBrand";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Welcome />
            },
            {
                path: "/equipment",
                element: <Equipment />
            },
            {
                path: "/brand",
                element: <Brand />
            },
            {
                path: "/brand/new",
                element: <CreateBrand />
            },
            {
                path: "/center",
                element: <Center />
            },
            {
                path: "/electrician",
                element: <Electrician />
            },
            {
                path: "/material",
                element: <Material />
            },
            {
                path: "/team",
                element: <Team />
            },
            {
                path: "/transfer",
                element: <Transfer />
            },
            {
                path: "/user",
                element: <Users />
            }
        ]
    }
])

export default router