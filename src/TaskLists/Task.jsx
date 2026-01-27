import { Card, Form } from 'react-bootstrap'

function Task({ id, title, desc, completed }) {
return (
<Card 
    className="mb-2 border-0 shadow-sm"
    style={{ 
    borderLeft: completed ? '4px solid #198754' : '4px solid #0d6efd',
    opacity: completed ? 0.75 : 1,
    }}
>
    <Card.Body className="py-2 px-3 d-flex align-items-center gap-3">
    {/* Optional small checkbox – remove if you don't want interactivity yet */}
    <Form.Check 
        type="checkbox"
        checked={completed}
        readOnly
        className="mt-0 mb-0 flex-shrink-0"
    />

    <div className="flex-grow-1">
        <div 
        className="fw-bold"
        style={{ 
            textDecoration: completed ? 'line-through' : 'none',
            color: completed ? '#6c757d' : '#212529',
        }}
        >
        {title}
        </div>
        
        {desc && (
        <div 
            className="small text-muted mt-1"
            style={{ 
            textDecoration: completed ? 'line-through' : 'none',
            opacity: completed ? 0.7 : 1,
            }}
        >
            {desc}
        </div>
        )}
    </div>
    </Card.Body>
</Card>
)}
export default Task