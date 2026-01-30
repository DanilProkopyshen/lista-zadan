import { Dropdown } from "react-bootstrap"
import { MdOutlineSettings } from "react-icons/md"
import RenameList from "./RenameList"
import DeleteList from "./DeleteList"

function ListOptions({listId}) {

    return (
        <Dropdown className="transparent-btn">
            <Dropdown.Toggle>
                <MdOutlineSettings size={24} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item disabled="true" style={{color: "#000000"}}>
                    <h5>Opcje</h5>
                </Dropdown.Item>
                <Dropdown.Item role="button" as="button">
                    <RenameList listId={listId} />
                </Dropdown.Item>
                <Dropdown.Item role="button" as="button">
                    <DeleteList listId={listId} />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ListOptions