import { Route, BrowserRouter, Routes } from "react-router-dom";
import { About } from "./components/about";
import { Home } from "./components/home";
import { MyAccount } from "./components/my-account";
import Post from "./components/post";
import Topic from "./components/topic";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/apie" element={<About />} />
        <Route path="/mano-paskyra" element={<MyAccount />} />
        <Route path="/kategorijos" element={<Home />} />
        <Route path="/kategorijos/:id" element={<Topic />} />
        <Route path="/kategorijos/:id/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
