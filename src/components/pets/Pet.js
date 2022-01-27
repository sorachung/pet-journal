import React from "react";
import { AddPetForm } from "./AddPetForm";
import { EditPetForm } from "./EditPetForm";

export const Pet = () => {
    return (
        <>
            Pet
            <AddPetForm />
            <EditPetForm />
        </>
    )
}