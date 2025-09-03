import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import "./App.css";
import Navbar from "./components/Navbar";
import Auth from "../utils/auth";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import { AppContextProvider } from "./context/AppContext";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Sets up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <div className="App px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <Navbar />
          <Outlet />
          <Toaster />
          <Footer />
        </div>
      </AppContextProvider>
    </ApolloProvider>
  );
};

export default App;
