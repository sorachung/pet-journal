import React, { useEffect, useState } from "react";
import { seeIfPast } from "../../../time/TimeFormatting";

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
import SchedulingRepository from "../../../repositories/SchedulingRepository";
import { EditReminderDialog } from "./EditReminderDialog";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export const Reminder = ({
    petReminder,
    handleChange,
    expanded,
    syncPetReminders,
    dashboardView
}) => {
    const [open, setOpen] = useState(false);

    const starUnstar = (event) => {
        event.stopPropagation();
        const copy = { ...petReminder };
        delete copy.pet;
        copy.starred = !petReminder.starred;
        SchedulingRepository.editReminder(copy).then(() => syncPetReminders());
    };

    const doneNotDone = (event) => {
        event.stopPropagation();
        const copy = { ...petReminder };
        delete copy.pet;
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

    const bgColor = petReminder.complete
        ? "success.main"
        : seeIfPast(petReminder.date, petReminder.time)
        ? "grey.400"
        : "";
    const color = petReminder.complete ? "primary.contrastText" : "";

    return (
        <>
            <Accordion
                expanded={expanded === `panel${petReminder.id}`}
                onChange={handleChange(`panel${petReminder.id}`)}
                sx={{ bgcolor: bgColor, color: color }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${petReminder.id}-content`}
                    id={`panel${petReminder.id}-header`}
                    sx={{
                        ".MuiAccordionSummary-content": {
                            justifyContent: "space-between",
                        },
                    }}
                >
                    <Typography sx={{flexBasis: "20%", flexShrink: 0 }}>
                        {petReminder.date}
                    </Typography>
                    <Typography sx={{ flexBasis: "10%", flexShrink: 0 }}>
                        {petReminder.time}
                    </Typography>
                    <Typography sx={{ flexBasis: "40%", flexShrink: 1 }}>
                        {petReminder.subject}
                    </Typography>
                    {dashboardView ? (
                        <Typography
                            sx={{
                                flexBasis: "10%",
                                flexShrink: 0,
                                color: "text.secondary",
                            }}
                        >
                            {petReminder.pet.name}
                        </Typography>
                    ) : (
                        ""
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "no-wrap",
                            flexBasis: "15%",
                        }}
                    >
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
                        <IconButton onClick={deletePetEvent}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
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
