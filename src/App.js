import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import './App.css'
import DiaryEditor from './DiaryEditor'
import DiaryList from './DiaryList'

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data
    }
    case 'CREATE':
      const created_date = new Date().getTime()
      const newItem = {
        ...action.data,
        created_date
      }
      return [newItem, ...state]
    case 'REMOVE':
      return state.filter((it) => it.id !== action.targetId)
    case 'EDIT':
      return state.map((it) => it.id === action.targetId ? { ...it, content: action.newContent } : it)
    default:
      return state;
  }
}

// App의 'data'만을 공급하기 위해 만들어짐
export const DiaryStateContext = React.createContext()

// onCreate, onEdit, onRemove와 같은 state를 변화시키는 함수 -> 즉 dispatch 함수를 내보내기 위함
export const DiaryDispatchContext = React.createContext()

function App() {
  const [data, dispatch] = useReducer(reducer, [])
  const dataId = useRef(0)

  const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json())

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++
      }
    })
    dispatch({ type: "INIT", data: initData })
  }

  useEffect(() => {
    setTimeout(() => {
      getData()
    }, 1500)
  }, [])

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({ type: "CREATE", data: { author, content, emotion, id: dataId.current } })
    dataId.current += 1
  }, [])

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId })
  }, [])

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent })
  }, [])

  // useMemo를 이용하여 재생성되지 않도록 구현
  const memoizedDipatches = useMemo(() => {
    return { onCreate, onRemove, onEdit }
  }, [])

  const getDiaryAnalysis = useMemo(() => {
    if (data.length === 0) {
      return { goodcount: 0, badCount: 0, goodRatio: 0 }
    }

    const goodCount = data.filter((it) => it.emotion >= 3).length
    const badCount = data.length - goodCount
    const goodRatio = (goodCount / data.length) * 100.0
    return { goodCount, badCount, goodRatio }
  }, [data.length])

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDipatches}>
        <div className='App'>
          <DiaryEditor />
          <div>전체 일기: {data.length}</div>
          <div>기분 좋은 일기 개수: {goodCount}</div>
          <div>기분 나쁜 일기 개수: {badCount}</div>
          <div>기분 좋은 일기 비율: {goodRatio.toFixed(2)}%</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App
