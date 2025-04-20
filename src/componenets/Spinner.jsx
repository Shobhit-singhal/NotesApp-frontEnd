import React from "react";
import { CircleLoader, ClipLoader, PacmanLoader } from "react-spinners";

const Spinner = ({ loading }) => {
    let override = {
        position: "absolute",
    };
    return (
        <ClipLoader
            color="white"
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
};

export default Spinner;
