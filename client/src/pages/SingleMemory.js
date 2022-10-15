import React, { useEffect } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImage,
    MDBContainer,
    MDBIcon,
    MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { getRelatedMemories, getMemory } from "../redux/features/memorySlice";
import RelatedMemories from "../components/RelatedMemories";

const SingleMemory = () => {
    const dispatch = useDispatch();
    const { memory, relatedMemories } = useSelector((state) => ({ ...state.memory }));
    const { id } = useParams();
    const navigate = useNavigate();
    const tags = memory?.tags;

    useEffect(() => {
        tags && dispatch(getRelatedMemories(tags));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tags]);

    useEffect(() => {
        if (id) {
            dispatch(getMemory(id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <>
            <MDBContainer>
                <MDBCard className="mb-3 mt-2">
                    <MDBCardImage position="top" style={{ marginTop: "7%", width: "100%", maxHeight: "600px" }} src={memory.imageFile} alt={memory.title} />
                    <MDBCardBody>
                        <MDBBtn tag="a" color="none" style={{ float: "left", color: "#000" }} onClick={() => navigate("/")}>
                            <MDBIcon fas size="lg" icon="long-arrow-alt-left" style={{ float: "left" }} />
                        </MDBBtn>
                        <h3>{memory.title}</h3>
                        <span>
                            <p className="text-start memoryName">Created By: {memory.name}</p>
                        </span>
                        <div style={{ float: "left" }}>
                            <span className="text-start">
                                {memory && memory.tags && memory.tags.map((item) => `#${item} `)}
                            </span>
                        </div>
                        <br />
                        <MDBCardText className="text-start mt-2">
                            <MDBIcon style={{ float: "left", margin: "5px" }} far icon="calendar-alt" size="lg" />
                            <small className="text-muted">
                                {moment(memory.createdAt).fromNow()}
                            </small>
                        </MDBCardText>
                        <MDBCardText className="lead mb-0 text-start">
                            {memory.description}
                        </MDBCardText>
                    </MDBCardBody>
                    <RelatedMemories relatedMemories={relatedMemories} memoryId={id} />
                </MDBCard>
            </MDBContainer>
        </>
    );
};

export default SingleMemory;