import React, { useState, useEffect } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import MedicalRepository from "../../repositories/MedicalRepository";

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
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const VetVisit = ({vetVisit, syncVetVisits, handleChange, expanded}) => {
    const [editedVetVisit, setEditedVetVisit] = useState({});
    const { getCurrentUser } = useSimpleAuth();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setEditedVetVisit({});
    }, [vetVisit]);

    const starUnstar = () => {
        const copy = { ...editedVetVisit };
        copy.starred = !editedVetVisit.starred;
        setEditedVetVisit(copy);
        MedicalRepository.editVetVisit(copy);
    };

    const deleteVetVisit = () => {
        MedicalRepository.deleteVetVisit(vetVisit.id).then(() =>
            syncVetVisits()
        );
    };

    const editVetVisit = () => {
        MedicalRepository.editVetVisit(editedVetVisit).then(() =>
            syncVetVisits()
        );
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Typography variant="string" color="text.secondary"></Typography>
            <Accordion
                expanded={expanded === `panel${vetVisit.id}`}
                onChange={handleChange(`panel${vetVisit.id}`)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${vetVisit.id}-content`}
                    id={`panel${vetVisit.id}-header`}
                >
                    <Typography sx={{ width: "15%", flexShrink: 0 }}>
                        {vetVisit.date}
                    </Typography>
                    <Typography sx={{ width: "33%", flexShrink: 0, color: "text.secondary" }}>
                        {vetVisit.vet?.name}
                    </Typography>
                    <IconButton onClick={starUnstar}>
                        {editedVetVisit.starred ? (
                            <StarIcon />
                        ) : (
                            <StarBorderIcon />
                        )}
                    </IconButton>
                    <IconButton onClick={deleteVetVisit}>
                        <DeleteIcon />
                    </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                       {vetVisit.description}
                    </Typography>
                    <Button onClick={handleClickOpen}>Edit</Button>
                </AccordionDetails>
            </Accordion>
        </>
    );
}