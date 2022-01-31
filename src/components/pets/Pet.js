import React from "react";
import { AddPetForm } from "./AddPetForm";
import { EditPetForm } from "./EditPetForm";

export const Pet = ({pet}) => {
    return (
        <>
            {pet.name}
            <AddPetForm />
            <EditPetForm />
        </>
    )
}