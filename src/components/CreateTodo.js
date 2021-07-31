import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import { useContext, useState } from "react";
import { Context } from "..";
import ToDoService from "../services/ToDoService";
import { useHistory } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const CreateToDo = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const classes = useStyles();
    const { store } = useContext(Context);

    const createTodo = async () => {
        try {
          const res = await ToDoService.createTodo(name);
          store.user.todos = res?.data?.todos;
          history.push("/todos");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Container fixed>
                <form>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        label="Todo name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                    />
                </form>
                <Button
                    type="button"
                    fullWidth
                    onClick={() => createTodo(name)}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Create
                </Button>
            </Container>
        </div>
    )
}

export default CreateToDo;