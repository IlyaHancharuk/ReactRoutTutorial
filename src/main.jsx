import React from "react";
import ReactDOM from "react-dom/client";
import { createRoutesFromElements, RouterProvider, createBrowserRouter, Route } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";
import Root, { rootAction, rootLoader } from "./routes/root";
import Contact, { contactAction, contactLoader } from "./routes/contact";
import EditContact, { editAction } from "./routes/edit";
import { destroyAction } from "./routes/destroy";
import Index from "./routes";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />} loader={rootLoader} action={rootAction} errorElement={<ErrorPage />}>
            <Route errorElement={<ErrorPage />}>
                <Route index element={<Index />} />
                <Route path="contacts/:contactId" element={<Contact />} loader={contactLoader} action={contactAction} />
                <Route
                    path="contacts/:contactId/edit"
                    element={<EditContact />}
                    loader={contactLoader}
                    action={editAction}
                />
                <Route path="contacts/:contactId/destroy" action={destroyAction} />
            </Route>
        </Route>
    )
);

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Root />,
//         errorElement: <ErrorPage />,
//         loader: rootLoader,
//         action: rootAction,
//         children: [
//             {
//                 errorElement: <ErrorPage />,
//                 children: [
//                     {
//                         index: true,
//                         element: <Index />,
//                     },
//                     {
//                         path: "contacts/:contactId",
//                         element: <Contact />,
//                         loader: contactLoader,
//                         action: contactAction,
//                     },
//                     {
//                         path: "contacts/:contactId/edit",
//                         element: <EditContact />,
//                         loader: contactLoader,
//                         action: editAction,
//                     },
//                     {
//                         path: "contacts/:contactId/destroy",
//                         action: destroyAction,
//                         errorElement: <div>Oops! There was an error.</div>,
//                     },
//                 ],
//             },
//         ],
//     },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
