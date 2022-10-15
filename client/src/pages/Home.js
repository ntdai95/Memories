import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getMemories, setCurrentPage } from "../redux/features/memorySlice";
import CardMemory from "../components/CardMemory";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const { memories, loading, currentPage, numberOfPages } = useSelector((state) => ({ ...state.memory }));
    const dispatch = useDispatch();
    const query = useQuery();
    const searchQuery = query.get("searchQuery");
    const location = useLocation();

    useEffect(() => {
        dispatch(getMemories(currentPage));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div style={{ margin: "auto", padding: "15px", maxWidth: "1000px", alignContent: "center" }}>
            <MDBRow className="mt-5">
                {memories.length === 0 && location.pathname === "/" && (
                    <MDBTypography className="text-center mb-0" tag="h2" style={{ marginTop: "20%" }}>
                        No Memories Found
                    </MDBTypography>
                )}
                {memories.length === 0 && location.pathname !== "/" && (
                    <MDBTypography className="text-center mb-0" tag="h2" style={{ marginTop: "20%" }}>
                        We couldn't find any matches for "{searchQuery}"
                    </MDBTypography>
                )}
                <MDBCol>
                    <MDBContainer>
                        <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                            {memories && memories.map((item) => <CardMemory key={item._id} {...item} />)}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
            {memories.length > 0 && !searchQuery && (
                <Pagination setCurrentPage={setCurrentPage} numberOfPages={numberOfPages} currentPage={currentPage} dispatch={dispatch} />
            )}
        </div>
    );
};

export default Home;