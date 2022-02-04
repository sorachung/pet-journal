import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useResourceResolver from "../../hooks/resource/useResourceResolver";
import PetRepository from "../../repositories/PetRepository";
import MedicalRepository from "../../repositories/MedicalRepository";
import { Incident } from "./Incident";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";


export const IncidentsList = ({pet, dashboardView}) => {
    const [ myPetsIncidents, setMyPetsIncidents ] = useState([])
    const [ incidentTypes, setIncidentTypes ] = useState([])
    const [newPetIncident, setNewPetIncident] = useState({});
    const { petId } = useParams();
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);

    const syncIncidents = () => {
        MedicalRepository.getAllIncidentsByPet(pet.id)
            .then((data) => {
                if(dashboardView) {
                    data = data.filter(incident => incident.starred)
                }
                setMyPetsIncidents(data)
            })
    }

    useEffect(() => {
        syncIncidents()
        return () => {
            setMyPetsIncidents([])
        }
    }, [pet]);

    useEffect(() => {
        MedicalRepository.getAllIncidentTypes()
            .then(data => setIncidentTypes(data))
    }, []);
    
    const addPetIncident = () => {
        const copy = {...newPetIncident}
        copy.petId = pet.id
        copy.starred = false
        MedicalRepository.addIncident(copy).then(() =>
            syncIncidents()
        );
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    
    const handleClickOpen = () => {
        setOpen(true);
    };

    
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Container >
            <Box sx={{ textAlign: "center" }}>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <CardHeader title="Incidents" />
                        <Button variant="contained" onClick={handleClickOpen}>
                            Add incident
                        </Button>
                        <Typography
                            gutterBottom
                            variant="h2"
                            fontSize="1em"
                            component="div"
                        >
                            {pet.name}
                        </Typography>
                        {myPetsIncidents.map(incident => 
                            <Incident key={incident.id} incident={incident} syncIncidents={syncIncidents} handleChange={handleChange} expanded={expanded} incidentTypes={incidentTypes}/>
                        )}
                    </CardContent>
                    <CardActions>
                    </CardActions>
                </Card>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit incident-type Record</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="name"
                        required
                        type="text"
                        onChange={(event) => {
                            const copy = { ...newPetIncident };
                            copy.name = event.target.value;
                            setNewPetIncident(copy);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="description"
                        required
                        type="text"
                        onChange={(event) => {
                            const copy = { ...newPetIncident };
                            copy.description = event.target.value;
                            setNewPetIncident(copy);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="date"
                        label="date"
                        required
                        type="date"
                        onChange={(event) => {
                            const copy = { ...newPetIncident };
                            copy.date = event.target.value;
                            setNewPetIncident(copy);
                        }}
                    />
                   <FormControl required sx={{ m: 1, minWidth: 225 }}>
                        <InputLabel id="shot-label">Incident type</InputLabel>
                        <Select
                            labelId="incident-type-label"
                            id="incident-type"
                            value={newPetIncident.incidentTypeId}
                            label="incident-type"
                            onChange={(event) => {
                                const copy = { ...newPetIncident };
                                copy.incidentTypeId = parseInt(
                                    event.target.value
                                );
                                setNewPetIncident(copy);
                            }}
                        >
                            {incidentTypes.map((type) => (
                                <MenuItem
                                    key={`incident-type--${type.id}`}
                                    value={type.id}
                                >
                                    {type.label}
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
                            addPetIncident();
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}