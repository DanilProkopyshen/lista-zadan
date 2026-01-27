import { Card } from "react-bootstrap"

function NoAccountBody() {
    return(
        <Card className="text-center w-50">
            <Card.Header>Nie jesteś zalogowany/zalogowana</Card.Header>
            <Card.Body>
                <Card.Text>
                Zaloguj się lub zarejestruj, aby zobaczyć swoje zadania.
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default NoAccountBody