import Feed from "./views/Feed";
import Header from "./components/Header";

function App() {
  return (
    <div className="m-auto h-screen bg-black">
      <Header />
      <div className="container m-auto">
        <Feed />
      </div>
    </div>
  );
}

export default App;
