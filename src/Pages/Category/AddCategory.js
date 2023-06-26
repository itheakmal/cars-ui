import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { css } from "@emotion/react";
import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import { getRequest, postRequest, putRequest } from "../../Services/networkRequests";
import { useCatErrors, useFormInput } from "../../Services/Hooks";
import { FormField } from "../../Components/FormField";

const paperStyle = css`
  padding: 2rem;
`;

const AddCategory = () => {
    const navigate = useNavigate();
    const name = useFormInput("");
    const { errors, validate } = useCatErrors();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        console.log(id)
        if (id) {
            setLoading(true);
            getRequest(`category/${id}`)
                .then((response) => {
                    name.onChange({ target: { value: response.name } });
                    setLoading(false);
                })
                .catch((error) => {
                    alert(error.message);
                    setLoading(false);
                });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = {
            name: name.value,
        };
        console.log('inside', values)
        if (validate(values)) {
            try {
                setLoading(true);
            const done = await saveCategory(values, id)
            if (done.hasOwnProperty('id')) {
                navigate("/categories", { replace: true });
            }
            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false)
            }
            
        }
    };

    const saveCategory = async (categoryData, id) => {
        console.log('in add category', categoryData, id)
        try {
            if (id) {
                const response = await putRequest(`/category/${id}`, categoryData);
                return response.data;
            } else {
                const response = await postRequest("/category", categoryData);
                return response.data;
            }
        } catch (error) {
            console.error("createCategory error:", error);
            throw error;
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={4}>
                <Typography variant="h4" align="center">
                    {id ? "Update" : "Add"} a Category
                </Typography>
                <Paper css={paperStyle}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <FormField
                                label="Name"
                                type="text"
                                inputProps={name}
                                error={errors.name}
                            />
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    disabled={loading}
                                >
                                    {id ? "Update" : "Add"} Category
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default AddCategory;
