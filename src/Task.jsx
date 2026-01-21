import { useState } from "react"

function Task({ id, title, desc, completed }) {

    const taskDone = completed ? "text-decoration-line-through" : ""

    return(
        <>
            <div className="card text-bg-light mb-3" style={{maxWidth: "18rem"}}>
                <div className={`card-header ${taskDone}`}>
                    {title}
                </div>
                <div className="card-body">
                    <p className="card-text">
                        {desc}
                    </p>
                </div>
            </div>
        </>
    )
}

export default Task