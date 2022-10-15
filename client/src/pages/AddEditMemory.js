import React, { useState, useEffect } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBBtn,
    MDBInput,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createMemory, updateMemory } from "../redux/features/memorySlice";

const initialState = {
    title: "",
    description: "",
    tags: [],
};

const AddEditMemory = () => {
    const [memoryData, setMemoryData] = useState(initialState);
    const [tagErrMsg, setTagErrMsg] = useState(null);
    const { error, userMemories } = useSelector((state) => ({ ...state.memory }));
    const { user } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { title, description, tags } = memoryData;
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const singleMemory = userMemories.find((memory) => memory._id === id);
            setMemoryData({ ...singleMemory });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!tags.length) {
            setTagErrMsg("Please provide some tags");
        }

        if (title && description && tags) {
            const updatedMemoryData = { ...memoryData, name: user?.result?.name };
            if (!id) {
                dispatch(createMemory({ updatedMemoryData, navigate, toast }));
            } else {
                dispatch(updateMemory({ id, updatedMemoryData, toast, navigate }));
            }

            handleClear();
        }
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setMemoryData({ ...memoryData, [name]: value });
    };

    const handleAddTag = (tag) => {
        setTagErrMsg(null);
        setMemoryData({ ...memoryData, tags: [...memoryData.tags, tag] });
    };

    const handleDeleteTag = (deleteTag) => {
        setMemoryData({
            ...memoryData,
            tags: memoryData.tags.filter((tag) => tag !== deleteTag),
        });
    };

    const handleClear = () => {
        setMemoryData({ title: "", description: "", tags: [] });
    };

    return (
        <div style={{ margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px" }} className="container">
            <MDBCard alignment="center">
                <h5>{id ? "Update Memory" : "Add Memory"}</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
                        <div className="col-md-12">
                            <MDBInput
                                placeholder="Enter Title"
                                type="text"
                                value={title || ""}
                                name="title"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid="true"
                                validation="Please provide title"/>
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                placeholder="Enter Description"
                                type="text"
                                value={description}
                                name="description"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid="true"
                                textarea="true"
                                rows={4}
                                validation="Please provide description" />
                        </div>
                        <div className="col-md-12">
                            <ChipInput
                                name="tags"
                                variant="outlined"
                                placeholder="Type Tag and Press Enter"
                                fullWidth
                                value={tags}
                                onAdd={(tag) => handleAddTag(tag)}
                                onDelete={(tag) => handleDeleteTag(tag)} />
                            {tagErrMsg && <div className="tagErrMsg">{tagErrMsg}</div>}
                        </div>
                        <div className="d-flex justify-content-start">
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={({ base64 }) =>
                                    setMemoryData({ ...memoryData, imageFile: base64 })
                                } />
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{ width: "100%" }}>
                                {id ? "Update" : "Submit"}
                            </MDBBtn>
                            <MDBBtn style={{ width: "100%" }} className="mt-2" color="danger" onClick={handleClear}>
                                Clear
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};

export default AddEditMemory;