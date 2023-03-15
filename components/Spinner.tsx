import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#AF53FF",
  };

export const Spinner: React.FC<{}> = () => {

    return (
        <div>
            <div className="flex justify-center">
                <ClipLoader
                    color={"#6EACFE"}
                    loading={true}
                    cssOverride={override}
                    size={40}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>

            <div className="flex justify-center text-gradient-left">
                loading...
            </div>
        </div>
    )
}