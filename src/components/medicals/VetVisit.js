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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const VetVisit = ({
    vetVisit,
    syncVetVisits,
    handleChange,
    expanded,
    vets,
}) => {
    const [editedVetVisit, setEditedVetVisit] = useState(vetVisit);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setEditedVetVisit(vetVisit);
    }, []);

    const starUnstar = (event) => {
        event.stopPropagation();
        const copy = { ...editedVetVisit };
        copy.starred = !editedVetVisit.starred;
        setEditedVetVisit(copy);
        MedicalRepository.editVetVisit(copy);
    };

    const deleteVetVisit = (event) => {
        event.stopPropagation();
        MedicalRepository.deleteVetVisit(vetVisit.id).then(() =>
            syncVetVisits()
        );
    };

    const editVetVisit = (event) => {
        event.preventDefault();
        handleClose();
        const copy = { ...editedVetVisit };
        MedicalRepository.editVetVisit(copy).then(() => syncVetVisits());
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
                    <Typography sx={{ width: "20%", flexShrink: 0 }}>
                        {vetVisit.date}
                    </Typography>
                    <Typography
                        sx={{
                            width: "70%",
                            flexShrink: 0,
                        }}
                    >
                        {vetVisit.vet?.name}
                    </Typography>
                    <IconButton onClick={starUnstar}>
                        {editedVetVisit.starred ? (
                            <StarIcon />
                        ) : (
                            <StarBorderIcon />
                        )}
                    </IconButton>
                    <IconButton onClick={deleteVetVisit} sx={{mr: "1em"}}>
                        <DeleteIcon />
                    </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{vetVisit.description}</Typography>
                    <Button onClick={handleClickOpen}>Edit</Button>
                </AccordionDetails>
            </Accordion>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={editVetVisit}>
                    <DialogTitle>Edit Vet Visit</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="date"
                            label="date"
                            value={editedVetVisit.date}
                            required
                            type="date"
                            onChange={(event) => {
                                const copy = { ...editedVetVisit };
                                copy.date = event.target.value;
                                setEditedVetVisit(copy);
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="description"
                            value={editedVetVisit.description}
                            required
                            type="text"
                            onChange={(event) => {
                                const copy = { ...editedVetVisit };
                                copy.description = event.target.value;
                                setEditedVetVisit(copy);
                            }}
                        />
                        <FormControl required sx={{ m: 1, minWidth: 225 }}>
                            <InputLabel id="shot-label">
                                Vet location
                            </InputLabel>
                            <Select
                                labelId="vet-label"
                                id="vet"
                                value={editedVetVisit.vetId}
                                label="vet"
                                onChange={(event) => {
                                    const copy = { ...editedVetVisit };
                                    copy.vetId = parseInt(event.target.value);
                                    setEditedVetVisit(copy);
                                }}
                            >
                                {vets.map((vet) => (
                                    <MenuItem
                                        key={`incident-vet--${vet.id}`}
                                        value={vet.id}
                                    >
                                        {vet.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
