import { Card } from "react-bootstrap"

function NoAddedContentBody() {
    return(
        <Card className="text-center w-50">
            <Card.Header>Brak dodanych treści</Card.Header>
            <Card.Body>
                <Card.Text>
                    Aby dodać nowe treści, skorzystaj z opcji dodawania w menu.
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default NoAddedContentBody