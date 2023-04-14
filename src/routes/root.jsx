import { Link, Outlet, useLoaderData, Form, redirect, NavLink, useNavigation, useSubmit} from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import { useEffect } from "react";

export async function rootLoader({ request }) {
    const url = new URL(request.url);
    const search = url.searchParams.get("search");
    const contacts = await getContacts(search);
    return { contacts, search };
}

export async function rootAction() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`)
}




export default function Root() {
    const { contacts, search } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();

    useEffect(() => {
        document.getElementById("search").value = search;
    }, [search]);

    const onChangeHandler = (e) => {
        const isFirstSearch = search == null;
        submit(e.currentTarget.form, {
            replace: !isFirstSearch,
        });
    };

    const isSearch =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has('search');

    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="search"
                            className={isSearch ? "loading" : ""}
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="search"
                            defaultValue={search}
                            onChange={onChangeHandler}
                        />
                        <div id="search-spinner" aria-hidden hidden={!isSearch} />
                        <div className="sr-only" aria-live="polite"></div>
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    <NavLink
                                        to={`contacts/${contact.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? "active"
                                                : isPending
                                                ? "pending"
                                                : ""
                                            }
                                        >
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {contact.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <div
                id="detail"
                className={navigation.state === 'loading' ? 'loading' : ''}
            >
                <Outlet />
            </div>
        </>
    );
}
