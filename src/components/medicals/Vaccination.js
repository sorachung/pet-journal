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

export const Vaccination = ({ petVax, syncPetVax, handleChange, expanded }) => {
    const [editedPetVax, setEditedPetVax] = useState({});
    const [vaccinations, setVaccinations] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setEditedPetVax(petVax);
    }, [petVax]);

    useEffect(() => {
        MedicalRepository.getAllVaccinations().then((data) =>
            setVaccinations(data)
        );
    }, []);

    const deletePetVax = () => {
        MedicalRepository.deletePetVaccination(petVax.id).then(() =>
            syncPetVax()
        );
    };

    const editPetVax = () => {
        const copy = { ...editedPetVax };
        delete copy.vaccination
        MedicalRepository.editPetVaccination(copy).then(() =>
            syncPetVax()
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
                expanded={expanded === `panel${petVax.id}`}
                onChange={handleChange(`panel${petVax.id}`)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${petVax.id}-content`}
                    id={`panel${petVax.id}-header`}
                >
                    <Typography sx={{ width: "15%", flexShrink: 0 }}>
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
                    <IconButton onClick={deletePetVax}>
                        <DeleteIcon />
                    </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                    <Button onClick={handleClickOpen}>Edit</Button>
                </AccordionDetails>
            </Accordion>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Vaccination Record</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="date"
                        label="date"
                        value={editedPetVax.date}
                        required
                        type="date"
                        onChange={(event) => {
                            const copy = { ...editedPetVax };
                            copy.date = event.target.value;
                            setEditedPetVax(copy);
                        }}
                    />

                    <FormControl required sx={{ m: 1, minWidth: 225 }}>
                        <InputLabel id="shot-label">Vaccination</InputLabel>
                        <Select
                            labelId="Vaccination-label"
                            id="Vaccination"
                            value={editedPetVax.vaccinationId}
                            label="vaccination"
                            onChange={(event) => {
                                const copy = { ...editedPetVax };
                                copy.vaccinationId = parseInt(
                                    event.target.value
                                );
                                setEditedPetVax(copy);
                            }}
                        >
                            {vaccinations.map((vax) => (
                                <MenuItem
                                    key={`vaccination--${vax.id}`}
                                    value={editedPetVax.vaccinationId}
                                >
                                    {vax.shot}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={() => {
                            handleClose();
                            editPetVax();
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
