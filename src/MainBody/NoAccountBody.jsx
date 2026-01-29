import { Card } from "react-bootstrap"

function NoAccountBody() {
    return(
        <Card bg="dark" border="light" text="light" className="text-center w-35 h-25">
            <Card.Header className="fs-3">Nie jesteś zalogowany/zalogowana</Card.Header>
            <Card.Body className="d-flex align-items-center justify-content-center">
                <Card.Text className="fs-5">
                    Zaloguj się lub zarejestruj, aby zobaczyć swoje zadania.
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default NoAccountBody