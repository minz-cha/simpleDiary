import React, { useEffect, useState } from "react"

const Lifecycle = () => {
    const [count, setCount] = useState(0)
    const [text, setText] = useState("")

    //컴포넌트가 Mount 되는 시점에만 제어
    useEffect(() => {
        console.log("Mount!")
    }, [])

    //컴포넌트가 업데이트 되는 경우를 제어
    useEffect(() => {
        console.log("Update!")
    })

    //dependency array에 있는 값이 변화 -> 앞에 있는 콜백함수 수행됨
    useEffect(() => {
        if (count > 5) {
            alert(`count값이 5를 넘었습니다. 따라서 1로 초기화합니다.`)
            setCount(1)
        }
    }, [count])

    useEffect(() => {
        console.log(`text is update: ${text}`)
    }, [text])

    return <div style={{ padding: 20 }}>
        <div>
            {count}
            <button onClick={() => setCount(count + 1)}> + </button>
        </div>
        <div>
            <input value={text} onChange={(e) => setText(e.target.value)} />
        </div>
    </div>
}

export default Lifecycle