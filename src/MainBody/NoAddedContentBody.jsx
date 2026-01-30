import { Card } from "react-bootstrap"

function NoAddedContentBody() {
    return(
        <Card className="text-center w-35 h-25">
            <Card.Header className="fs-3">Brak dodanych treści</Card.Header>
            <Card.Body className="d-flex align-items-center justify-content-center">
                <Card.Text className="fs-5">
                    Aby dodać nowe treści, skorzystaj z opcji dodawania w menu.
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default NoAddedContentBody