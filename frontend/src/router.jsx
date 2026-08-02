import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Equipment from "./pages/Equipment/Equipment";
import Welcome from "./pages/Welcome";

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
            }
        ]
    }
])

export default router