import React, { useEffect, useState } from "react"

const UnmountTest = () => {
    useEffect(() => {
        console.log("Mount!")

        //Mount를 제어하는 useEffect에서 전달되는 콜백함수가 리턴하는것  
        // -> Unmount 되는 시점에 return
        return () => {
            console.log("Unmount!")
        }
    }, [])
    return <div>Unmount Testing Component</div>
}

const Lifecycle = () => {
    const [isVisible, setIsVisible] = useState(false)
    const toggle = () => setIsVisible(!isVisible)

    return <div style={{ padding: 20 }}>
        <button onClick={toggle}>ON/OFF</button>
        {isVisible && <UnmountTest />}
    </div>
}

export default Lifecycle