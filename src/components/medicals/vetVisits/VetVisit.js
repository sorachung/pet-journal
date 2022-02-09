import React, { useState, useEffect } from "react";
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
import { ViewInvoiceDialog } from "./ViewInvoiceDialog";

export const VetVisit = ({
    vetVisit,
    syncVetVisits,
    handleChange,
    expanded,
    vets,
    dashboardView,
}) => {
    const [open, setOpen] = useState(false);
    const [openInv, setOpenInv] = useState(false);

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

    const handleClickOpenInv = () => {
        setOpenInv(true);
    };

    const uploadImage = (image) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "xrfxvojq");
        data.append("cloud_name", "sorachung");
        //data.append("resource_type", "image");

        fetch("https://api.cloudinary.com/v1_1/sorachung/upload", {
            method: "POST",
            body: data,
        })
            .then((resp) => resp.json())
            .then((data) => {
                const copy = { ...vetVisit };
                delete copy.pet;
                delete copy.vet;
                copy.invoicePicURL = data.url;
                MedicalRepository.editVetVisit(copy).then(() =>
                    syncVetVisits()
                );
            })
            .catch((err) => console.log(err));
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
                    {vetVisit.invoicePicURL ? (
                        <Button onClick={handleClickOpenInv}>
                            View Invoice
                        </Button>
                    ) : (
                        ""
                    )}
                    {vetVisit.invoicePicURL ? (
                        ""
                    ) : (
                        <Button variant="contained" component="label">
                            Upload invoice
                            <input
                                type="file"
                                hidden
                                onChange={(event) =>
                                    uploadImage(event.target.files[0])
                                }
                            />
                        </Button>
                    )}
                    <ViewInvoiceDialog
                        vetVisit={vetVisit}
                        syncVetVisits={syncVetVisits}
                        openInv={openInv}
                        setOpenInv={setOpenInv}
                    />
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
