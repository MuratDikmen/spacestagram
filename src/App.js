import Feed from "./views/Feed";
import Header from "./components/Header";

function App() {
  return (
    <div className="m-auto h-screen bg-black">
      <header>
        <Header />
      </header>
      <main className="container m-auto">
        <Feed />
      </main>
    </div>
  );
}

export default App;
