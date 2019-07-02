import React, { useContext } from "react";
import { Table, Icon } from "semantic-ui-react";
import moment from "moment";

import { ModalContext } from "../context/modal-context";

function ProfileDetails({ info }) {
  const { isOpen, openModal, changeModalType } = useContext(ModalContext);

  const handleOpenModal = e => {
    openModal(!isOpen);
    switch (e.target.tagName) {
      case "I":
        changeModalType(e.target.parentElement.parentElement.id);
        break;
      case "SPAN":
        changeModalType(e.target.parentElement.parentElement.parentElement.id);
        break;
      case "DIV":
        changeModalType(e.target.parentElement.parentElement.id);
        break;
      default:
        changeModalType(e.target.parentElement.id);
        break;
    }
  };

  return (
    <React.Fragment>
      <Table stackable>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Username</Table.Cell>
            <Table.Cell>{info.username}</Table.Cell>
            <Table.Cell />
          </Table.Row>
          <Table.Row
            id="email-modal"
            className="editable"
            onClick={e => handleOpenModal(e)}
          >
            <Table.Cell>Email</Table.Cell>
            <Table.Cell>{info.email}</Table.Cell>
            <Table.Cell textAlign="right">
              <Icon name="edit" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Joined</Table.Cell>
            <Table.Cell>{moment(info.createdAt).fromNow()}</Table.Cell>
            <Table.Cell />
          </Table.Row>
          <Table.Row
            id="speaking-modal"
            className="editable"
            onClick={e => handleOpenModal(e)}
          >
            <Table.Cell>Speaking</Table.Cell>
            <Table.Cell>
              <div style={{ display: "flex" }}>
                {info.languages.speaking.map(language => (
                  <span key={language.value} style={{ paddingRight: "15px" }}>
                    {language.value}
                  </span>
                ))}
              </div>
            </Table.Cell>
            <Table.Cell textAlign="right">
              <Icon name="edit" />
            </Table.Cell>
          </Table.Row>
          <Table.Row
            id="learning-modal"
            className="editable"
            onClick={e => handleOpenModal(e)}
          >
            <Table.Cell>Learning</Table.Cell>
            <Table.Cell>
              <div style={{ display: "flex" }}>
                {info.languages.learning.map(language => (
                  <span key={language.value} style={{ paddingRight: "15px" }}>
                    {language.value}
                  </span>
                ))}
              </div>
            </Table.Cell>
            <Table.Cell textAlign="right">
              <Icon name="edit" />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </React.Fragment>
  );
}

export default ProfileDetails;
