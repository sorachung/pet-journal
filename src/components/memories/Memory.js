import React, {useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import MemoriesRepository from "../../repositories/MemoriesRepository";
import { EditMemoryDialog } from "./EditMemoryDialog";

export const Memory = ({memory, syncMyMemories}) => {
    const [open, setOpen] = useState(false);

    const deleteMemory = () => [
        MemoriesRepository.delete(memory.id).then(() => syncMyMemories()),
    ];

    const starUnstar = () => {
        const copy = { ...memory };
        copy.starred = !memory.starred;
        MemoriesRepository.editMemory(copy).then(() => syncMyMemories());
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <Card sx={{ minWidth: 200 }}>
            <CardContent>
                <Typography gutterBottom variant="h2" fontSize="1.5em">
                    {memory.title}
                </Typography>
                <img src={memory.photoURL}  style={{ maxWidth: "100%" }}/>
                <Typography variant="body1">
                    {memory.bodyText}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {new Date(memory.timestamp).toLocaleString()}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleClickOpen}>
                    Edit
                </Button>
                <Button size="small" onClick={deleteMemory}>
                    Delete
                </Button>
                <IconButton onClick={starUnstar}>
                    {memory.starred ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
            </CardActions>
            <EditMemoryDialog syncMyMemories={syncMyMemories} memory={memory} open={open} setOpen={setOpen} />
        </Card>

    )
}