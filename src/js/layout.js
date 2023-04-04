import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import Contactos from "./pages/contacts.jsx";
import AddContact from "./pages/addContact.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  // const basename = process.env.BASENAME || "";

  return (
    <div>
      {/* <BrowserRouter basename={basename}>*/}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Contactos />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/4geeks" element={<h1>Estoy en la vista de 4Geeks</h1>} />
          <Route element={<Single />} path="/single/:thetitle" />
          <Route element={<h1>Not found! 404</h1>} path="*" />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
