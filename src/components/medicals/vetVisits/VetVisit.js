import React, { useState } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";
import { EditVetVisitDialog } from "./EditVetVisitDialog";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const VetVisit = ({
    vetVisit,
    syncVetVisits,
    handleChange,
    expanded,
    vets,
    dashboardView,
}) => {
    const [open, setOpen] = useState(false);

    const starUnstar = (event) => {
        event.stopPropagation();
        const copy = { ...vetVisit };
        delete copy.pet;
        delete copy.vet;
        copy.starred = !vetVisit.starred;
        MedicalRepository.editVetVisit(copy).then(() => syncVetVisits());
    };

    const deleteVetVisit = (event) => {
        event.stopPropagation();
        MedicalRepository.deleteVetVisit(vetVisit.id).then(() =>
            syncVetVisits()
        );
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Accordion
                expanded={expanded === `panel${vetVisit.id}`}
                onChange={handleChange(`panel${vetVisit.id}`)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${vetVisit.id}-content`}
                    id={`panel${vetVisit.id}-header`}
                >
                    <Typography sx={{ width: "20%", flexShrink: 0 }}>
                        {vetVisit.date}
                    </Typography>
                    <Typography
                        sx={{
                            width: "60%",
                            flexShrink: 0,
                        }}
                    >
                        {vetVisit.vet?.name}
                    </Typography>
                    {dashboardView ? (
                        <Typography
                            sx={{
                                width: "10%",
                                flexShrink: 0,
                                color: "text.secondary",
                            }}
                        >
                            {vetVisit.pet.name}
                        </Typography>
                    ) : (
                        ""
                    )}
                    <IconButton onClick={starUnstar}>
                        {vetVisit.starred ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                    <IconButton
                        onClick={deleteVetVisit}
                        sx={{ marginRight: "1em" }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{vetVisit.description}</Typography>
                    <Button onClick={handleClickOpen}>Edit</Button>
                </AccordionDetails>
            </Accordion>
            <EditVetVisitDialog
                vets={vets}
                vetVisit={vetVisit}
                syncVetVisits={syncVetVisits}
                open={open}
                setOpen={setOpen}
            />
        </>
    );
};
