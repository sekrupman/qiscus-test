// IMPORT COMPONENT
import Navigationbar from './component/navbar/navbar';

//IMPORT CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/index.css'
import ChatPage from './component/chat-room/chatRoom';



function App() {
  return (
    <div className="App">
      <div className='container'>
      <Navigationbar />
      <ChatPage />
    </div>
    </div>
  );
}

export default App;
