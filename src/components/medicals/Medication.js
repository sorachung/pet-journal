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
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export const Medication = ({
    myPetMed,
    syncPetMedications,
    handleChange,
    expanded,
}) => {
    const [editedMed, setEditedMed] = useState(myPetMed);
    const [open, setOpen] = useState(false);

    useEffect(() => {}, [myPetMed]);

    const deletePetMed = (event) => {
        event.stopPropagation();
        MedicalRepository.deletePetMedication(myPetMed.id).then(() =>
            syncPetMedications()
        );
    };

    const editPetMed = (event) => {
        event.preventDefault();
        handleClose();
        MedicalRepository.editPetMedication(editedMed).then(() =>
            syncPetMedications()
        );
    };

    const starUnstar = (event) => {
        event.stopPropagation();
        const copy = { ...editedMed };
        copy.starred = !editedMed.starred;
        delete copy.incidentType;
        setEditedMed(copy);
        MedicalRepository.editPetMedication(copy).then(() =>
            syncPetMedications()
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
                expanded={expanded === `panel${myPetMed.id}`}
                onChange={handleChange(`panel${myPetMed.id}`)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${myPetMed.id}-content`}
                    id={`panel${myPetMed.id}-header`}
                >
                    <Typography sx={{ width: "20%", flexShrink: 0 }}>
                        {myPetMed.name}
                    </Typography>
                    <Typography
                        sx={{
                            width: "40%",
                            flexShrink: 0,
                            color: "text.secondary",
                        }}
                    >
                        {myPetMed.dosage}
                    </Typography>
                    <Typography
                        sx={{
                            width: "30%",
                            flexShrink: 0,
                            color: "text.secondary",
                        }}
                    >
                        Current? {myPetMed.isCurrent ? "Yes" : "No"}
                    </Typography>
                    <IconButton onClick={starUnstar}>
                        {editedMed.starred ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                    <IconButton onClick={deletePetMed} sx={{marginRight: "1em"}}>
                        <DeleteIcon />
                    </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                    <Button onClick={handleClickOpen}>Edit</Button>
                </AccordionDetails>
            </Accordion>
            <Dialog open={open} onClose={handleClose}>
            <form onSubmit={editPetMed}>
                <DialogTitle>Edit Medication Record</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="name"
                        value={editedMed.name}
                        required
                        type="text"
                        onChange={(event) => {
                            const copy = { ...editedMed };
                            copy.name = event.target.value;
                            setEditedMed(copy);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="dosage"
                        label="dosage"
                        value={editedMed.dosage}
                        required
                        type="text"
                        onChange={(event) => {
                            const copy = { ...editedMed };
                            copy.dosage = event.target.value;
                            setEditedMed(copy);
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={editedMed.isCurrent}
                                onChange={(event) => {
                                    const copy = { ...editedMed };
                                    copy.isCurrent = event.target.checked;
                                    setEditedMed(copy);
                                }}
                            />
                        }
                        label="Is Current?"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
type="submit"
                    >
                        Save
                    </Button>
                </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
