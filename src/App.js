import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList = [
  {
    id: 1,
    author: "철수",
    content: "테스트 일기1",
    emotion: 5,
    created_date: new Date().getTime()
  }, {
    id: 2,
    author: "짱구",
    content: "테스트 일기2",
    emotion: 3,
    created_date: new Date().getTime()
  },
  {
    id: 3,
    author: "유리",
    content: "테스트 일기3",
    emotion: 2,
    created_date: new Date().getTime()
  }, {
    id: 4,
    author: "맹구",
    content: "테스트 일기4",
    emotion: 5,
    created_date: new Date().getTime()
  },

]
function App() {
  return (
    <div className='App'>
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
