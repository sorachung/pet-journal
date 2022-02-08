import React, { useState, useEffect } from "react";
import MedicalRepository from "../../../repositories/MedicalRepository";

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
import { EditVaccinationDialog } from "./EditVaccinationDialog";

export const Vaccination = ({
    petVax,
    syncPetVax,
    handleChange,
    expanded,
    dashboardView,
}) => {
    const [vaccinations, setVaccinations] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        MedicalRepository.getAllVaccinations().then((data) =>
            setVaccinations(data)
        );
    }, []);

    const deletePetVax = (event) => {
        event.stopPropagation();
        MedicalRepository.deletePetVaccination(petVax.id).then(() =>
            syncPetVax()
        );
    };

    const starUnstar = (event) => {
        event.stopPropagation();
        const copy = { ...petVax };
        copy.starred = !petVax.starred;
        delete copy.incidentType;
        MedicalRepository.editPetVaccination(copy).then(() => syncPetVax());
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Typography variant="string" color="text.secondary"></Typography>
            <Accordion
                expanded={expanded === `panel${petVax.id}`}
                onChange={handleChange(`panel${petVax.id}`)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${petVax.id}-content`}
                    id={`panel${petVax.id}-header`}
                >
                    <Typography sx={{ width: "20%", flexShrink: 0 }}>
                        {petVax.date}
                    </Typography>
                    <Typography
                        sx={{
                            width: "50%",
                            flexShrink: 0,
                            color: "text.secondary",
                        }}
                    >
                        {petVax.vaccination?.shot}
                    </Typography>
                    {dashboardView ? (
                        <Typography
                            sx={{
                                width: "20%",
                                flexShrink: 0,
                                color: "text.secondary",
                            }}
                        >
                            {petVax.pet.name}
                        </Typography>
                    ) : (
                        ""
                    )}
                    <IconButton onClick={starUnstar}>
                        {petVax.starred ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                    <IconButton
                        onClick={deletePetVax}
                        sx={{ marginRight: "1em" }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                    <Button onClick={handleClickOpen}>Edit</Button>
                </AccordionDetails>
            </Accordion>
            <EditVaccinationDialog
                open={open}
                setOpen={setOpen}
                syncPetVax={syncPetVax}
                petVax={petVax}
                vaccinations={vaccinations}
            />
        </>
    );
};
