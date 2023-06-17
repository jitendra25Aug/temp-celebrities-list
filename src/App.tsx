import CelebrityList from "./components/CelebrityList";
import Modal from "./components/Modal";
import SearchUser from "./components/SearchUser";

const App = () => {
  return (
    <main>
      <section className="container">
        <SearchUser />
        <CelebrityList />
        <Modal />
      </section>
    </main>
  )
}

export default App;