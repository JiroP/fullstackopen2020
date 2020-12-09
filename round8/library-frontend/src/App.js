import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { BOOK_ADDED, CURRENT_USER_INFO } from "./queries";
import Recommended from "./components/Recommended";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const result = useQuery(CURRENT_USER_INFO);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(
        `Book added ${subscriptionData.data.bookAdded.title} by ${subscriptionData.data.bookAdded.author.name}`
      );
    }
  });

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useEffect(() => {
    const cachedToken = window.localStorage.getItem("user-token");
    if (cachedToken) {
      setToken(cachedToken);
    }
  }, []);

  useEffect(() => {
    if (token && result.data) {
      setCurrentUser(result.data.me);
    }
  }, [token, result]);

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <button onClick={handleLogout}>logout</button>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <button onClick={() => setPage("recommended")}>recommended</button>
        )}
      </div>

      <Authors token={token} show={page === "authors"} />

      <Books show={page === "books"} />

      <Recommended show={page === "recommended"} currentUser={currentUser} />

      <NewBook show={page === "add"} />

      <LoginForm show={page === "login"} setToken={setToken} />
    </div>
  );
};

export default App;
