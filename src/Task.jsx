function Task({ id, title, desc, completed }) {

    const taskDone = completed ? "text-decoration-line-through" : ""


    return(
        <div className="task card">
            <div className={`card-header ${taskDone}`}>
                <strong>
                    {title}
                </strong>
            </div>
            <div className="card-body">
                <p className="card-text">
                    {desc}
                </p>
            </div>
        </div>
    )
}

export default Task