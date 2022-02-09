import React, { useEffect, useState } from "react";

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
import { EditReminderDialog } from "./EditReminderDialog";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export const Reminder = ({
    petReminder,
    handleChange,
    expanded,
    syncPetReminders,
}) => {
    const [open, setOpen] = useState(false);

    const starUnstar = (event) => {
        event.stopPropagation();
        const copy = { ...petReminder };
        copy.starred = !petReminder.starred;
        SchedulingRepository.editReminder(copy).then(() => syncPetReminders());
    };

    const doneNotDone = (event) => {
        event.stopPropagation();
        const copy = { ...petReminder };
        copy.complete = !petReminder.complete;
        SchedulingRepository.editReminder(copy).then(() => syncPetReminders());
    };

    const deletePetEvent = (event) => {
        event.stopPropagation();
        SchedulingRepository.deleteReminder(petReminder.id).then(() =>
            syncPetReminders()
        );
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const bgColor = petReminder.complete ? 'success.main' : "";
    const color =  petReminder.complete ? 'primary.contrastText' : "";

    return (
        <>
            <Accordion
            
                expanded={expanded === `panel${petReminder.id}`}
                onChange={handleChange(`panel${petReminder.id}`)}
                sx={{ bgcolor:bgColor, color:color }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${petReminder.id}-content`}
                    id={`panel${petReminder.id}-header`}
                >
                    <Typography sx={{ width: "20%", flexShrink: 0 }}>
                        {petReminder.date}
                    </Typography>
                    <Typography sx={{ width: "20%", flexShrink: 0 }}>
                        {petReminder.time}
                    </Typography>
                    <Typography sx={{ width: "40%" }}>
                        {petReminder.subject}
                    </Typography>
                    <IconButton onClick={doneNotDone}>
                        {petReminder.complete ? (
                            <CheckBoxIcon />
                        ) : (
                            <CheckBoxOutlineBlankIcon />
                        )}
                    </IconButton>
                    <IconButton onClick={starUnstar}>
                        {petReminder.starred ? (
                            <StarIcon />
                        ) : (
                            <StarBorderIcon />
                        )}
                    </IconButton>
                    <IconButton
                        onClick={deletePetEvent}
                        sx={{ marginRight: "1em" }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{petReminder.details}</Typography>
                    <Button onClick={handleClickOpen}>Edit</Button>
                </AccordionDetails>
            </Accordion>
            <EditReminderDialog
                open={open}
                setOpen={setOpen}
                petReminder={petReminder}
                syncPetReminders={syncPetReminders}
            />
        </>
    );
};
