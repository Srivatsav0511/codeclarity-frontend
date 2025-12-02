import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Features from "./components/Features";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-neutral-900 min-h-screen text-white">

        <Navbar />
        <Routes>
          <Route path="/" element={ <>
                <Home />
                <Features />
                <Footer />
              </>
            }
          />

          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;