import React, { useState, useEffect } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";
import { EditMedicationDialog } from "./EditMedicationDialog";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const Medication = ({
    myPetMed,
    syncPetMedications,
    handleChange,
    expanded,
    dashboardView,
}) => {
    const [open, setOpen] = useState(false);

    const deletePetMed = (event) => {
        event.stopPropagation();
        MedicalRepository.deletePetMedication(myPetMed.id).then(() =>
            syncPetMedications()
        );
    };

    const starUnstar = (event) => {
        event.stopPropagation();
        const copy = { ...myPetMed };
        copy.starred = !myPetMed.starred;
        delete copy.pet;
        MedicalRepository.editPetMedication(copy).then(() =>
            syncPetMedications()
        );
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Accordion
                expanded={expanded === `panel${myPetMed.id}`}
                onChange={handleChange(`panel${myPetMed.id}`)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${myPetMed.id}-content`}
                    id={`panel${myPetMed.id}-header`}
                    sx={{
                        ".MuiAccordionSummary-content": {
                            justifyContent: "space-between",
                        },
                    }}
                >
                    <Typography sx={{ flexShrink: 0, flexBasis: "25%" }}>
                        {myPetMed.name}
                    </Typography>
                    <Typography
                        sx={{
                            flexShrink: 0,
                            color: "text.secondary",
                            flexBasis: "10%",
                        }}
                    >
                        {myPetMed.dosage}
                    </Typography>
                    <Typography
                        sx={{
                            flexShrink: 1,
                            color: "text.secondary",
                            flexBasis: "20%",
                        }}
                    >
                        Current? {myPetMed.isCurrent ? "Yes" : "No"}
                    </Typography>
                    {dashboardView ? (
                        <Typography
                            sx={{
                                flexBasis: "10%",
                                flexShrink: 0,
                                color: "text.secondary",
                            }}
                        >
                            {myPetMed.pet.name}
                        </Typography>
                    ) : (
                        ""
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "no-wrap",
                            flexBasis: "10%",
                        }}
                    >
                        <IconButton onClick={starUnstar}>
                            {myPetMed.starred ? (
                                <StarIcon />
                            ) : (
                                <StarBorderIcon />
                            )}
                        </IconButton>
                        <IconButton onClick={deletePetMed}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Button onClick={handleClickOpen}>Edit</Button>
                </AccordionDetails>
            </Accordion>
            <EditMedicationDialog
                open={open}
                setOpen={setOpen}
                syncPetMedications={syncPetMedications}
                myPetMed={myPetMed}
            />
        </>
    );
};
