import addProjectIcon from "../../../images/add_project_icon.svg"

import React, { useState, useContext } from "react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'

import AuthContext from "../../context/AuthContext";


function AddProjectButton({ notify }) {
  const { getUser } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({name : "", description: "", status:"IN_PROGRESS"});
  const isError = formData.name === "";
  const user = getUser();

  function handleClose() {
    notify();
    onClose();
  }

  async function handleCreateProject(event) {
    event.preventDefault();
    await postProject(formData);
    handleClose();
  }

  async function postProject(project) {
    console.log("posting project!");
    try {
      await projectApi.addProject(user, project);
      console.log("finished posting project!");
    } catch (error) {
      console.error("Error: ", error);
    };
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name] : value,
    }));
  }
  
  return (
    <div>
      <div className="add-project-button-wrapper" onClick={onOpen}>
        <div className="add-project-button">
          <div className="add-project-icon-wrapper">
            <img className="add-project-icon" src={addProjectIcon}/>
            <div className="add-project-text">
              Start New Project
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Project</ModalHeader>
          <ModalBody>
            <FormControl isInvalid={isError} mb="3">
              <FormLabel>Name:</FormLabel>
              <Input id="name" name="name" value={formData.name} onChange={handleChange}/>
              {isError && <FormErrorMessage>Name cannot be empty</FormErrorMessage>}
            </FormControl>
            <FormLabel>Description:</FormLabel>
            <Input id="description" name="description" mb="3" onChange={handleChange}/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClose} mr={4}>Cancel</Button>
            <Button onClick={handleCreateProject} colorScheme="teal">Create Project</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
    
  );
}

export default AddProjectButton