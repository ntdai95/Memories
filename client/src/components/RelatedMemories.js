import React from "react";
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";

const RelatedMemories = ({ relatedMemories, memoryId }) => {
    return (
        <>
            {relatedMemories && relatedMemories.length > 0 && (
                <>
                    {relatedMemories.length > 1 && <h4>Related Memories</h4>}
                    <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                        {relatedMemories.filter((item) => item._id !== memoryId).splice(0, 3).map((item) => (
                            <MDBCol key={`${item._id}`}>
                                <MDBCard>
                                    <Link to={`/memory/${item._id}`}>
                                        <MDBCardImage src={item.imageFile} alt={item.title} position="top" />
                                    </Link>
                                    <span className="text-start tag-card">
                                        {item.tags.map((tag) => (
                                            <Link key={`${tag}`} to={`/memories/tag/${tag}`}> #{tag}</Link>
                                        ))}
                                    </span>
                                    <MDBCardBody>
                                        <MDBCardTitle className="text-start">
                                            {item.title}
                                        </MDBCardTitle>
                                        <MDBCardText className="text-start">
                                            {excerpt(item.description, 45)}
                                        </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        ))}
                    </MDBRow>
                </>
            )}
        </>
    );
};

export default RelatedMemories;