import React, { useEffect, useState } from "react";
import { seeIfPast } from "../../time/TimeFormatting";

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
import SchedulingRepository from "../../../repositories/SchedulingRepository";
import { EditEventDialog } from "./EditEventDialog";

export const Event = ({ petEvent, handleChange, expanded, syncPetEvents }) => {
    
    const [open, setOpen] = useState(false);

    const starUnstar = (event) => {
        event.stopPropagation();
        const copy = { ...petEvent };
        copy.starred = !petEvent.starred;
        SchedulingRepository.editEvent(copy).then(() => syncPetEvents());
    };

    const deletePetEvent = (event) => {
        event.stopPropagation();
        SchedulingRepository.deleteEvent(petEvent.id).then(() => syncPetEvents());
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const bgColor = seeIfPast(petEvent.date, petEvent.time) ? "grey.400" : ""

    return (
        <>
            <Accordion
                expanded={expanded === `panel${petEvent.id}`}
                onChange={handleChange(`panel${petEvent.id}`)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${petEvent.id}-content`}
                    id={`panel${petEvent.id}-header`}
                    sx={{ bgcolor:bgColor }}
                >
                    <Typography sx={{ width: "20%", flexShrink: 0 }}>
                        {petEvent.date}
                    </Typography>
                    <Typography sx={{ width: "20%", flexShrink: 0 }}>
                        {petEvent.time}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", width: "40%" }}>
                        {petEvent.subject}
                    </Typography>
                    <IconButton onClick={starUnstar}>
                        {petEvent.starred ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                    <IconButton
                        onClick={deletePetEvent}
                        sx={{ marginRight: "1em" }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{petEvent.details}</Typography>
                    <Button onClick={handleClickOpen}>Edit</Button>
                </AccordionDetails>
            </Accordion>
            <EditEventDialog open={open} setOpen={setOpen} petEvent={petEvent} syncPetEvents={syncPetEvents}/>
        </>
    );
};
